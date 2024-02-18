import { PendingSubmission } from "../config/db.interface";

export interface GetSubmissionStatusResponse {
  code: number;
  data?: PendingSubmission;
  msg?: string;
}
