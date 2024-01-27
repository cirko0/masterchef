import db from "../config/db.config";
import { Document, Types } from "mongoose";

interface SubmissionStatus {
  code: number;
  data?: any; // Replace 'any' with the actual data type of your submission
  msg?: string;
}

const submissions = {
  status: (id: string): Promise<SubmissionStatus> => {
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
