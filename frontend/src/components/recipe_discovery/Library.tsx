//@ts-nocheck
import Card from "./Card";
import { useRecipes } from "../../providers/recipeContext";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

interface Recipe {
  _id: string;
  name: string;
  author: string;
  diet: string;
  img_url: string;
}

export default function Library() {
  const recipes = useRecipes();
  const searchInput = useRef<HTMLInputElement>(null);

  let query = "";
  const cardHeight = 275;
  const cardWidth = 300;
  const container = useRef<HTMLDivElement>(null);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      let cardsPerRow = Math.floor(
        (container.current?.offsetWidth || 0) / (cardWidth + 16)
      );
      if (cardsPerRow === 1) cardsPerRow = 3;
      recipes.config.setPageLength(cardsPerRow * 2);
      if (searchInput.current) {
        searchInput.current.value = recipes.search.keywords.current;
      }
      await recipes.recent.get();
    };

    loadRecipes();
  }, []);

  const search = (value: string) => {
    query = value;

    setTimeout(async () => {
      if (query === value) {
        await recipes.search.query(query);
      }
    }, 700);
  };

  const loadMoreRecent = async () => {
    setLoadingMore(true);
    await recipes.recent.loadMore();
    setLoadingMore(false);
  };

  const loadMoreSearchResults = async () => {
    setLoadingMore(true);
    await recipes.search.loadMore();
    setLoadingMore(false);
  };

  const defaultState = (
    <>
      <Card width="300px" height="275px"></Card>
      <Card width="300px" height="275px"></Card>
      <Card width="300px" height="275px"></Card>
    </>
  );

  return (
    <div>
      <div className="md:w-[500px] mt-10">
        <div className="flex w-full flex-wrap items-stretch gap-5">
          <input
            type="search"
            className="m-0 w-[100px] flex-auto rounded-[10px] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-4 py-[2.5px] text-[18px] font-medium text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-darkorange focus:text-neutral-700  focus:outline-none dark:border-darkorange dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-darkorange"
            placeholder="Search"
            aria-label="Search"
            ref={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              search(e.target.value)
            }
          />

          <button
            className="flex bg-darkorange items-center justify-center text-white p-3 text-[20px] rounded-[10px] outline-none border-none cursor-pointer"
            type="button"
          >
            <BiSearch />
          </button>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row flex-wrap gap-4 list-none ml-0 pl-0 items-center md:items-start"
        ref={container}
      >
        {recipes.search.isActive
          ? recipes.search.results.length > 0
            ? recipes.search.results.map((recipe: Recipe) => (
                <div
                  key={`library-search-card-${recipe._id}`}
                  className="w-full h-32 md:w-[300px] md:h-[275px]"
                >
                  <Card
                    width={`${cardWidth}px`}
                    height={`${cardHeight}px`}
                    name={recipe.name}
                    chef={recipe.author}
                    type={recipe.diet}
                    img={`${recipe.img_url}/ncThumbnail`}
                    obj={recipe}
                  />
                </div>
              ))
            : recipes.search.isPending
            ? defaultState
            : "No Results"
          : recipes.recent.list.length > 0
          ? recipes.recent.list.map((recipe: Recipe) => (
              <div
                key={`library-recent-card-${recipe._id}`}
                className="w-full h-32 md:w-[300px] md:h-[275px]"
              >
                <Card
                  width="300px"
                  height="275px"
                  name={recipe.name}
                  chef={recipe.author}
                  type={recipe.diet}
                  img={`${recipe.img_url}/ncThumbnail`}
                  obj={recipe}
                />
              </div>
            ))
          : defaultState}
      </div>

      <section className="flex justify-center font-bold mt-10">
        {!recipes.search.isActive &&
          recipes.recent.count > recipes.recent.list.length &&
          !loadingMore && (
            <button
              type="button"
              onClick={loadMoreRecent}
              className="bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
            >
              Load More
            </button>
          )}
        {recipes.search.isActive &&
          !recipes.search.isPending &&
          recipes.search.count > recipes.search.results.length &&
          !loadingMore && (
            <button
              type="button"
              onClick={loadMoreSearchResults}
              className="bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
            >
              Load More
            </button>
          )}
        {loadingMore && (
          <button
            type="button"
            disabled
            className="animate-bounce bg-slate-300 text-ninja-blue rounded-xl hover:opacity-90 cursor-pointer px-4 py-2"
          >
            <i className="fa-solid fa-angles-down"></i>
          </button>
        )}
      </section>
    </div>
  );
}
