export interface ProviderProps {
  children: React.ReactNode;
}

export interface Dialog {
  display: boolean;
  type: string;
  message: React.MutableRefObject<string>;
  title: React.MutableRefObject<string>;
  showAuth: () => void;
  showMessage: (title: string, message: string) => void;
  showLoading: (message: string) => void;
  awaitConfirmation: (title: string, message: string) => Promise<any>;
  close: (result?: any) => void;
}

// Recipe

export interface RecipeGet {
  _id: string;
  name: string;
  author: string;
  diet: string;
  img_url: string;
  desc?: string;
}

export interface RecipeInput {
  name: string;
  steps: string[];
  cookingTime: number;
}

interface Ingredient {
  name: string;
  steps: number[];
  category: string;
}

export interface RecipeUpdate {
  _id: string;
  name: string;
  cookingTime: number;
  steps: string[];
  intro: string;
  desc: string;
  ingredients: Ingredient[];
}

export interface RecipeSpecific {
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
