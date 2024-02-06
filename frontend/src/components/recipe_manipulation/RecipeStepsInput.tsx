import { FC, useEffect, useState } from "react";
import { useDialogs } from "../../providers/dialogContext";

interface Ingredient {
  name: string;
  steps?: string[];
}

interface RecipeStepsInputProps {
  register: any;
  errors: { steps?: boolean };
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
  identifier?: string;
  watch: { ingredients?: Ingredient[] } | null;
}

const RecipeStepsInput: FC<RecipeStepsInputProps> = ({
  register,
  errors,
  fields,
  append,
  remove,
  identifier = "",
  watch,
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

      for (let ingredient of ingredients) {
        if (!ingredient.steps) continue;
        if (ingredient.steps.includes(`${i + 1}`))
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
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
          <i className="fa-solid fa-circle-exclamation" />
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
                className="focus:outline-none focus:ring-0 border-0 flex items-center h-24 grow bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3"
                placeholder={placeholder}
                required
                {...register(`steps.${index}${identifier}`)}
              />

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => deleteStep(index)}
                  className="font-poppins font-semibold bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-3 py-2"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </div>
          </div>
        );
      })}

      <div>
        <button
          type="button"
          onClick={() => append("")}
          className="float-right w-36 font-poppins font-semibold bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
        >
          <i className="fa-solid fa-plus"></i> Add Step
        </button>
      </div>
    </>
  );
};

export default RecipeStepsInput;