import { Model } from "mongoose";

interface Recipe {
  name: string;
  author: string;
  cooking_time: number;
  diet: string;
  img_url?: string;
  ingredients?: Record<string, unknown>;
  steps: string[];
  allergies: string[];
  intro: string;
  desc: string;
  health_score: number;
  health_reason: string;
  userId?: string;
}

interface RecipeDocument extends Recipe, Document {}

interface PendingSubmission {
  recipeId?: string;
  img_url?: string;
  is_pending: boolean;
  success: string;
  stage: string;
  log?: string;
}

interface PendingSubmissionDocument extends PendingSubmission, Document {}

interface Database {
  connect: () => Promise<void>;
  Recipe: Model<RecipeDocument>;
  PendingSubmission: Model<PendingSubmissionDocument>;
}

export { Database, RecipeDocument, PendingSubmissionDocument };
