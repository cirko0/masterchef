//@ts-nocheck
import Card from "./Card";
import { useRecipes } from "../../providers/recipeContext";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { BiChevronsDown, BiSearch } from "react-icons/bi";

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
  const cardWidth = 320;
  const container = useRef<HTMLDivElement>(null);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      let cardsPerRow = Math.floor(
        (container.current?.offsetWidth || 0) / (cardWidth + 24)
      );

      if (cardsPerRow === 1) cardsPerRow = 4;

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
      <Card width="320px" height="275px"></Card>
      <Card width="320px" height="275px"></Card>
      <Card width="320px" height="275px"></Card>
    </>
  );

  return (
    <div>
      <section className="mb-5 flex gap-8">
        <div
          className="flex items-center h-10 grow bg-slate-100 
                text-black rounded-lg py-1 px-3"
        >
          <input
            type="search"
            className="h-full text-base font-semibold grow bg-white/0 focus:outline-none focus:ring-0 border-0"
            placeholder="Search"
            ref={searchInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              search(e.target.value)
            }
          />
          <div className="flex items-center h-10 bg-slate-100 text-black font-medium rounded-lg py-1 px-3">
            <BiSearch className="rotate-90 text-2xl" />
          </div>
        </div>

        <div className="w-[320px] lg:w-[600px] hidden md:block"></div>
      </section>

      <div
        className="flex flex-col md:flex-row flex-wrap gap-6 list-none ml-0 pl-0 items-center md:items-start"
        ref={container}
      >
        {recipes.search.isActive
          ? recipes.search.results.length > 0
            ? recipes.search.results.map((recipe: Recipe) => (
                <div
                  key={`library-search-card-${recipe._id}`}
                  className="w-full h-32 md:w-[320px] md:h-[275px]"
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
                className="w-full h-32 md:w-[320px] md:h-[275px]"
              >
                <Card
                  width="320px"
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
              className="bg-slate-100 text-black rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
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
              className="bg-slate-100 text-black rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
            >
              Load More
            </button>
          )}
        {loadingMore && (
          <button
            type="button"
            disabled
            className="animate-bounce bg-slate-100 text-black rounded-xl hover:opacity-90 cursor-pointer px-4 py-2"
          >
            <BiChevronsDown />
          </button>
        )}
      </section>
    </div>
  );
}
