import dotenv from "dotenv";
import mongoose, { Document, Model, Schema } from "mongoose";

dotenv.config();

mongoose.set("strictQuery", true);

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

const db: Database = {
  connect: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(process.env.MONGODB_SRV as string);
        resolve();
      } catch (e) {
        console.error(e);
        reject();
      }
    });
  },

  Recipe: mongoose.model<RecipeDocument>(
    "Recipe",
    new Schema<RecipeDocument>({
      name: { type: String, required: true },
      author: { type: String, required: true },
      cooking_time: { type: Number, required: true },
      diet: { type: String, required: true },
      img_url: { type: String },
      ingredients: { type: Object },
      steps: { type: [String], required: true },
      allergies: { type: [String], required: true },
      intro: { type: String, required: true },
      desc: { type: String, required: true },
      health_score: { type: Number, required: true },
      health_reason: { type: String, required: true },
      userId: { type: String },
    })
  ),

  PendingSubmission: mongoose.model<PendingSubmissionDocument>(
    "PendingSubmission",
    new Schema<PendingSubmissionDocument>(
      {
        recipeId: { type: String },
        img_url: { type: String },
        is_pending: { type: Boolean, required: true },
        success: { type: String, required: true },
        stage: { type: String, required: true },
        log: { type: String },
      },
      { timestamps: true }
    )
  ),
};

export default db;
