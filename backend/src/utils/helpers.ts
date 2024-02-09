/*
    Helpers for Async Handlers
*/

import {
  GPTInsightsPrompt,
  GPTMetaDataPrompt,
} from "../interfaces/ai.interface";
import { RecipeUpdateInput } from "../interfaces/asyncHandler.interface";
import { Ingredient, Recipe } from "../interfaces/db.interface";
import { Helpers, SchemaOptions } from "../interfaces/helpers.interface";

const helpers: Helpers = {
  isRecipeOutputValid: (
    output:
      | (GPTMetaDataPrompt & {
          ingredients: Ingredient[];
          diet: string;
        })
      | GPTInsightsPrompt
      | RecipeUpdateInput,
    targetSchema: string = "aiAssist"
  ): boolean => {
    const schemaOptions: SchemaOptions = {
      aiAssist: [
        { prop: "ingredients", type: "array" },
        { prop: "diet", type: "string" },
        { prop: "allergies", type: "array" },
        { prop: "intro", type: "string" },
        { prop: "desc", type: "string" },
        { prop: "health_score", type: "number" },
        { prop: "health_reason", type: "string" },
        { prop: "prompt", type: "string" },
      ],
      userUpdate: [
        { prop: "ingredients", type: "object" },
        { prop: "diet", type: "string" },
        { prop: "intro", type: "string" },
        { prop: "desc", type: "string" },
        { prop: "name", type: "string" },
        { prop: "cookingTime", type: "number" },
        { prop: "steps", type: "array" },
      ],
      insights: [
        { prop: "allergies", type: "array" },
        { prop: "health_score", type: "number" },
        { prop: "health_reason", type: "string" },
      ],
    };

    try {
      const schema = schemaOptions[targetSchema];

      for (const schemaItem of schema) {
        console.log(
          (output as { [key: string]: any })[schemaItem.prop],
          schemaItem.type,
          typeof (output as { [key: string]: any })[schemaItem.prop]
        );
        if (
          !output.hasOwnProperty(schemaItem.prop) ||
          (schemaItem.type === "array" &&
            !Array.isArray(
              (output as { [key: string]: any })[schemaItem.prop]
            )) ||
          (schemaItem.type !== "array" &&
            typeof (output as { [key: string]: any })[schemaItem.prop] !==
              schemaItem.type)
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log("[at helpers.isRecipeOutputValid]: " + error);
      return false;
    }
  },

  validateIngredients: async (
    ingredients: Ingredient[]
  ): Promise<{ valid: boolean }> => {
    return new Promise((resolve) => {
      // Validation
      const schema = ["name", "steps", "category"];

      if (!(Array.isArray(ingredients) && ingredients.length > 0)) {
        resolve({ valid: false });
        return;
      }

      for (const property of schema) {
        if (!ingredients[0].hasOwnProperty(property)) {
          resolve({ valid: false });
          return;
        }
      }

      if (!Array.isArray(ingredients[0].steps)) {
        resolve({ valid: false });
        return;
      }

      resolve({ valid: true });
    });
  },

  sanitizeIngredients: async (
    ingredients: Ingredient[],
    steps: string[]
  ): Promise<{ valid: boolean; list: any[] }> => {
    return new Promise((resolve) => {
      // Sanitisation
      const unusedIngredients: number[] = [];

      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        let isUsed = false;

        for (const step of ingredient.steps) {
          if (
            steps[step - 1]
              .toLowerCase()
              .includes(ingredient.name.toLowerCase())
          ) {
            isUsed = true;
            break;
          }
        }

        if (!isUsed) unusedIngredients.push(i);
      }

      unusedIngredients.sort((val1, val2) => val2 - val1);

      for (const index of unusedIngredients) ingredients.splice(index, 1);

      resolve({ valid: true, list: ingredients });
    });
  },

  getRecipeDietType: (ingredients: Ingredient[]): string => {
    const meat = ingredients.filter(
      (ingredient) => ingredient.category.toLowerCase() === "meat"
    );
    const dairy = ingredients.filter(
      (ingredient) => ingredient.category.toLowerCase() === "dairy"
    );

    if (meat.length === 0 && dairy.length === 0) return "Vegan";
    if (meat.length === 0) return "Vegetarian";

    return "Non-Vegetarian";
  },
};

export default helpers;
