import {
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { Ingredient } from "../recipe_display.interface";

// Add & Edit

export interface RecipeTitleInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

export interface RecipeTimeInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

// TODO: FIX
export interface RecipeStepsInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  fields: Record<"id", string>[];
  append: (value: any) => void;
  remove: (index: number) => void;
  identifier?: string;
  watch?: { ingredients?: Ingredient[] } | null;
}

// Edit

export interface RecipeIntroductionInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export interface RecipeIngredientsInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  fields: Ingredient[];
  append: UseFieldArrayAppend<FieldValues, "ingredients">;
  remove: UseFieldArrayRemove;
  steps: UseFieldArrayReturn<FieldValues, "steps", "id">;
}
