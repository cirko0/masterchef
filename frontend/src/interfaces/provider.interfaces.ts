// Universal

import { Recipe } from "./recipe_display.interface";

export interface ProviderProps {
  children: React.ReactNode;
}

// Dialog

export interface Dialog {
  display: boolean;
  type: string;
  message: React.MutableRefObject<string>;
  title: React.MutableRefObject<string>;
  showAuth: () => void;
  showMessage: (title: string, message: string) => void;
  showLoading: (message: string) => void;
  awaitConfirmation: (title: string, message: string) => Promise<any>;
  close: (result?: boolean | undefined) => void;
}

// Recipe

export interface RecipeContextType {
  recent: {
    list: GetRecipe[];
    count: number;
    userList: GetRecipe[];
    userCount: number;
    get: (
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<GetRecipe[]>;
    loadMore: () => Promise<void>;
    getForUser: (
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<GetRecipe[]>;
    loadMoreForUser: () => Promise<void>;
  };
  search: {
    results: GetRecipe[];
    isActive: boolean;
    isPending: boolean;
    count: number;
    keywords: React.MutableRefObject<string>;
    query: (
      query: string,
      skip?: number,
      limit?: number,
      updateState?: boolean
    ) => Promise<GetRecipe[]>;
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
    attachImage: (image: File) => Promise<any>;
    getSubmissionStatus: (idx: string) => Promise<any>;
    update: (data: UpdateRecipe) => Promise<any>;
    updateImage: (image: File, idx: string) => Promise<any>;
  };
}

// Request Values

export interface GetRecipe {
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

interface Ingredient {
  name: string;
  steps: number[];
  category: string;
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

export interface SpecificRecipe {
  health_category: string;
  _id: string;
  name: string;
  author: string;
  cooking_time: number;
  diet: string;
  img_url: string;
  ingredients: Ingredient[];
  steps: string[];
  allergies: string[];
  intro: string;
  desc: string;
  health_score: number;
  health_reason: string;
  userId: string;
}

// Response

export interface AddRecipeResponse {
  code: number;
  spam?: boolean;
  msg: string;
  submission_id?: string;
}
