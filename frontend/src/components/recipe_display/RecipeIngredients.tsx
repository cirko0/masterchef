import React, { useEffect, useState } from "react";
import {
  Ingredient,
  RecipeViewProps,
} from "../../interfaces/recipe_display/recipe_display.interface";

const RecipeIngredients: React.FC<RecipeViewProps> = ({ currentRecipe }) => {
  const [veggies, setVeggies] = useState<Ingredient[]>([]);
  const [meats, setMeats] = useState<Ingredient[]>([]);
  const [dairy, setDairy] = useState<Ingredient[]>([]);
  const [others, setOthers] = useState<Ingredient[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!currentRecipe.ingredients) return;

    const ingredients = currentRecipe.ingredients;

    setVeggies(
      ingredients.filter(
        (ingredient) => ingredient.category.toLowerCase() === "veggies"
      )
    );
    setMeats(
      ingredients.filter(
        (ingredient) => ingredient.category.toLowerCase() === "meat"
      )
    );
    setDairy(
      ingredients.filter(
        (ingredient) => ingredient.category.toLowerCase() === "dairy"
      )
    );
    setOthers(
      ingredients.filter(
        (ingredient) => ingredient.category.toLowerCase() === "other"
      )
    );
    setIsLoaded(true);
  }, [currentRecipe]);

  return (
    <>
      <section className="font-medium text-black flex gap-5 mb-2 flex-col">
        {veggies.length > 0 ? (
          <>
            <h4 className="text-black font-bold text-lg">Veggies & Fruits</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none">
              {veggies.map((ingredient, i) => (
                <li
                  className="text-black font-medium text-md bg-white 
                            border-2 border-black/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl"
                  key={`${currentRecipe._id}-veggies-${i}`}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {dairy.length > 0 ? (
          <>
            <h4 className="text-black font-bold text-lg">Dairy</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none">
              {dairy.map((ingredient, i) => (
                <li
                  className="text-black font-medium text-md bg-white 
                            border-2 border-black/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl"
                  key={`${currentRecipe._id}-diary-${i}`}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {meats.length > 0 ? (
          <>
            <h4 className="text-black font-bold text-lg">Meat & Eggs</h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none">
              {meats.map((ingredient, i) => (
                <li
                  className="text-black font-medium text-md bg-white 
                            border-2 border-black/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl"
                  key={`${currentRecipe._id}-meat-${i}`}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {others.length > 0 ? (
          <>
            <h4 className="text-black font-bold text-lg">
              Spices, condiments, nuts & everything else
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none">
              {others.map((ingredient, i) => (
                <li
                  className="text-black font-medium text-md bg-white 
                            border-2 border-black/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl"
                  key={`${currentRecipe._id}-other-${i}`}
                >
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {!isLoaded && (
          <div className="bg-slate-200 animate-pulse h-24 w-full rounded-xl" />
        )}
      </section>
    </>
  );
};

export default RecipeIngredients;
