import { PendingSubmission } from "./db.interface";

export interface GetSubmissionStatusResponse {
  code: number;
  data?: PendingSubmission;
  msg?: string;
}
