import { Types } from "mongoose";
import db from "../config/db.config";

interface RecipeSearch {
  _id: Types.ObjectId;
  name: string;
  author: string;
  diet: string;
  img_url: string;
  meta: { count: { total: number } };
}

interface SearchQueryResult {
  code: number;
  data?: RecipeSearch[]; // Replace 'any[]' with the actual data type of your search results
  msg?: string;
}

const search = {
  query: async (
    keywords: string,
    filters: any = {},
    skip: number,
    limit: number
  ): Promise<SearchQueryResult> => {
    try {
      let querySpec = [
        {
          $search: {
            index: "searchRecipes",
            count: {
              type: "total",
            },
            text: {
              query: keywords,
              path: ["name", "author", "diet"],
              fuzzy: {},
            },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            name: true,
            author: true,
            diet: true,
            img_url: true,
            meta: "$$SEARCH_META",
          },
        },
      ];

      let recipeData: RecipeSearch[] = [];

      recipeData = await db.Recipe.aggregate(querySpec);

      console.log(recipeData);

      return { code: 200, data: recipeData };
    } catch (error) {
      console.error(error);
      return { code: 500, msg: "Could not retrieve data from data store" };
    }
  },
};

export default search;
