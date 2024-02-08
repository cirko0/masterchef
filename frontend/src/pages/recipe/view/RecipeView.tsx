import { useEffect, useState } from "react";
import { useRecipes } from "../../../providers/recipeContext";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDialogs } from "../../../providers/dialogContext";
import RecipeBanner from "../../../components/recipe_display/RecipeBanner";
import RecipeInsights from "../../../components/recipe_display/RecipeInsights";
import RecipeIngredients from "../../../components/recipe_display/RecipeIngredients";
import RecipeSteps from "../../../components/recipe_display/RecipeSteps";
import { Recipe } from "../../../interfaces/recipe_display.interface";
import {
  BiSolidLock,
  BiSolidPen,
  BiSolidPencil,
  BiSolidTrash,
} from "react-icons/bi";

const RecipeView: React.FC = () => {
  const recipes = useRecipes();
  const userData = useUser();
  let { idx } = useParams();

  const navigate = useNavigate();

  let [currentRecipe, setCurrentRecipe] = useState<Recipe>({} as Recipe);
  let [user, setUser] = useState({ id: "unset" });

  const dialogs = useDialogs();

  const deleteAction = async () => {
    if (
      !(await dialogs.awaitConfirmation(
        "Confirmation Required",
        `Are you sure you want to delete "${currentRecipe.name}"?`
      ))
    )
      return;

    dialogs.showLoading("Deleting...");

    await recipes.io.delete({ idx: currentRecipe._id });
    dialogs.showMessage(
      "Confirmation",
      `Your recipe "${currentRecipe.name}" has been deleted.`
    );

    navigate("/account/myrecipes");
  };

  const editAction = async () => {
    dialogs.showLoading("Unlocking Recipe...");

    navigate("/recipe/edit/" + idx);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRecipe();
  }, []);

  useEffect(() => {
    if (userData.user) setUser(userData.user);
  }, [userData]);

  const loadRecipe = async () => {
    let recipe = await recipes.specific.get(idx as string);

    if (!recipe) {
      dialogs.showMessage(
        "Could not find recipe",
        "If this recipe ever existed, it has probably been deleted."
      );
      navigate("/");
      return;
    }

    if (recipe.health_score && recipe.health_score < 3)
      recipe.health_category = "Unhealthy";
    else if (recipe.health_score && recipe.health_score < 5)
      recipe.health_category = "Somewhat Unhealthy";
    else if (recipe.health_score && recipe.health_score === 5)
      recipe.health_category = "Some health implications";
    else if (recipe.health_score && recipe.health_score < 8)
      recipe.health_category = "Fairly Healthy";
    else recipe.health_category = "Healthy";

    setCurrentRecipe(recipe);
  };

  return (
    <div className="flex flex-col gap-10">
      <RecipeBanner currentRecipe={currentRecipe} />

      <article className="container mx-auto flex flex-col gap-6">
        {user.id === currentRecipe?.userId && (
          <section
            className="relative flex justify-between items-center bg-green-100 
                px-3 py-2 md:mt-[-15px] rounded-lg md:w-[49%] flex-col lg:flex-row gap-2"
          >
            <h2 className="text-green-800 font-bold text-lg flex items-center justify-center gap-1">
              <BiSolidLock className="text-lg"></BiSolidLock>
              Ownership Controls
            </h2>
            <div className="flex gap-2">
              <button
                className="bg-[#0F7556] px-3 py-2 rounded-lg font-semibold text-center text-white hover:opacity-90 cursor-pointer flex items-center justify-center"
                type="button"
                onClick={editAction}
              >
                <BiSolidPencil className="text-lg" />
                &nbsp; Edit
              </button>
              <button
                className="bg-[#9c1a11] px-3 py-2 rounded-lg font-semibold text-center text-white hover:opacity-90 cursor-pointer flex items-center justify-center"
                type="button"
                onClick={deleteAction}
              >
                <BiSolidTrash className="text-lg"></BiSolidTrash>
                &nbsp; Delete
              </button>
            </div>
          </section>
        )}

        <h3 className="text-black font-bold text-3xl">Introduction</h3>

        {!currentRecipe.intro && (
          <>
            <div className="h-5 w-[90%] rounded bg-slate-200 animate-pulse" />
            <div className="h-5 w-[60%] rounded bg-slate-200 animate-pulse" />
          </>
        )}
        <p className="text-black font-medium text-md">{currentRecipe?.intro}</p>

        <h3 className="text-black font-bold text-3xl">Good to know</h3>

        <RecipeInsights currentRecipe={currentRecipe} />

        <section className="italic font-medium text-slate-500 text-sm">
          <p>
            Disclaimer: AI Insights are experimental and may, at times, contain
            inaccurate or controversial information.
          </p>
        </section>

        <h3 className="text-black font-bold text-3xl">What you'll need</h3>

        <RecipeIngredients currentRecipe={currentRecipe} />

        <h3 className="text-black font-bold text-3xl">Steps</h3>

        <RecipeSteps currentRecipe={currentRecipe} />
      </article>
    </div>
  );
};

export default RecipeView;
