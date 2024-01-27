import db from "../config/db.config";

interface SearchFilters {
  // Define your filter properties here if needed
}

interface SearchQueryResult {
  code: number;
  data?: any[]; // Replace 'any[]' with the actual data type of your search results
  msg?: string;
}

const search = {
  query: async (
    keywords: string,
    filters: SearchFilters = {},
    skip: number,
    limit: number
  ): Promise<SearchQueryResult> => {
    try {
      // Use MongoDB's full-text search on the Recipe collection
      const recipeData: any[] = await db.Recipe.find(
        { $text: { $search: keywords } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit)
        .select({
          name: true,
          author: true,
          diet: true,
          img_url: true,
          score: { $meta: "textScore" },
        })
        .lean();

      console.log(recipeData);

      if (recipeData.length === 0) {
        return { code: 404, msg: "No matching recipes found" };
      }

      return { code: 200, data: recipeData };
    } catch (error) {
      console.error(error);
      return { code: 500, msg: "Could not retrieve data from data store" };
    }
  },
};

export default search;
