import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RecipeIntroductionInputProps } from "../../interfaces/recipe_manipulation/recipe_manipulation.interface";

const RecipeIntroductionInput: React.FC<RecipeIntroductionInputProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      {errors.intro && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2 flex items-center">
          <BiSolidErrorCircle className="text-lg" />
          &nbsp; {errors.intro.message as string}
        </p>
      )}

      <textarea
        className="focus:outline-none focus:ring-0 border-0 flex items-center h-20 grow
        bg-slate-300 text-ninja-blue font-semibold rounded-lg py-2 px-3 mb-1"
        placeholder="How would you introduce this recipe?"
        {...register("intro", {
          required: "Please provide a description for the recipe.",
        })}
      />
    </>
  );
};

export default RecipeIntroductionInput;
