import {
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";

// Add & Edit

export interface RecipeTitleInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

export interface RecipeTimeInputProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
}

export interface RecipeStepsInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  fields: Record<"id", string>[];
  append: UseFieldArrayAppend<FieldValues, "steps">;
  remove: (index: number) => void;
  watch?: FieldValues;
  identifier?: string;
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
