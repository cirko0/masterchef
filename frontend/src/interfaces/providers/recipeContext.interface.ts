import { Ingredient, Recipe } from "../recipe_display.interface";

// Recipe

export interface RecipeContextType {
  recent: {
    list: RecipeCard[];
    count: number;
    userList: RecipeCard[];
    userCount: number;
    get: (
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<RecipeCard[]>;
    loadMore: () => Promise<void>;
    getForUser: (
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<RecipeCard[]>;
    loadMoreForUser: () => Promise<void>;
  };
  search: {
    results: RecipeCard[];
    isActive: boolean;
    isPending: boolean;
    count: number;
    keywords: React.MutableRefObject<string>;
    query: (
      query: string,
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<RecipeCard[]>;
    loadMore: () => Promise<void>;
  };
  specific: {
    state: Recipe | {};
    get: (idx: string) => Promise<Recipe>;
  };
  config: {
    pageLength: React.MutableRefObject<number>;
    setPageLength: (length: number) => Promise<void>;
  };
  io: {
    add: (data: AddRecipe) => Promise<AddRecipeResponse>;
    delete: (data: { idx: string }) => Promise<string>;
    attachImage: (image: File) => Promise<AttachRecipeImageResponse>;
    getSubmissionStatus: (idx: string) => Promise<PendingSubmission>;
    update: (data: UpdateRecipe) => Promise<UpdateRecipeResponse>;
    updateImage: (
      image: File,
      idx: string
    ) => Promise<UpdateRecipeImageResponse>;
  };
}

// Request Values

export interface RecipeCard {
  _id: string;
  name: string;
  author: string;
  diet: string;
  img_url: string;
  desc?: string;
}

export interface AddRecipe {
  name: string;
  steps: string[];
  cookingTime: number;
}

export interface UpdateRecipe {
  _id: string;
  name: string;
  cookingTime: number;
  steps: string[];
  intro: string;
  desc: string;
  ingredients: Ingredient[];
}

export interface PendingSubmission extends Response {
  recipeId?: string;
  img_url?: string;
  is_pending?: boolean;
  success?: string;
  stage?: string;
  log?: string;
}

// Response

export interface AddRecipeResponse extends Response {
  code?: number;
  spam?: boolean;
  msg?: string;
  submission_id?: string;
}

export interface AttachRecipeImageResponse extends Response {
  code?: number;
  msg?: string;
  submission_id?: string;
}

export interface UpdateRecipeResponse extends Response {
  code?: number;
  msg?: string;
  spam?: boolean;
}

export interface UpdateRecipeImageResponse extends Response {
  code?: number;
  msg?: string;
  submission_id?: string;
}
