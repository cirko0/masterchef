import React, { useRef } from "react";
import { useRecipes } from "../../../providers/recipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useDialogs } from "../../../providers/dialogContext";
import { useUser } from "@clerk/clerk-react";
// import { DevTool } from "@hookform/devtools";
import RecipeDescriptionInput from "../../../components/recipe_manipulation/RecipeDescriptionInput";
import RecipeIngredientsInput from "../../../components/recipe_manipulation/RecipeIngredientsInput";
import RecipeTitleInput from "../../../components/recipe_manipulation/RecipeTitleInput";
import RecipeTimeInput from "../../../components/recipe_manipulation/RecipeTimeInput";
import RecipeStepsInput from "../../../components/recipe_manipulation/RecipeStepsInput";
import RecipeImageInput from "../../../components/recipe_manipulation/RecipeImageInput";
import RecipeIntroductionInput from "../../../components/recipe_manipulation/RecipeIntroductionInput";
import ManualModeBanner from "../../../components/communication/ManualModeBanner";
import RecipeEditDietIndicator from "../../../components/communication/RecipeEditDietIndicator";
import { BiSolidBolt, BiSolidSave, BiTrash } from "react-icons/bi";
import { IngredientField } from "../../../interfaces/recipe_manipulation/recipe_manipulation.interface";

const RecipeEdit: React.FC = () => {
  const dialogs = useDialogs();
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const userData = useUser();
  const { idx } = useParams();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      dialogs.showLoading("Unlocking Recipe...");
      const recipe = await recipes.specific.get(idx as string);

      /* TODO: FIX THIS */
      for (let ingredient of recipe.ingredients) {
        ingredient.steps = ingredient.steps.toString().split(",") as any[];
      }

      if (userData.user?.id !== recipe.userId) {
        dialogs.showMessage(
          "Access Denied",
          "You do not have permission to edit this recipe."
        );
        navigate(`/recipe/view/${idx}`);
        return;
      }

      dialogs.close();

      return {
        steps: recipe.steps,
        ingredients: recipe.ingredients,
        name: recipe.name,
        cookingTime: recipe.cooking_time,
        desc: recipe.desc,
        intro: recipe.intro,
        diet: recipe.diet,
        _id: recipe._id,
      };
    },
  });

  const steps = useFieldArray({
    control,
    name: "steps",
    rules: { minLength: 3 },
  });

  const ingredients = useFieldArray({
    control,
    name: "ingredients",
    rules: { minLength: 1 },
  });

  const recipes = useRecipes();

  const cancelEdit = async () => {
    let continueCancel = await dialogs.awaitConfirmation(
      "Discard Changes",
      "Are you sure you want to cancel editing this recipe?"
    );

    if (continueCancel) navigate(`/recipe/view/${idx}`);
  };

  const onSubmit = async (data: any) => {
    dialogs.showLoading("Enforcing Spam Policy...");

    data.ingredients = data.ingredients.map((ingredient: any) => {
      ingredient.steps = ingredient.steps.map(Number);
      return ingredient;
    });

    let image = data.image;

    delete data.image;
    delete data.diet;

    data.cookingTime = +data.cookingTime;
    console.log(data);
    const submission = await recipes.io.update(data);

    if (submission.spam) {
      dialogs.showMessage(
        "Spam Policy Violation",
        `${submission.msg} Please make necessary corrections and try again.`
      );
      return;
    }

    let imageError = "";

    if (image.length > 0) {
      dialogs.showLoading("Uploading & Reassigning Image...");
      const imageUpload = await recipes.io.updateImage(image[0], data._id);

      if (imageUpload.code !== 200)
        imageError = `, however we encountered an error while trying to replace the image`;
    }

    dialogs.showMessage(
      "Edit Saved",
      `Your edit has been successfully saved${imageError}. AI will review your edit over the next few seconds and update insights for your recipe, if necessary.`
    );

    navigate(`/recipe/view/${data._id}`);
  };

  return (
    <main ref={container} className="min-h-[69vh]">
      {/* <DevTool control={control} placement="top-right" /> */}

      <div
        className=" bg-gradient-to-r from-darkorange to-gold h-24 w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
        <h1 className="z-10">Edit Recipe (Beta)</h1>
      </section>

      <section className="py-5 flex flex-col gap-5">
        <ManualModeBanner />
        <form
          className="flex flex-col gap-3 md:w-[95%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-bold text-xl text-black mt-1">
            Recipe Title
          </label>
          <RecipeTitleInput register={register} errors={errors} />

          <label className="font-bold text-xl text-black mt-1">
            Estimated Cooking Time
          </label>
          <RecipeTimeInput register={register} errors={errors} />

          <label className="font-bold text-xl text-black mt-1 flex items-center">
            <BiSolidBolt />
            &nbsp; Short Description &nbsp;
            <small className="text-slate-400">(used when featured)</small>
          </label>
          <RecipeDescriptionInput register={register} errors={errors} />

          <label className="font-bold text-xl text-black mt-1 flex items-center">
            <BiSolidBolt />
            &nbsp; Introduction
          </label>
          <RecipeIntroductionInput register={register} errors={errors} />

          <label
            className="font-bold text-xl text-black mt-1 flex items-center"
            id="ingredientLabel"
          >
            <BiSolidBolt />
            &nbsp; Ingredients
          </label>
          <RecipeIngredientsInput
            register={register}
            errors={errors}
            fields={ingredients.fields as IngredientField[]}
            append={ingredients.append}
            remove={ingredients.remove}
            steps={steps}
          />

          <label className="font-bold text-xl text-black mt-1 flex items-center">
            <BiSolidBolt />
            &nbsp; Dietary Classification
          </label>
          <RecipeEditDietIndicator watch={watch()} />

          <label className="font-bold text-xl text-black mt-1">
            Cooking Steps
          </label>
          <RecipeStepsInput
            register={register}
            errors={errors}
            fields={steps.fields}
            append={steps.append}
            remove={steps.remove}
            watch={watch()}
          />

          <label className="font-bold text-xl text-black">Replace Image</label>
          <RecipeImageInput register={register} />

          <div className="flex flex-col md:flex-row gap-2 justify-end">
            <button
              className="md:w-[250px] h-[50px] mt-[16px] bg-slate-300 text-black rounded-[10px] font-bold text-[17px] text-center hover:opacity-90 cursor-pointer flex items-center justify-center"
              type="button"
              onClick={cancelEdit}
            >
              <BiTrash className="text-xl" />
              &nbsp; Cancel
            </button>
            <button
              className="md:w-[250px] h-[50px] md:mt-[16px] bg-[#0F7556] rounded-[10px] font-bold text-[17px] text-center text-white hover:opacity-90 cursor-pointer flex items-center justify-center"
              type="submit"
            >
              <BiSolidSave className="text-xl" />
              &nbsp; Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RecipeEdit;
