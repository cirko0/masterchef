import React from "react";
import {
  UseFormRegister,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";
import { useDialogs } from "../../providers/dialogContext";

interface Ingredient {
  name: string;
  category: string;
}

interface RecipeIngredientsInputProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
  fields: any;
  append: any;
  remove: (index: number) => void;
  steps: any;
}

const RecipeIngredientsInput: React.FC<RecipeIngredientsInputProps> = ({
  register,
  errors,
  fields,
  append,
  remove,
  steps,
}) => {
  const dialogs = useDialogs();

  const deleteIngredient = async (index: number) => {
    const thisIngredient = fields[index].name || "this ingredient";
    let confirmation = await dialogs.awaitConfirmation(
      "Confirmation Required",
      `Are you sure you want to delete ${thisIngredient}?`
    );
    if (confirmation) remove(index);
  };

  return (
    <div className="flex flex-col gap-5">
      {errors.steps && (
        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
          <i className="fa-solid fa-circle-exclamation" />
          &nbsp; {errors.steps?.message}
        </p>
      )}

      {fields.map((field: any, index: number) => (
        <div
          className="flex flex-col gap-2 bg-white p-3 shadow-ninja rounded-xl border-2 border-slate-300 border-dashed"
          key={field.id}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <div className="grow font-poppins font-semibold flex flex-col gap-1">
              <label>Name</label>
              <input
                className="focus:outline-none focus:ring-0 border-0 flex items-center h-10 w-full capitalize bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3"
                type="text"
                placeholder="Name"
                required
                {...register(`ingredients.${index}.name`)}
              />
            </div>

            <div className="md:min-w-[350px] font-poppins font-semibold flex flex-col gap-1">
              <label>Category</label>
              <select
                className="focus:outline-none focus:ring-0 border-0 flex items-center h-10 capitalize bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3"
                defaultValue={field.category}
                {...register(`ingredients.${index}.category`)}
              >
                <option className="font-semibold" value="veggies">
                  Fruits & Veggies
                </option>
                <option className="font-semibold" value="meat">
                  Meat & Eggs
                </option>
                <option className="font-semibold" value="dairy">
                  Dairy
                </option>
                <option className="font-semibold" value="other">
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col font-poppins gap-1">
              <label className="font-semibold">Stepwise Usage</label>
              <div className="flex gap-2 font-medium">
                {steps.fields.map((step: any, i: number) => (
                  <label key={i} htmlFor={`ingredients.${index}.steps`}>
                    <input
                      type="checkbox"
                      className="bg-slate-300 border-0 text-[#00ae82] rounded-sm focus:ring-0"
                      value={i + 1}
                      {...register(`ingredients.${index}.steps`, {
                        required: true,
                      })}
                    />
                    {` ${i + 1}`}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => deleteIngredient(index)}
                  className="font-poppins font-semibold bg-slate-300
                  text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer
                  px-3 py-2 mb-1"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={append}
          className="float-right mt-3 font-poppins font-semibold bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
        >
          <i className="fa-solid fa-plus"></i> Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default RecipeIngredientsInput;
