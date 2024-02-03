import { Types } from "mongoose";

export interface GetRecipesResponse {
  code: number;
  data?: any;
  msg?: string;
}

export interface AddRecipeResponse {
  code: number;
  spam?: boolean;
  msg: string;
  submission_id?: Types.ObjectId;
}

export interface ImageResponse {
  code: number;
  msg?: string;
  submission_id?: Types.ObjectId;
}

export interface DeleteRecipeResponse {
  code: number;
  msg: string;
}

export interface UpdateRecipeResponse {
  code: number;
  msg: string;
  spam?: boolean;
}

export interface Image extends Express.Multer.File {
  uploadcare_file_id: string;
  originalname: string;
}
