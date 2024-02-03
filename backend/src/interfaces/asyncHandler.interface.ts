import { GPTMetaDataPrompt } from "./ai.interface";
import { Ingredient } from "./db.interface";
import { Types } from "mongoose";

export interface ExtendedRecipeFields {
  ingredients: Ingredient[];
  diet: string;
  name: string;
  author: string;
  cooking_time: number;
  steps: string[];
  userId: string;
  img_url: string;
}

export type CombinedRecipeInformation = GPTMetaDataPrompt &
  ExtendedRecipeFields;

export interface RecipeInput {
  _id: Types.ObjectId;
  name: string;
  cookingTime: number;
  author: string;
  steps: string[];
  generateImage: boolean;
  userId: string;
  submission_id?: Types.ObjectId;
}

export interface RecipeUpdateInput {
  _id: string;
  name: string;
  author: string;
  cookingTime: number;
  steps: string[];
  intro: string;
  desc: string;
  ingredients: Ingredient[];
  userId: string;
  [key: string]: any;
}
