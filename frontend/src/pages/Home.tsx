import { FunctionComponent, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { BiSearch } from "react-icons/bi";
import FeaturedBanner from "../components/navigation/FeaturedBanner";
import ControlBox from "../components/navigation/ControlBox";

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
      <section className="grid grid-cols-4 my-20 gap-8">
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

      <div className="w-full flex items-start justify-center my-20 flex-col">
        <h1 className="text-[30px]">There’s more to explore</h1>
        <div className="md:w-[500px] mt-10">
          <div className="flex w-full flex-wrap items-stretch gap-5">
            <input
              type="search"
              className="m-0 w-[100px] flex-auto rounded-[10px] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-6 py-[2.5px] text-[18px] font-medium text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-darkorange focus:text-neutral-700  focus:outline-none dark:border-darkorange dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-darkorange"
              placeholder="Search"
              aria-label="Search"
            />

            <button
              className="flex bg-darkorange items-center justify-center text-white p-3 text-[20px] rounded-[10px] outline-none border-none cursor-pointer"
              type="button"
            >
              <BiSearch />
            </button>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-4 w-full text-left text-[20px] text-gold-100  gap-10">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>

      <div className="w-full flex items-center justify-center my-20">
        <button className="px-6 py-3 border-none outline-none cursor-pointer text-[18px] font-bold text-white rounded-[15px] bg-gradient-to-r from-darkorange to-gold-100">
          Load More
        </button>
      </div>
    </>
  );
};

export default Home;
