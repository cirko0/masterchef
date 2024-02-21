import React, { useEffect, useState } from "react";
import { useDialogs } from "../../providers/dialogContext";
import { BiPlus, BiSolidErrorCircle, BiSolidTrash } from "react-icons/bi";
import {
  RecipeStepsInputPropsAdd,
  RecipeStepsInputPropsEdit,
} from "../../interfaces/recipe_manipulation/recipe_manipulation.interface";
import { Ingredient } from "../../interfaces/recipe_display.interface";

const RecipeStepsInput: React.FC<
  RecipeStepsInputPropsAdd | RecipeStepsInputPropsEdit
> = ({
  register,
  errors,
  fields,
  append,
  remove,
  identifier = "",
  watch = null,
}) => {
  const dialogs = useDialogs();

  const deleteStep = async (index: number) => {
    let confirmation = await dialogs.awaitConfirmation(
      "Confirmation Required",
      `Are you sure you want to delete this step?`
    );

    if (confirmation) remove(index);
  };

  const [stepWiseIngredients, setStepWiseIngredients] = useState<string[]>([]);

  const scrollAction = () => {
    const ingredientLabel = document.getElementById("ingredientLabel");
    if (ingredientLabel) {
      ingredientLabel.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!watch) return;

    const ingredients = watch.ingredients;

    if (!ingredients) return;

    let processedIngredientsData: string[] = [];

    for (let i = 0; i < fields.length; i++) {
      let stepIngredientsArr: string[] = [];

      ingredients.forEach((ingredient: Ingredient) => {
        ingredient.steps = ingredient.steps.map(Number);
      });

      for (let ingredient of ingredients) {
        if (!ingredient.steps) continue;
        if (ingredient.steps.includes(i + 1))
          stepIngredientsArr.push(ingredient.name);
      }

      let stepIngredients = stepIngredientsArr.join(", ");
      let lastCommaIdx = stepIngredients.lastIndexOf(",");

      if (lastCommaIdx !== -1)
        stepIngredients =
          stepIngredients.substring(0, lastCommaIdx) +
          " &" +
          stepIngredients.substring(lastCommaIdx + 1);

      processedIngredientsData.push(stepIngredients);
    }

    setStepWiseIngredients(processedIngredientsData);
  }, [watch, fields]);

  return (
    <>
      {errors.steps && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2 flex items-center">
          <BiSolidErrorCircle className="text-lg" />
          &nbsp; At least 3 steps are required for submitting a recipe.
        </p>
      )}

      {fields.map((field, index) => {
        let placeholder = "What's next?";

        if (index === 0) placeholder = "How do we start this recipe?";

        return (
          <div className="bg-slate-200 rounded-lg" key={field.id}>
            <div className="flex min-h-[20px] font-semibold px-1 my-1 bg-slate-200 items-center">
              <div className="bg-slate-300 py-1 px-2 rounded-md text-slate-600 flex-none">
                Step {index + 1}
              </div>

              {stepWiseIngredients[index] && (
                <span className="text-slate-500 py-1 pl-2 font-medium">
                  Tagged with
                  <span
                    onClick={scrollAction}
                    className="cursor-pointer text-slate-500 py-1 px-1 lowercase underline font-semibold decoration-dotted"
                  >
                    {stepWiseIngredients[index]}
                  </span>
                </span>
              )}
            </div>

            <div className="flex gap-1 w-full">
              <textarea
                className="focus:outline-none focus:ring-0 border-0 flex items-center h-24 grow bg-slate-300 text-ninja-blue font-semibold rounded-lg py-2 px-3 text-base"
                placeholder={placeholder}
                required
                {...register(`steps.${index}${identifier}`)}
              />

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => deleteStep(index)}
                  className="font-semibold bg-[#9c1a11] text-white rounded-lg hover:opacity-90 cursor-pointer px-3 py-2"
                >
                  <BiSolidTrash className="text-lg" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div>
        {/* TODO: FIX THIS */}
        <button
          type="button"
          onClick={() => append("" as any)}
          className="float-right w-36 font-semibold bg-slate-300 text-black text-base rounded-lg hover:opacity-90 cursor-pointer px-4 py-2 flex items-center justify-center gap-1"
        >
          <BiPlus className="text-xl"></BiPlus> Add Step
        </button>
      </div>
    </>
  );
};

export default RecipeStepsInput;
