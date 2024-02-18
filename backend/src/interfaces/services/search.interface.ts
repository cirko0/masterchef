import { Types } from "mongoose";

export interface RecipeSearch {
  _id: Types.ObjectId;
  name: string;
  author: string;
  diet: string;
  img_url: string;
  meta: { count: { total: number } };
}

export interface SearchQueryResponse {
  code: number;
  data?: RecipeSearch[];
  msg?: string;
}
