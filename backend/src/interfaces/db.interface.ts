import { Model } from "mongoose";

// DB

export interface Database {
  connect: () => Promise<void>;
  Recipe: Model<RecipeDocument>;
  PendingSubmission: Model<PendingSubmissionDocument>;
}

// Documents

export interface RecipeDocument extends Recipe, Document {}

export interface PendingSubmissionDocument
  extends PendingSubmission,
    Document {}

// Models

export interface PendingSubmission {
  recipeId?: string;
  img_url?: string;
  is_pending: boolean;
  success: string;
  stage: string;
  log?: string;
}

export interface Recipe {
  name: string;
  author: string;
  cooking_time: number;
  diet: string;
  img_url: string;
  ingredients: Ingredient[];
  steps: string[];
  allergies: [];
  intro: string;
  desc: string;
  health_score: number;
  health_reason: string;
  userId: string;
}

export interface Ingredient {
  name: string;
  steps: number[];
  category: string;
}
