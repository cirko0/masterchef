import { Types } from "mongoose";

interface RecipeInput {
  generateImage: boolean;
  _id: Types.ObjectId;
  name: string;
  author: string;
  steps: string[];
  submission_id?: Types.ObjectId;
  cookingTime: number;
  userId: string;
}

export { RecipeInput };
