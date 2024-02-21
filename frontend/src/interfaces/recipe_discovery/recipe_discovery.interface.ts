import { RecipeCard } from "../recipe_display/recipe_display.interface";

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
