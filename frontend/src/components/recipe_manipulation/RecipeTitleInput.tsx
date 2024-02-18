import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { RecipeTitleInputProps } from "../../interfaces/recipe_manipulation/recipe_manipulation.interface";

const RecipeTitleInput: React.FC<RecipeTitleInputProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      {errors.name && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2 flex items-center">
          <BiSolidErrorCircle className="text-lg" />
          &nbsp;
          {errors.name.message as string}
        </p>
      )}
      <input
        type="text"
        className="focus:outline-none focus:ring-0 border-0 flex items-center h-10 grow capitalize
                bg-slate-300 text-black font-semibold rounded-lg py-2 px-3 text-base"
        placeholder="Title"
        {...register("name", {
          required: "Please provide a title for the recipe.",
        })}
      />
    </>
  );
};

export default RecipeTitleInput;
