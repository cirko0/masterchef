import React from "react";

interface RecipeImageInputProps {
  register: any;
}

const RecipeImageInput: React.FC<RecipeImageInputProps> = ({ register }) => {
  return (
    <input
      type="file"
      id="file"
      name="filename"
      accept="image/png, image/jpeg"
      className="font-semibold file:bg-slate-300 text-ninja-blue file:rounded-lg file:px-4 file:py-2 file:border-none hover:opacity-90 file:cursor-pointer file:mr-3"
      {...register("image")}
    />
  );
};

export default RecipeImageInput;
