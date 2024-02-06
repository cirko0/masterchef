export interface Ingredient {
  _id: string;
  name: string;
  category: string;
  steps: number[];
}

// RecipeBanner

export interface RecipeViewProps {
  currentRecipe: Recipe;
}

export interface Recipe {
  _id: string;
  name: string;
  author: string;
  cooking_time: number;
  diet: string;
  img_url: string;
  ingredients: Ingredient[];
  steps: string[];
  allergies: [];
  intro: string;
  desc: string;
  health_score: number;
  health_reason: string;
  userId: string;
  health_category: string;
}
