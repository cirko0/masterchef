import React from "react";
import { RecipeViewProps } from "../../interfaces/recipe_display.interface";
import {
  BiAlarm,
  BiAlarmExclamation,
  BiPlusMedical,
  BiSolidErrorCircle,
  BiSolidMagicWand,
} from "react-icons/bi";

const RecipeInsights: React.FC<RecipeViewProps> = ({ currentRecipe }) => {
  return (
    <>
      <section className="font-medium text-black flex gap-5 mb-2 flex-col md:flex-row">
        {currentRecipe.health_category && (
          <div className="bg-white shadow-master rounded-2xl px-5 py-4 basis-1/2">
            <span className="font-semibold bg-slate-300 text-slate-800 py-1 px-3 rounded-lg mr-2 mb-2 inline-block">
              <BiSolidMagicWand className="inline-block align-middle text-lg" />
              <span className="inline-block align-middle">
                &nbsp; AI Insights
              </span>
            </span>
            <span className="font-semibold bg-red-100 text-red-900 py-1 px-3 rounded-lg mr-2 inline-block">
              <BiPlusMedical className="inline-block align-middle text-lg" />
              <span className="inline-block align-middle">
                &nbsp; Health Impact
              </span>
            </span>
            <h4 className="font-semibold mt-1 mb-2 text-xl">
              {currentRecipe.health_category}&nbsp;
              <small>({currentRecipe.health_score}/10)</small>
            </h4>
            <p> {currentRecipe?.health_reason} </p>
          </div>
        )}

        {!currentRecipe.health_category && (
          <div className="bg-slate-200 animate-pulse h-48 shadow-master rounded-2xl px-5 py-4 md:basis-1/2" />
        )}

        {currentRecipe.allergies && (
          <div className="bg-white shadow-master rounded-2xl px-5 py-4 basis-1/2">
            <span className="font-semibold bg-slate-300 text-slate-800 py-1 px-3 rounded-lg mr-2 mb-2 inline-block">
              <BiSolidMagicWand className="inline-block align-middle text-lg" />
              <span className="inline-block align-middle">
                &nbsp; AI Insights
              </span>
            </span>
            <span className="font-semibold bg-yellow-100 text-yellow-900 py-1 px-3 rounded-lg mr-2 inline-block ">
              <BiSolidErrorCircle className="inline-block align-middle text-lg" />
              <span className="inline-block align-middle">
                &nbsp; Allergy Information
              </span>
            </span>
            <h4 className="font-semibold mt-1 mb-2 text-xl">
              {currentRecipe.allergies?.length > 0
                ? "Warning"
                : "No Common Allergens"}
            </h4>
            <p>
              {currentRecipe.allergies?.length > 0
                ? "This recipe may not be suitable for individuals with allergic tendencies to the following items: " +
                  currentRecipe.allergies.join(", ")
                : "We didn't find any common food allergens in this recipe. However, if you are cooking for a guest, we recommend asking them about any allergies that they may have."}
            </p>
          </div>
        )}

        {!currentRecipe.allergies && (
          <div className="bg-slate-200 animate-pulse h-48 shadow-master rounded-2xl px-5 py-4 md:basis-1/2" />
        )}
      </section>
    </>
  );
};

export default RecipeInsights;
