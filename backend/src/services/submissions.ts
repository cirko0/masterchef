import db from "../config/db.config";
import { Document } from "mongoose";
import { GetSubmissionStatusResponse } from "../interfaces/submissions.interface";

const submissions = {
  status: (id: string): Promise<GetSubmissionStatusResponse> => {
    return new Promise(async (resolve) => {
      try {
        let submission: Document | null = await db.PendingSubmission.findOne({
          _id: id,
        });

        if (submission) {
          resolve({ code: 200, data: submission.toJSON() });
        } else {
          resolve({ code: 404, msg: "Submission not found" });
        }
      } catch (error) {
        console.error(error);
        resolve({ code: 500, msg: "Could not retrieve data from data store" });
      }
    });
  },
};

export default submissions;
