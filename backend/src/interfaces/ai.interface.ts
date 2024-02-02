import { ImagesResponseDataInner } from "openai";
import { Recipe } from "./db.interface";

// AI

interface AI {
  gpt(instruction: Prompt[]): Promise<any>;
  dalle(prompt: string): Promise<ImagesResponseDataInner>;
}

interface GPTResponse extends Recipe {
  prompt?: string;
  spam_score: number;
  score_reason: string;
}

// Prompts

interface Prompt {
  role: string;
  content: string;
}

interface Prompts {
  base: Prompt;
  recipeContext(recipeData: string): Prompt;
  recipeObject: Prompt;
  recipeIngredientsArray: Prompt;
  allRecipeMetadata: Prompt;
  recipeIngredients: Prompt;
  recipeInsightsOnly: Prompt;
  recipeSpamCheck: Prompt;
}

export { Prompts, AI, GPTResponse };
