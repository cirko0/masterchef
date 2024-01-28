import { FunctionComponent, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { BiSearch } from "react-icons/bi";
import FeaturedBanner from "../components/navigation/FeaturedBanner";
import ControlBox from "../components/navigation/ControlBox";
import Library from "../components/recipe_discovery/Library";

const Home: FunctionComponent = () => {
  const recipes = {
    recent: {
      list: [
        {
          author: "Ivan",
          _id: "",
          name: "Garlic Bread",
          desc: " A delectable garlic bread recipe with a perfect balance of flavors.",
        },
      ],
    },
  };
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
        <RecipeCard />
        <ControlBox />
      </section>

      <div className="w-full flex items-start justify-center my-10 flex-col">
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
