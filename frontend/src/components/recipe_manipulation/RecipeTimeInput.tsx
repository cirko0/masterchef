import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RecipeTimeInputProps } from "../../interfaces/recipe_manipulation/recipe_manipulation.interface";

const RecipeTimeInput: React.FC<RecipeTimeInputProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      {errors.cookingTime && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2 flex items-center">
          <BiSolidErrorCircle className="text-lg" />
          &nbsp;
          {errors.cookingTime.message as string}
        </p>
      )}

      <input
        type="number"
        min="5"
        max="720"
        onWheel={() => false}
        className="focus:outline-none focus:ring-0 border-0 flex items-center h-10 grow bg-slate-300 text-black font-semibold rounded-lg py-2 px-3 text-base"
        placeholder="Cooking time (mins)"
        onInput={() =>
          register("cookingTime", {
            required: "Cooking time is required.",
          })
        }
        {...register("cookingTime", {
          required: "Cooking time is required.",
        })}
      />
    </>
  );
};

export default RecipeTimeInput;
