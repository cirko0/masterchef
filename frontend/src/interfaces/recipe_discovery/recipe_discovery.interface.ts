import { RecipeCard } from "../providers/recipeContext.interface";

export interface CardGridProps {
  list: RecipeCard[];
  total: number;
  initFunction: (
    skip?: number,
    limit?: number,
    updateState?: boolean
  ) => Promise<RecipeCard[]>;
  loadMoreFunction: () => Promise<void>;
  noResultMessage?: string;
}

export interface CardProps {
  name?: string;
  obj?: {
    _id: string;
  };
  img?: string;
  chef?: string;
  type?: string;
  width?: string;
  height?: string;
}
