import { Types } from "mongoose";

interface RecipeInput {
  generateImage: boolean;
  _id: any;
  name: string;
  author: string;
  steps: string[];
  submission_id: Types.ObjectId;
  cookingTime: number;
  userId: string;
}

export { RecipeInput };
