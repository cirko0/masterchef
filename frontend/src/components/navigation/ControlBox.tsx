import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useDialogs } from "../../providers/dialogContext";

const ControlBox: React.FC = () => {
  let dialogs = useDialogs();

  const openSignInDialog = () => {
    dialogs.showAuth();
  };

  return (
    <div className="bg-gold rounded-[10px] md:h-[275px] md:w-[320px] py-[20px] px-[35px] flex flex-col items-center">
      <h1 className="text-white font-bold text-2xl md:text-3xl md:w-[250px] leading-8">
        Share with AI Assist
      </h1>
      <SignedIn>
        <Link to="/recipe/add" className="no-underline">
          <button
            className="w-[250px] h-[50px] mt-[16px] bg-white rounded-[10px] font-bold text-[17px] text-center text-gold hover:opacity-90 cursor-pointer"
            type="button"
          >
            Add Recipe
          </button>
        </Link>

        <Link to="/account/myrecipes" className="no-underline">
          <button
            className="w-[250px] h-[50px] mt-[10px] bg-white 
            rounded-[10px] font-bold text-[17px] text-center 
            text-gold hover:opacity-90 cursor-pointer"
            type="button"
          >
            My Recipes
          </button>
        </Link>
      </SignedIn>

      <SignedOut>
        <button
          className="w-[250px] h-[50px] mt-[20px] bg-white rounded-[10px] font-bold text-[17px] text-center text-gold hover:opacity-90 cursor-pointer"
          type="button"
          onClick={openSignInDialog}
        >
          Sign In
        </button>
      </SignedOut>
    </div>
  );
};

export default ControlBox;
