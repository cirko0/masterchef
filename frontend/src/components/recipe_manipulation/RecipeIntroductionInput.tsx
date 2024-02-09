import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface RecipeIntroductionInputProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const RecipeIntroductionInput: React.FC<RecipeIntroductionInputProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      {errors.name && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
          <i className="fa-solid fa-circle-exclamation" />
          &nbsp; {errors.name?.message}
        </p>
      )}

      <textarea
        className="focus:outline-none focus:ring-0 border-0 flex items-center h-20 grow
        bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3 mb-1"
        placeholder="How would you introduce this recipe?"
        {...register("intro", {
          required: "Please provide a description for the recipe.",
        })}
      />
    </>
  );
};

export default RecipeIntroductionInput;
