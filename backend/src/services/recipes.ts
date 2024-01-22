import db from "../config/db.config.js";
import axios from "axios";
import helpers from "../utils/helpers.js";
import { ai, prompts } from "../config/ai.config.js";
import { Types } from "mongoose";
import { GPTResponse } from "../interfaces/ai.interface.js";
import asyncHandlers from "../utils/asyncHandlers.js";
import { RecipeInput } from "../interfaces/utils.interface.js";

interface RecipesGetResponse {
  code: number;
  data?: any;
  msg?: string;
}

interface SubmissionResult {
  code: number;
  spam?: boolean;
  msg: string;
  submission_id?: Types.ObjectId;
}

const recipes = {
  get: async (
    args: { idx?: string; skip?: number; limit?: number } = {}
  ): Promise<RecipesGetResponse> => {
    try {
      let recipeData: any;
      let count = 0;
      let data: {
        count?: number;
        recipes?: any;
      } = {};

      if (args.idx) {
        recipeData = await db.Recipe.findOne({
          _id: args.idx,
        }).select("_id name author diet img_url desc");
        data = recipeData;
      } else {
        recipeData = await db.Recipe.find()
          .select("_id name author diet img_url desc")
          .sort({ _id: -1 })
          .skip(args.skip!)
          .limit(args.limit!);

        count = await db.Recipe.count();
        data = { count, recipes: recipeData };
      }

      return { code: 200, data };
    } catch (error) {
      return {
        code: 500,
        msg: "Could not retrieve data from data store",
      };
    }
  },

  addRecipe: async (input: RecipeInput): Promise<SubmissionResult> => {
    return new Promise(async (resolve) => {
      try {
        // Preparing Prompt
        let stepsString = "";
        input.steps.forEach(
          (step, i) => (stepsString += `[STEP ${i + 1}] ${step} `)
        );

        let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

        let prompt = [
          prompts.recipeObject,
          prompts.recipeSpamCheck,
          prompts.recipeContext(unprocessedData),
        ];

        // Spam Analysis
        const spamAnalysis: GPTResponse = await ai.gpt(prompt);

        console.log(spamAnalysis);

        if (spamAnalysis.spam_score >= 5) {
          resolve({
            code: 200,
            spam: true,
            msg: `${spamAnalysis.score_reason}`,
          });
          return;
        }

        // Initiating background processing chain if submission is not spam.
        if (input.submission_id) {
          // Submission ID already exists (when the user has submitted a cover image)
          await db.PendingSubmission.findOneAndUpdate(
            { _id: input.submission_id },
            { stage: "Identifying & sorting ingredients..." }
          );
          input.generateImage = false;
        } else {
          // No Submission ID; cover image also needs to be generated
          let newPendingSubmission = {
            is_pending: true,
            success: true,
            stage: "Identifying & sorting ingredients...",
          };

          const submission = await db.PendingSubmission.create(
            newPendingSubmission
          );

          input.submission_id = submission._id;
          input.generateImage = true;
        }

        // Assuming asyncHandlers.addRecipe is a valid function
        await asyncHandlers.addRecipe(stepsString, input);

        resolve({
          code: 200,
          msg: "Submission sent for further processing.",
          submission_id: input.submission_id,
        });
      } catch (error) {
        console.log(error);
        return { code: 500, msg: "Could not add item" };
      }
    });
  },
};

export default recipes;
