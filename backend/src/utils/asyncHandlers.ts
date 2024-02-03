import { prompts, ai } from "../config/ai.config";
import db from "../config/db.config";
import {
  GPTInsightsPrompt,
  GPTMetaDataPrompt,
} from "../interfaces/ai.interface";
import helpers from "./helpers";
import { uploadFile } from "@uploadcare/upload-client";
import {
  RecipeInput,
  RecipeUpdateInput,
} from "../interfaces/asyncHandler.interface";
import { Ingredient } from "../interfaces/db.interface";
import { CombinedRecipeInformation } from "../interfaces/asyncHandler.interface";

const asyncHandlers = {
  addRecipe: async (
    stepsString: string,
    input: RecipeInput,
    retriesCount: number = 0
  ): Promise<void> => {
    try {
      let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

      let instructions = [
        prompts.recipeIngredientsArray,
        prompts.recipeIngredients,
        prompts.recipeContext(unprocessedData),
      ];

      let ingredients: Ingredient[] = (await ai.gpt(
        instructions
      )) as Ingredient[];

      await helpers.validateIngredients(ingredients);

      let sanitizedIngredients = await helpers.sanitizeIngredients(
        ingredients,
        input.steps
      );

      if (!sanitizedIngredients.valid) throw new Error("Invalid Ingredients.");

      await db.PendingSubmission.findOneAndUpdate(
        { _id: input.submission_id },
        { stage: "Analyzing recipe & writing metadata..." }
      );

      let ingredientString = "";
      sanitizedIngredients.list.forEach(
        (ingredient: any, i: number) =>
          (ingredientString += `(${i + 1}) ${ingredient.name} `)
      );

      unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Ingredients: ${ingredientString} Steps: ${stepsString}`;

      instructions = [
        prompts.recipeObject,
        prompts.allRecipeMetadata,
        prompts.recipeContext(unprocessedData),
      ];

      let newRecipe: GPTMetaDataPrompt = (await ai.gpt(
        instructions
      )) as GPTMetaDataPrompt;

      newRecipe.ingredients = sanitizedIngredients.list;
      newRecipe.diet = helpers.getRecipeDietType(newRecipe.ingredients);

      console.log(newRecipe);

      if (
        !helpers.isRecipeOutputValid(
          newRecipe as GPTMetaDataPrompt & {
            ingredients: Ingredient[];
            diet: string;
          }
        )
      )
        throw new Error("Validation Failed.");

      newRecipe.name = input.name;
      newRecipe.author = input.author;
      newRecipe.cooking_time = input.cookingTime;
      newRecipe.steps = input.steps;
      newRecipe.userId = input.userId;

      if (!input.generateImage) {
        const submissionData = await db.PendingSubmission.findOne({
          _id: input.submission_id,
        });

        if (!submissionData || !submissionData.img_url) return;

        newRecipe.img_url = submissionData.img_url;

        const submittedRecipe = await db.Recipe.create(
          newRecipe as CombinedRecipeInformation
        );

        await db.PendingSubmission.findOneAndUpdate(
          { _id: input.submission_id },
          {
            stage: "Done - Recipe analysis & writing metadata.",
            is_pending: false,
            success: true,
            recipeId: submittedRecipe._id,
          }
        );

        return;
      }

      await db.PendingSubmission.findOneAndUpdate(
        { _id: input.submission_id },
        { stage: "Visualizing recipe & generating image..." }
      );

      asyncHandlers.generateRecipeImage(
        newRecipe as CombinedRecipeInformation,
        input
      );
    } catch (error) {
      console.log(error);

      if (retriesCount === 0) {
        asyncHandlers.addRecipe(stepsString, input, retriesCount + 1);
        return;
      }

      await db.PendingSubmission.findOneAndUpdate(
        { _id: input.submission_id },
        {
          stage: "Error during recipe analysis.",
          is_pending: false,
          success: false,
          log: error,
        }
      );
    }
  },

  generateRecipeImage: async (
    newRecipe: CombinedRecipeInformation,
    input: RecipeInput
  ): Promise<void> => {
    try {
      const response = await ai.dalle(newRecipe.prompt as string);

      const uploadcareResponse = await uploadFile(response[0].url as string, {
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY as string,
        store: "auto",
      });

      const fileId = uploadcareResponse.uuid;

      const cdnUrl = `https://ucarecdn.com/${fileId}/`;

      delete newRecipe.prompt;
      newRecipe.img_url = cdnUrl;

      const submittedRecipe = await db.Recipe.create(newRecipe);

      await db.PendingSubmission.findOneAndUpdate(
        { _id: input.submission_id },
        {
          stage: "Done - Visualizing recipe & generating image...",
          is_pending: false,
          success: true,
          recipeId: submittedRecipe._id,
        }
      );
    } catch (error) {
      // TODO: improve error handling
      await db.PendingSubmission.findOneAndUpdate(
        { _id: input.submission_id },
        {
          stage: "Error during image generation",
          is_pending: false,
          success: false,
          log: error,
        }
      );
    }
  },

  updateRecipeInsights: async (
    stepsString: string,
    input: RecipeInput | RecipeUpdateInput,
    retries: number = 0
  ) => {
    try {
      let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

      let instruction = [
        prompts.recipeObject,
        prompts.recipeInsightsOnly,
        prompts.recipeContext(unprocessedData),
      ];

      let updatedInsights: GPTInsightsPrompt = (await ai.gpt(
        instruction
      )) as GPTInsightsPrompt;

      if (!helpers.isRecipeOutputValid(updatedInsights, "insights"))
        throw new Error("Validation Failed.");

      console.log(updatedInsights);
      console.log(input._id);

      await db.Recipe.findOneAndUpdate(
        { _id: input._id },
        {
          allergies: updatedInsights.allergies,
          health_reason: updatedInsights.health_reason,
          health_score: updatedInsights.health_score,
        }
      );
    } catch (error) {
      console.log(error);

      if (retries < 1) {
        asyncHandlers.updateRecipeInsights(stepsString, input, retries + 1);
        return;
      }
    }
  },
};

export default asyncHandlers;
