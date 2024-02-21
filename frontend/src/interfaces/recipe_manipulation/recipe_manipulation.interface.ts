import {
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormReset,
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
export interface RecipeStepsInputPropsAdd {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<
    {
      steps: {
        step: string;
      }[];
    },
    "steps"
  >;
  remove: (index: number) => void;
  identifier?: string;
  watch?: { ingredients?: Ingredient[] } | null;
}

export interface RecipeStepsInputPropsEdit {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<FieldValues, "steps">;
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
  fields: { id: string; name: string; category: string; steps: number[] }[];
  append: UseFieldArrayAppend<FieldValues, "ingredients">;
  remove: UseFieldArrayRemove;
  steps: UseFieldArrayReturn<FieldValues, "steps", "id">;
}

export interface IngredientField extends Ingredient {
  id: string;
}
