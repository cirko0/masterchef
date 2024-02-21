export interface Ingredient {
  name: string;
  category: string;
  steps: number[];
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

export interface IngredientField extends Ingredient {
  id: string;
}

export interface PendingSubmission extends Response {
  recipeId?: string;
  img_url?: string;
  is_pending?: boolean;
  success?: string;
  stage?: string;
  log?: string;
}

export interface RecipeCard {
  _id: string;
  name: string;
  author: string;
  diet: string;
  img_url: string;
  desc?: string;
}

// RecipeBanner

export interface RecipeViewProps {
  currentRecipe: Recipe;
}
