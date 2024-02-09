import React from "react";
import { RecipeViewProps } from "../../interfaces/recipe_display.interface";
import { BiCodeBlock, BiTime } from "react-icons/bi";

const RecipeBanner: React.FC<RecipeViewProps> = ({ currentRecipe }) => {
  return (
    <>
      <div
        className=" bg-gradient-to-r from-darkorange to-gold h-80 md:h-72 w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex flex-col md:flex-row z-10">
        <section className="grow flex justify-center md:justify-start items-center text-white">
          {currentRecipe.name && (
            <div className="flex flex-col gap-2 capitalize">
              <div className="h-8 md:hidden"></div>
              <h1 className="font-semibold text-3xl">{currentRecipe.name}</h1>
              <h2 className="font-medium text-lg italic">
                By {currentRecipe.author}
              </h2>
              <div className="h-0 md:h-8"></div>
            </div>
          )}

          {!currentRecipe.name && (
            <div className="flex flex-col gap-2 w-full items-center md:items-start">
              <div className="h-8 md:hidden"></div>
              <div className="h-7 w-[70%] rounded-lg bg-whitesmoke animate-pulse"></div>
              <div className="h-7 w-[32%] rounded-lg bg-whitesmoke animate-pulse"></div>
              <div className="h-0 md:h-8"></div>
            </div>
          )}
        </section>

        {currentRecipe.name && (
          <section
            className="bg-whitesmoke w-full h-60 md:h-80 md:w-[50%] bg-cover bg-center rounded-xl 
                    mt-5 shadow-master"
            style={{
              backgroundImage: `url('${currentRecipe.img_url}')`,
            }}
          ></section>
        )}

        {!currentRecipe.name && (
          <section
            className="bg-whitesmoke w-full h-60 md:h-80 md:w-[50%] bg-cover bg-center rounded-xl 
                    mt-5 shadow-master animate-pulse"
          ></section>
        )}
      </section>

      {currentRecipe.name && (
        <section className="relative top-[-20px] md:absolute md:top-[27.6rem] flex gap-3 font-poppins z-10 justify-center md:justify-start text-ninja-blue">
          <div className="shadow-master bg-white py-2 px-3 rounded-2xl">
            <p className="font-semibold capitalize flex items-center gap-1">
              <BiTime className="text-lg" />
              {currentRecipe.cooking_time} mins
            </p>
          </div>
          <div className="shadow-master bg-white py-2 px-3 rounded-2xl">
            <p className="font-semibold capitalize">{currentRecipe.diet}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default RecipeBanner;
