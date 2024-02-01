import { FunctionComponent, useEffect } from "react";
import FeaturedBanner from "../components/navigation/FeaturedBanner";
import ControlBox from "../components/navigation/ControlBox";
import Library from "../components/recipe_discovery/Library";
import { useRecipes } from "../providers/recipeContext";
import Card from "../components/recipe_discovery/Card";

const Home: FunctionComponent = () => {
  const recipes = useRecipes();

  return (
    <>
      <section className="grid grid-cols-4 my-14 gap-10">
        {recipes.recent.list.length === 0 ? (
          <FeaturedBanner id={""} />
        ) : (
          <FeaturedBanner
            author={recipes.recent.list[0].author}
            id={recipes.recent.list[0]._id}
            name={recipes.recent.list[0].name}
            text={recipes.recent.list[0].desc}
          />
        )}
        <div className="hidden lg:flex">
          <div className="w-full h-full">
            {recipes.recent.list.length === 0 && <Card />}
            {recipes.recent.list.length > 0 && (
              <Card
                name={recipes.recent.list[0].name}
                type={recipes.recent.list[0].diet}
                chef={recipes.recent.list[0].author}
                img={`${recipes.recent.list[0].img_url}/ncThumbnail`}
                obj={recipes.recent.list[0]}
              />
            )}
          </div>
        </div>
        <ControlBox />
      </section>

      <div className="w-full flex items-start justify-center mt-10 mb-5 flex-col">
        <h1 className="text-[30px]">There’s more to explore</h1>
      </div>

      <Library></Library>

      <div className="w-full flex items-center justify-center my-20">
        <button className="px-6 py-3 border-none outline-none cursor-pointer text-[18px] font-bold text-white rounded-[15px] bg-gradient-to-r from-darkorange to-gold-100">
          Load More
        </button>
      </div>
    </>
  );
};

export default Home;
