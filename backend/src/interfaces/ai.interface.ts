import { ImagesResponseDataInner } from "openai";
import { Ingredient } from "./db.interface";

// AI

export interface AI {
  gpt(instruction: Prompt[]): Promise<GPTResponse>;
  dalle(prompt: string): Promise<ImagesResponseDataInner[]>;
}

export type GPTResponse =
  | GPTMetaDataPrompt
  | Ingredient[]
  | GPTInsightsPrompt
  | GPTSpamAnalysisPrompt;

export interface GPTSpamAnalysisPrompt {
  spam_score: number;
  score_reason: string;
}

export interface GPTMetaDataPrompt {
  health_score: number;
  health_reason: string;
  allergies: [];
  intro: string;
  desc: string;
  prompt?: string;
  [key: string]: any;
}

export interface GPTInsightsPrompt {
  health_score: number;
  health_reason: string;
  allergies: [];
}

// Prompts

interface Prompt {
  role: string;
  content: string;
}

export interface Prompts {
  base: Prompt;
  recipeContext(recipeData: string): Prompt;
  recipeObject: Prompt;
  recipeIngredientsArray: Prompt;
  allRecipeMetadata: Prompt;
  recipeIngredients: Prompt;
  recipeInsightsOnly: Prompt;
  recipeSpamCheck: Prompt;
}
