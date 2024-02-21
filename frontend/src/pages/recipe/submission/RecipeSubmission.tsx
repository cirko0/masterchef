import React, { useEffect, useRef, useState } from "react";
import { useRecipes } from "../../../providers/recipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDialogs } from "../../../providers/dialogContext";
import { BiLoaderAlt, BiSolidErrorCircle } from "react-icons/bi";
import { PendingSubmission } from "../../../interfaces/recipe_display/recipe_display.interface";

interface Status {
  stage: string;
  is_pending: boolean;
  success: string;
  recipeId: string;
}

const RecipeSubmission: React.FC = () => {
  const recipes = useRecipes();
  const user = useUser();
  const navigate = useNavigate();

  const statusMessage = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<string>("loading");
  const { idx } = useParams();
  const dialogs = useDialogs();

  useEffect(() => {
    if (user.isLoaded) getStatus();
  }, [user]);

  const getStatus = async () => {
    const status: PendingSubmission = await recipes.io.getSubmissionStatus(
      idx as string
    );

    if (statusMessage.current)
      statusMessage.current.innerText = status.stage as string;

    if (status.is_pending === true) {
      setTimeout(() => getStatus(), 4500);
    } else if (status.success === "true") {
      dialogs.showMessage(
        "Review your submission",
        "Your submission has been successfully processed by AI Assist. Please review the completed recipe, and use the 'Edit' button to manually make any corrections or changes."
      );
      navigate(`/recipe/view/${status.recipeId}`);
    } else {
      setState("error");
    }
  };

  return (
    <main className="font-poppins min-h-[69vh]">
      <div
        className=" bg-gradient-to-r from-darkorange to-gold h-24 w-full absolute right-0 z-0"
        aria-hidden
      />
      <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
        <h1 className="z-10">Pending Recipe</h1>
      </section>
      <div className="flex flex-col justify-center items-center h-[50vh] gap-10">
        <div className="bg-white shadow-master rounded-xl flex flex-col justify-center items-center gap-3 px-12 py-8 min-h-[125px] min-w-[275px] max-w-[450px]">
          <div className="flex gap-5 justify-center items-center">
            {state === "error" && (
              <BiSolidErrorCircle className="text-yellow-500 text-3xl" />
            )}
            {state === "loading" && (
              <BiLoaderAlt className="animate-spin text-[#66bd94] text-3xl" />
            )}
            <p
              className="font-poppins font-semibold text-slate-600"
              ref={statusMessage}
            >
              Spam validation done, recipe queued for further processing...
            </p>
          </div>
        </div>
        {state === "loading" && (
          <div className="text-slate-500 font-medium text-sm text-center flex flex-col gap-2">
            <p>AI Assist is working on your submission.</p>
            <p className="text-slate-400 text-xs">
              This typically takes between 15-45 seconds.
            </p>
            <p className="italic text-slate-400 text-xs">
              Please feel free to minimize or close this window, and return back
              later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipeSubmission;
