import { Types } from "mongoose";

interface RecipeInput {
  _id: any;
  name: string;
  author: string;
  steps: string[];
  submission_id?: Types.ObjectId;
  cookingTime?: number;
  userId?: string;
  generateImage?: boolean;
}

export { RecipeInput };
