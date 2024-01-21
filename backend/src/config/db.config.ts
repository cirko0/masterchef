import dotenv from "dotenv";
import mongoose, { Schema } from "mongoose";
import {
  Database,
  PendingSubmissionDocument,
  RecipeDocument,
} from "../interfaces/db.interface";

dotenv.config();

mongoose.set("strictQuery", true);

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
