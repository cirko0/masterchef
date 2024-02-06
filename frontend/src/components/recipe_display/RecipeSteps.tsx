import React, { useEffect, useState, useRef } from "react";
import { RecipeViewProps } from "../../interfaces/recipe_display.interface";

const RecipeSteps: React.FC<RecipeViewProps> = ({ currentRecipe }) => {
  const stepWiseIngredients = useRef<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!currentRecipe.ingredients) return;

    const ingredients = currentRecipe.ingredients;
    const processedIngredientsData: string[] = [];

    for (let i = 0; i < currentRecipe.steps.length; i++) {
      const stepIngredientsArr: string[] = [];

      for (const ingredient of ingredients) {
        if (ingredient.steps.includes(i + 1))
          stepIngredientsArr.push(ingredient.name);
      }

      let stepIngredients = stepIngredientsArr.join(", ");
      const lastCommaIdx = stepIngredients.lastIndexOf(",");

      if (lastCommaIdx !== -1)
        stepIngredients =
          stepIngredients.substring(0, lastCommaIdx) +
          " &" +
          stepIngredients.substring(lastCommaIdx + 1);

      processedIngredientsData.push(stepIngredients);
    }

    stepWiseIngredients.current = processedIngredientsData;
    setIsLoaded(true);
  }, [currentRecipe]);

  return (
    <>
      <section className="flex flex-col gap-x-6 gap-y-5 text-master-blue font-poppins">
        {!isLoaded && (
          <div className="bg-slate-200 animate-pulse h-24 w-full rounded-xl" />
        )}

        {isLoaded &&
          currentRecipe.steps?.map((step, index) => (
            <div
              className="flex flex-col bg-white shadow-master rounded-[30px]"
              key={`${currentRecipe._id}-step-${index}`}
            >
              {stepWiseIngredients.current[index] !== "" && (
                <div className="flex flex-col min-h-[40px] font-semibold justify-center px-5 my-3">
                  <h3 className="text-darkorange">
                    You'll need to get hold of
                  </h3>
                  <span className="font-medium capitalize">
                    {stepWiseIngredients.current[index]}
                  </span>
                </div>
              )}

              <div className="bg-white shadow-master py-5 px-3 rounded-[30px] flex items-center gap-3 border-0 border-l-2 border-solid border-darkorange grow">
                <div
                  className="bg-white relative t-[50%] font-medium text-2xl shadow-master border-2 border-solid border-darkorange
                                h-[50px] w-[50px] min-w-[50px] rounded-[50%] flex justify-center items-center"
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-md">{step}</p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default RecipeSteps;
