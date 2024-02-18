import db from "../config/db.config.js";
import helpers from "../utils/helpers.js";
import { ai, prompts } from "../config/ai.config.js";
import asyncHandlers from "../utils/asyncHandlers.js";
import {
  RecipeInput,
  RecipeUpdateInput,
} from "../interfaces/utils/asyncHandler.interface.js";
import { Recipe, RecipeDocument } from "../interfaces/config/db.interface.js";
import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";
import {
  AddRecipeResponse,
  Image,
  ImageResponse,
  GetRecipesResponse,
  UpdateRecipeResponse,
  DeleteRecipeResponse,
} from "../interfaces/services/recipes.interface.js";
import { GPTSpamAnalysisPrompt } from "../interfaces/config/ai.interface.js";

const recipes = {
  get: async (
    args: { idx?: string; skip?: number; limit?: number } = {}
  ): Promise<GetRecipesResponse> => {
    try {
      let recipeData: RecipeDocument | RecipeDocument[];
      let count = 0;
      let data:
        | {
            count?: number;
            recipes?: RecipeDocument[];
          }
        | RecipeDocument = {};

      if (args["idx"]) {
        recipeData = (await db.Recipe.findOne({
          _id: args.idx,
        })) as RecipeDocument;

        data = recipeData;
      } else {
        recipeData = (await db.Recipe.find()
          .select("_id name author diet img_url desc")
          .sort({ _id: -1 })
          .skip(args.skip!)
          .limit(args.limit!)) as RecipeDocument[];

        count = await db.Recipe.count();

        data = { count, recipes: recipeData };
      }

      return { code: 200, data };
    } catch (error) {
      return {
        code: 500,
        msg: "Could not retrieve data from data store",
      };
    }
  },

  getByUser: async ({
    userId,
    limit,
    skip,
  }: {
    userId: string;
    limit: number;
    skip: number;
  }): Promise<GetRecipesResponse> => {
    try {
      let recipeData: RecipeDocument[];
      let count = 0;
      let data: { count: number; recipes: RecipeDocument[] };

      console.log(userId);

      recipeData = await db.Recipe.find({ userId: userId })
        .select("_id name author diet img_url desc")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);

      count = await db.Recipe.find({ userId: userId }).count();

      data = { count, recipes: recipeData };

      return { code: 200, data };
    } catch (error) {
      return { code: 500, msg: "Could not retrieve data from data store" };
    }
  },

  add: async (input: RecipeInput): Promise<AddRecipeResponse> => {
    return new Promise(async (resolve) => {
      try {
        // Preparing Prompt
        let stepsString = "";
        input.steps.forEach(
          (step, i) => (stepsString += `[STEP ${i + 1}] ${step} `)
        );

        let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

        let prompt = [
          prompts.recipeObject,
          prompts.recipeSpamCheck,
          prompts.recipeContext(unprocessedData),
        ];

        // Spam Analysis
        const spamAnalysis: GPTSpamAnalysisPrompt = (await ai.gpt(
          prompt
        )) as GPTSpamAnalysisPrompt;

        console.log(spamAnalysis);

        if (spamAnalysis.spam_score >= 5) {
          resolve({
            code: 200,
            spam: true,
            msg: `${spamAnalysis.score_reason}`,
          });
          return;
        }

        // Initiating background processing chain if submission is not spam.
        if (input.submission_id) {
          // Submission ID already exists (when the user has submitted a cover image)
          await db.PendingSubmission.findOneAndUpdate(
            { _id: input.submission_id },
            { stage: "Identifying & sorting ingredients..." }
          );

          input.generateImage = false;
        } else {
          // No Submission ID; cover image also needs to be generated
          let newPendingSubmission = {
            is_pending: true,
            success: true,
            stage: "Identifying & sorting ingredients...",
          };

          const submission = await db.PendingSubmission.create(
            newPendingSubmission
          );

          input.submission_id = submission._id;
          input.generateImage = true;
        }

        // Assuming asyncHandlers.addRecipe is a valid function
        await asyncHandlers.addRecipe(stepsString, input);

        resolve({
          code: 200,
          msg: "Submission sent for further processing.",
          submission_id: input.submission_id,
        });
      } catch (error) {
        console.log(error);
        return { code: 500, msg: "Could not add item" };
      }
    });
  },

  addImage: async (input: Image): Promise<ImageResponse> => {
    return new Promise(async (resolve) => {
      try {
        console.log(input);

        if (!input) return;

        let newPendingSubmission = {
          img_url: `https://ucarecdn.com/${input.uploadcare_file_id}/${input.originalname}`,
          is_pending: true,
          success: true,
          stage: "Image Uploaded by User",
        };

        const submission = await db.PendingSubmission.create(
          newPendingSubmission
        );

        resolve({ code: 201, submission_id: submission._id });
      } catch (error) {
        console.log(error);
        resolve({ code: 500, msg: "Could not create the submission." });
      }
    });
  },

  update: async (input: RecipeUpdateInput): Promise<UpdateRecipeResponse> => {
    return new Promise(async (resolve) => {
      try {
        // fetch old recipe data
        const oldRecipe: Recipe = (await db.Recipe.findOne({
          _id: input._id,
        })) as Recipe;

        if (!oldRecipe) throw new Error("Recipe with that _id not found!");

        // check if recipe belongs to user
        if (oldRecipe.userId !== input.userId) throw new Error("401");
        // Preparing Prompt
        let stepsString = "";

        input.steps.forEach(
          (step: string, i: number) =>
            (stepsString += `[STEP ${i + 1}] ${step} `)
        );

        const unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

        const instruction = [
          prompts.recipeObject,
          prompts.recipeSpamCheck,
          prompts.recipeContext(unprocessedData),
        ];

        // Spam Analysis
        const spamAnalysis: GPTSpamAnalysisPrompt = (await ai.gpt(
          instruction
        )) as GPTSpamAnalysisPrompt;

        console.log(spamAnalysis);

        if (spamAnalysis.spam_score >= 5) {
          resolve({
            code: 200,
            spam: true,
            msg: `${spamAnalysis.score_reason}`,
          });
          return;
        }

        // use helper to validate and sanitize ingredients
        let areIngredientsValid = await helpers.validateIngredients(
          input.ingredients
          // input.steps
        );
        if (!areIngredientsValid) throw new Error("Validation Failed.");

        // use helper to get diet type
        input.diet = helpers.getRecipeDietType(input.ingredients);

        console.log(input.diet);
        console.log(input.ingredients);

        // use helper to validate recipe output
        if (
          !helpers.isRecipeOutputValid(input as RecipeUpdateInput, "userUpdate")
        )
          throw new Error("Validation Failed.");
        console.log(input);
        // update steps, ingredients, name, desc, intro, cooking_time
        const updatedRecipe: Recipe = (await db.Recipe.findOneAndUpdate(
          { _id: input._id },
          {
            steps: input.steps,
            ingredients: input.ingredients,
            name: input.name,
            desc: input.desc,
            intro: input.intro,
            cooking_time: input.cookingTime,
            diet: input.diet,
          }
        )) as Recipe;

        console.log(updatedRecipe);

        // compare old recipe data with new recipe data
        let areStepsChanged =
          oldRecipe.steps.toString() !== input.steps.toString();

        if (!oldRecipe.ingredients) return;

        let areIngredientsChanged =
          oldRecipe.ingredients.toString() !== input.ingredients.toString();

        // Initiating background processing chain to update insights, if steps or ingredients have changed.
        if (areStepsChanged || areIngredientsChanged) {
          await asyncHandlers.updateRecipeInsights(stepsString, input);
        }

        resolve({ code: 200, msg: "Edit has been saved." });
      } catch (error: any) {
        console.log(error);

        if (error.message === "401") {
          resolve({
            code: 401,
            msg: "You are not authorized to edit this recipe.",
          });
          return;
        }

        resolve({ code: 500, msg: "Could not update recipe" });
      }
    });
  },

  updateImage: async (
    input: Image,
    idx: string,
    userId: string
  ): Promise<ImageResponse> => {
    return new Promise(async (resolve) => {
      try {
        const recipe: Recipe = (await db.Recipe.findOne({
          _id: idx,
        })) as Recipe;

        if (!recipe) throw new Error("Recipe not found.");

        if (recipe.userId !== userId) {
          throw new Error("401");
        }

        await db.Recipe.findOneAndUpdate(
          { _id: idx },
          {
            img_url: `https://ucarecdn.com/${input.uploadcare_file_id}/${input.originalname}`,
          }
        );

        // Delete old image from Uploadcare

        if (!recipe.img_url) {
          resolve({ code: 200 });
          return;
        }

        const imgInfo = recipe.img_url.split("/")[3];

        await deleteFile(
          {
            uuid: imgInfo,
          },
          {
            authSchema: new UploadcareSimpleAuthSchema({
              publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
              secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
            }),
          }
        );

        resolve({ code: 200 });
      } catch (error: any) {
        console.log(error);

        if (error.message === "401") {
          resolve({
            code: 401,
            msg: "You are not authorized to edit this recipe.",
          });
          return;
        }

        resolve({ code: 500, msg: "Could not create submission." });
      }
    });
  },

  delete: async (idx: string): Promise<DeleteRecipeResponse> => {
    try {
      const recipeData: Recipe = (await db.Recipe.findOne({
        _id: idx,
      })) as Recipe;

      console.log(recipeData);

      if (!recipeData) throw new Error("Recipe not found.");

      try {
        // Delete image from Uploadcare
        if (recipeData.img_url) {
          const result = await deleteFile(
            {
              uuid: recipeData.img_url.split("/")[3] || "",
            },
            {
              authSchema: new UploadcareSimpleAuthSchema({
                publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
                secretKey: process.env.UPLOADCARE_SECRET_KEY as string,
              }),
            }
          );
          console.log(result);
        }
      } catch (e) {
        console.time("RECIPE IMAGE DELETE ERROR");
        console.log(`[> RECIPE IMAGE DELETE ERROR DETAILS] ${e}`);
      }

      await db.Recipe.deleteOne({ _id: idx });

      return { code: 200, msg: `Deleted item with _id ${idx}.` };
    } catch (error) {
      console.time("RECIPE DELETE ERROR");
      console.log(`[> RECIPE DELETE ERROR DETAILS] ${error}`);

      return {
        code: 404,
        msg: "Could not delete item, please try again later.",
      };
    }
  },
};

export default recipes;
