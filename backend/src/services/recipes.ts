import db from "../config/db.config.js";
import axios from "axios";
import helpers from "../utils/helpers.js";
import { ai, prompts } from "../config/ai.config.js";
import { Types } from "mongoose";
import { GPTResponse } from "../interfaces/ai.interface.js";
import asyncHandlers from "../utils/asyncHandlers.js";
import { RecipeInput } from "../interfaces/utils.interface.js";
import { RecipeDocument } from "../interfaces/db.interface.js";

interface RecipesGetResponse {
  code: number;
  data?: any;
  msg?: string;
}

interface AddRecipeResponse {
  code: number;
  spam?: boolean;
  msg: string;
  submission_id?: Types.ObjectId;
}

interface RecipeInputAIUser extends RecipeInput {
  intro: any;
  ingredients: any;
  diet: any;
  desc: string;
}

const recipes = {
  get: async (
    args: { idx?: string; skip?: number; limit?: number } = {}
  ): Promise<RecipesGetResponse> => {
    try {
      let recipeData: any;
      let count = 0;
      let data: {
        count?: number;
        recipes?: any;
      } = {};

      if (args.idx) {
        recipeData = await db.Recipe.findOne({
          _id: args.idx,
        }).select("_id name author diet img_url desc");
        data = recipeData;
      } else {
        recipeData = await db.Recipe.find()
          .select("_id name author diet img_url desc")
          .sort({ _id: -1 })
          .skip(args.skip!)
          .limit(args.limit!);

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
  }): Promise<RecipesGetResponse> => {
    try {
      let recipeData: any[] = [];
      let count = 0;
      let data: any = {};

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
        const spamAnalysis: GPTResponse = await ai.gpt(prompt);

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

  update: async (input: RecipeInputAIUser) => {
    return new Promise(async (resolve) => {
      try {
        // fetch old recipe data
        const oldRecipe: RecipeDocument = (await db.Recipe.findOne({
          _id: input._id,
        })) as RecipeDocument;

        // check if recipe belongs to user
        if (oldRecipe.userId !== input.userId) throw new Error("401");
        // Preparing Prompt
        let stepsString = "";
        input.steps.forEach(
          (step, i) => (stepsString += `[STEP ${i + 1}] ${step} `)
        );
        const unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;
        const instruction = [
          prompts.recipeObject,
          prompts.recipeSpamCheck,
          prompts.recipeContext(unprocessedData),
        ];

        // Spam Analysis
        const spamAnalysis = await ai.gpt(instruction);
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
        if (!helpers.isRecipeOutputValid(input as any, "userUpdate"))
          throw new Error("Validation Failed.");

        // update steps, ingredients, name, desc, intro, cooking_time
        const updatedRecipe = await db.Recipe.findOneAndUpdate(
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
        );
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
};

export default recipes;
