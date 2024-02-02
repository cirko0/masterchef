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
      <div className="flex flex-col gap-y-10">
        <section className="flex justify-between gap-6 flex-col md:flex-row">
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
            <div className="w-[320px] h-[275px]">
              {recipes.recent.list.length === 0 && (
                <Card width="320px" height="275px" />
              )}
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

        <section className="flex flex-col gap-y-5">
          <h1 className="text-[30px] font-bold text-2xl">
            There’s more to explore
          </h1>
          <Library />
        </section>
      </div>
    </>
  );
};

export default Home;
