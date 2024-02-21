import React from "react";

interface RecipeImageInputProps {
  register: any;
}

const RecipeImageInput: React.FC<RecipeImageInputProps> = ({ register }) => {
  return (
    <input
      type="file"
      id="image"
      name="image"
      accept="image/png, image/jpeg"
      className="font-bold file:bg-slate-300 text-black text-base file:rounded-lg file:px-4 file:py-2 file:border-none hover:opacity-90 file:cursor-pointer file:mr-3"
      {...register("image")}
    />
  );
};

export default RecipeImageInput;
