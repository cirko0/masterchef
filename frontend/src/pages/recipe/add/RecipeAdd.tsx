import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDialogs } from "../../../providers/dialogContext";
import { useRecipes } from "../../../providers/recipeContext";
import SpamBanner from "../../../components/communication/SpamBanner";
import AIAssistBanner from "../../../components/communication/AIAssistBanner";
import RecipeTitleInput from "../../../components/recipe_manipulation/RecipeTitleInput";
import RecipeTimeInput from "../../../components/recipe_manipulation/RecipeTimeInput";
import RecipeStepsInput from "../../../components/recipe_manipulation/RecipeStepsInput";
import RecipeImageInput from "../../../components/recipe_manipulation/RecipeImageInput";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { BiChevronsRight } from "react-icons/bi";

const RecipeAdd: React.FC = () => {
  const dialogs = useDialogs();
  const container = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      steps: [{ step: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
    rules: { minLength: 3 },
  });

  const recipes = useRecipes();

  const onSubmit = async (data: any) => {
    let recipeObj: any = {};

    if (data.image.length > 0) {
      dialogs.showLoading("Uploading Image...");
      const imageUpload = await recipes.io.attachImage(data.image[0]);
      recipeObj.submission_id = imageUpload.submission_id;
      dialogs.close();
    }

    recipeObj.name = data.name;
    recipeObj.cookingTime = data.cookingTime;
    recipeObj.steps = data.steps.map((step: { step: string }) => step.step);

    dialogs.showLoading("Enforcing Spam Policy...");
    const submission = await recipes.io.add(recipeObj);

    if (submission.spam) {
      dialogs.showMessage(
        "Spam Policy Violation",
        `${submission.msg} Please make necessary corrections and try again.`
      );
      return;
    }

    dialogs.close();

    navigate(`/recipe/submission/${submission.submission_id}`);
  };

  return (
    <main ref={container} className="min-h-[69vh]">
      <div
        className=" bg-gradient-to-r from-darkorange to-gold h-24 w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
        <h1 className="z-10 text-3xl">Add Recipe</h1>
      </section>

      <section className="py-5 flex flex-col gap-5">
        <SpamBanner />

        <form
          className="flex flex-col gap-3 md:w-[95%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-2xl text-black mt-1">
            What are we cooking, today?
          </h2>
          <RecipeTitleInput register={register} errors={errors} />

          <h2 className="font-bold text-2xl text-black mt-1">
            How long would this take to cook?
          </h2>
          <RecipeTimeInput register={register} errors={errors} />

          <h2 className="font-bold text-2xl text-black mt-1">Cooking Steps</h2>
          <AIAssistBanner />
          <RecipeStepsInput
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            identifier=".step"
          />

          <h2 className="font-bold text-2xl text-ninja-blue">
            Add an image <small className="text-slate-400">(optional)</small>
          </h2>
          <RecipeImageInput register={register} />

          <div>
            <button
              className="float-right w-[250px] h-[50px] mt-[16px] bg-[#0F7556] rounded-[10px] font-bold text-[17px] text-center text-white hover:opacity-90 cursor-pointer flex items-center justify-center"
              type="submit"
            >
              Send to AI Assist&nbsp;
              <BiChevronsRight className="text-3xl" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default RecipeAdd;
