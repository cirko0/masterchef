import { GPTInsightsPrompt, GPTMetaDataPrompt } from "./ai.interface";
import { RecipeUpdateInput } from "./asyncHandler.interface";
import { Ingredient } from "./db.interface";

export interface Helpers {
  isRecipeOutputValid: (
    output:
      | (GPTMetaDataPrompt & {
          ingredients: Ingredient[];
          diet: string;
        })
      | GPTInsightsPrompt
      | RecipeUpdateInput,
    targetSchema?: string
  ) => boolean;

  validateIngredients: (
    ingredients: Ingredient[]
  ) => Promise<{ valid: boolean }>;

  sanitizeIngredients: (
    ingredients: Ingredient[],
    steps: any
  ) => Promise<{ valid: boolean; list: Ingredient[] }>;

  getRecipeDietType: (ingredients: Ingredient[]) => string;
}

interface SchemaOption {
  prop: string;
  type: string;
}

export interface SchemaOptions {
  [key: string]: SchemaOption[];
}
