import db from "../config/db.config";
import {
  RecipeSearch,
  SearchQueryResponse,
} from "../interfaces/services/search.interface";

const search = {
  query: async (
    keywords: string,
    // filters: { diet?: string } = {},
    skip: number,
    limit: number
  ): Promise<SearchQueryResponse> => {
    try {
      console.log(keywords);
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
