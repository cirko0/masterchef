import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BiSolidErrorCircle } from "react-icons/bi";

interface RecipeDescriptionInputProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const RecipeDescriptionInput: React.FC<RecipeDescriptionInputProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      {errors.desc && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2 flex items-center">
          <BiSolidErrorCircle className="text-lg" />
          &nbsp; {errors.desc.message}
        </p>
      )}

      <input
        type="text"
        className="focus:outline-none focus:ring-0 border-0 flex items-center h-10 grow
                bg-slate-300 text-ninja-blue font-semibold rounded-lg py-2 px-3"
        placeholder="What's this recipe about?"
        {...register("desc", {
          required: "Please provide a description for the recipe.",
        })}
      />
    </>
  );
};

export default RecipeDescriptionInput;
