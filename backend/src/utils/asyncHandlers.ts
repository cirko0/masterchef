import { ImagesResponseDataInner } from "openai";
import { prompts, ai } from "../config/ai.config";
import db from "../config/db.config";
import { GPTResponse } from "../interfaces/ai.interface";
import helpers from "./helpers";
import axios from "axios";

interface RecipeInput {
  _id: any;
  name: string;
  author: string;
  steps: string[];
  submission_id?: string;
  cookingTime?: number;
  userId?: string;
  generateImage?: boolean;
}

interface RecipeOutput {
  name: string;
  author: string;
  cooking_time: number;
  steps: string[];
  userId: string;
  img_url?: string;
  prompt?: any;
  ingredients?: any[];
  diet?: string;
}

const asyncHandlers = {
  addRecipe: async (
    stepsString: string,
    input: RecipeInput,
    retriesCount: number = 0
  ) => {
    try {
      let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

      let instructions = [
        prompts.recipeIngredientsArray,
        prompts.recipeIngredients,
        prompts.recipeContext(unprocessedData),
      ];
      //@ts-ignore
      let ingredients = await ai.gpt(instructions);

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
      //@ts-ignore
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
      //@ts-ignore

      let newRecipe = await ai.gpt<RecipeOutput>(instructions);

      //@ts-ignore
      newRecipe.ingredients = sanitizedIngredients.list;
      newRecipe.diet = helpers.getRecipeDietType(newRecipe.ingredients);

      if (!helpers.isRecipeOutputValid(newRecipe))
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
        //@ts-ignore
        newRecipe.img_url = submissionData.img_url;

        const submittedRecipe = await db.Recipe.create(newRecipe);
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
      //@ts-ignore

      asyncHandlers.generateRecipeImage(newRecipe, input);
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

  generateRecipeImage: async (newRecipe: RecipeOutput, input: RecipeInput) => {
    try {
      //@ts-ignore
      const response = await ai.dalle<ImagesResponseDataInner>(
        newRecipe.prompt
      );

      const { data } = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
        {
          //@ts-ignore
          url: response[0].url,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
          },
        }
      );

      if (!data.success) throw new Error("CLOUDFLARE IMAGE UPLOAD ERROR");

      delete newRecipe.prompt;
      newRecipe.img_url = `https://imagedelivery.net/CwcWai9Vz5sYV9GCN-o2Vg/${data.result.id}/`;

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
    input: RecipeInput,
    retries: number = 0
  ) => {
    try {
      let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

      let instruction = [
        prompts.recipeObject,
        prompts.recipeInsightsOnly,
        prompts.recipeContext(unprocessedData),
      ];
      //@ts-ignore
      let updatedInsights = await ai.gpt<GPTResponse>(instruction);

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
