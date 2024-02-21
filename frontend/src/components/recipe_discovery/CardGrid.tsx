import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { useRecipes } from "../../providers/recipeContext";
import { CardGridProps } from "../../interfaces/recipe_discovery/recipe_discovery.interface";

const CardGrid: React.FC<CardGridProps> = ({
  list,
  total,
  initFunction,
  loadMoreFunction,
  noResultMessage = "No Results",
}) => {
  const recipes = useRecipes();
  const container = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadRecipes = async (): Promise<void> => {
    let cardsPerRow = Math.floor(container.current!.offsetWidth / 316);
    if (cardsPerRow === 1) cardsPerRow = 3;
    recipes.config.setPageLength(cardsPerRow * 2);

    await initFunction();
    setLoading(false);
  };

  const loadMoreRecent = async (): Promise<void> => {
    setLoadingMore(true);
    await loadMoreFunction();
    setLoadingMore(false);
  };

  const defaultState = (
    <>
      <Card width="320px" height="275px"></Card>
      <Card width="320px" height="275px"></Card>
      <Card width="320px" height="275px"></Card>
    </>
  );

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <div>
      <div
        className="flex flex-col md:flex-row flex-wrap gap-4 list-none ml-0 pl-0 items-center md:items-start"
        ref={container}
      >
        {loading && defaultState}

        {!loading &&
          list.length > 0 &&
          list.map((recipe) => (
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
                img={`${recipe.img_url}`}
                obj={recipe}
              />
            </div>
          ))}

        {!loading && list.length === 0 && (
          <p className="font-medium text-black">{noResultMessage}</p>
        )}
      </div>

      <section className="flex justify-center font-bold mt-10">
        {total > list.length && !loadingMore && (
          <button
            type="button"
            onClick={loadMoreRecent}
            className="bg-slate-300 text-black rounded-lg hover:opacity-90 cursor-pointer px-4 py-2"
          >
            Load More
          </button>
        )}

        {loadingMore && (
          <button
            type="button"
            disabled
            className="animate-bounce bg-slate-300 text-black rounded-xl hover:opacity-90 cursor-pointer px-4 py-2"
          >
            <i className="fa-solid fa-angles-down"></i>
          </button>
        )}
      </section>
    </div>
  );
};

export default CardGrid;
