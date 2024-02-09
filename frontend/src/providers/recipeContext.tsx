/*
    * Centeralised Data and State Managment for Recipes using Context API
    TODO: Improve error handling.
*/

import React, { FC, useContext, useRef, useState } from "react";
import { useSession } from "@clerk/clerk-react";
import {
  AddRecipeResponse,
  ProviderProps,
  RecipeContextType,
  GetRecipe,
} from "../interfaces/provider.interfaces";
import { Recipe } from "../interfaces/recipe_display.interface";

const RecipeContext = React.createContext<RecipeContextType | undefined>(
  undefined
);

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }

  return context;
};

export const RecipeProvider: FC<ProviderProps> = ({ children }) => {
  const { session } = useSession();

  const recipes: RecipeContextType = {
    recent: {
      list: [],
      count: 0,
      userList: [],
      userCount: 0,

      get: async (
        skip = 0,
        limit = config.pageLength.current,
        updateState = true
      ) => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await fetch(
              `${BACKEND_URI}/api/v1/recipes/${skip}/${limit}`
            ).then((raw) => raw.json());

            if (updateState) setRecentList(result.recipes);
            setRecentCount(result.count);

            resolve(result.recipes);
          } catch (e) {
            alert(
              "Could not load recipes, please check your internet connection and refresh the page"
            );
          }
        });
      },

      loadMore: async () => {
        return new Promise(async (resolve) => {
          try {
            const results = await recipes.recent.get(
              recent.list.length,
              config.pageLength.current,
              false
            );

            console.log(recipes.recent.list.concat(results));

            setRecentList(recipes.recent.list.concat(results));

            resolve();
          } catch (error) {
            resolve();
          }
        });
      },

      getForUser: async (
        skip = 0,
        limit = config.pageLength.current,
        updateState = true
      ) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();
            const result = await fetch(
              `${BACKEND_URI}/api/v1/recipes/user/${skip}/${limit}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).then((raw) => raw.json());

            if (updateState) setRecentUserList(result.recipes);
            setRecentUserCount(result.count);

            resolve(result.recipes);
          } catch (e) {
            console.log(e);
            alert(
              "Could not load recipes, please check your internet connection and refresh the page"
            );
          }
        });
      },

      loadMoreForUser: async () => {
        return new Promise(async (resolve) => {
          try {
            const results = await recipes.recent.getForUser(
              recent.userList.length,
              config.pageLength.current,
              false
            );

            setRecentUserList(recent.userList.concat(results));

            resolve();
          } catch (error) {
            resolve();
          }
        });
      },
    },
    search: {
      results: [],
      isActive: false,
      isPending: false,
      count: 0,
      keywords: useRef<string>(""),

      query: async (
        query,
        skip = 0,
        limit = config.pageLength.current,
        updateState = true
      ) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (query.length < 3) {
              setSearchResults([]);
              setSearchIsPending(false);
              setSearchIsActive(false);

              search.keywords.current = "";

              resolve(search.results);
              return;
            }

            if (updateState) {
              setSearchIsActive(true);
              setSearchIsPending(true);
            }

            const result = await fetch(
              `${BACKEND_URI}/api/v1/search/${skip}/${limit}?q=${query}`
            ).then((rawData) => rawData.json());
            console.log(result);
            if (updateState) {
              setSearchIsPending(false);
              setSearchResults(result);

              search.keywords.current = query;
            }

            if (result.length > 0) setSearchCount(result[0].meta.count.total);
            else setSearchCount(0);

            resolve(result);
          } catch (e) {
            console.log(e);
            alert(
              "Could not load search results, please check your internet connection and refresh the page"
            );
            resolve(search.results);
          }
        });
      },

      loadMore: async () => {
        return new Promise(async (resolve) => {
          try {
            const results = await recipes.search.query(
              search.keywords.current,
              search.results.length,
              config.pageLength.current
            );

            setSearchResults(recipes.search.results.concat(results));

            resolve();
          } catch (error) {
            resolve();
          }
        });
      },
    },
    specific: {
      state: {},

      get: async (idx) => {
        return new Promise(async (resolve, reject) => {
          try {
            const result = await fetch(
              `${BACKEND_URI}/api/v1/recipes/${idx}`
            ).then((rawData) => rawData.json());

            setSpecific(result);
            resolve(result);
          } catch (e) {
            alert(
              "Could not load recipes, please check your internet connection and refresh the page"
            );
          }
        });
      },
    },
    config: {
      pageLength: useRef<number>(8),

      setPageLength: (length) => {
        return new Promise((resolve) => {
          console.log(length);
          config.pageLength.current = length;
          resolve();
        });
      },
    },

    io: {
      add: async (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();
            console.log(token);
            let res = await fetch(`${BACKEND_URI}/api/v1/recipes`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            });

            res = await res.json();

            recipes.recent.get();

            resolve(res as unknown as AddRecipeResponse);
          } catch (error) {
            alert(
              "Something went wrong while submitting the recipe, please try again!"
            );
          }
        });
      },

      delete: async (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();
            await fetch(`${BACKEND_URI}/api/v1/recipes/${data.idx}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => res.json());

            recent.get();
            recent.getForUser();

            resolve(data.idx);
          } catch (error) {
            alert("Couldn't delete recipe - please check your connection");
            reject();
          }
        });
      },

      attachImage: async (image) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();

            const formData = new FormData();
            formData.append("image", image);

            let res = await fetch(
              `${BACKEND_URI}/api/v1/recipes/images/upload`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },

                body: formData,
              }
            );

            res = await res.json();

            //recipes.recent.get();

            resolve(res);
          } catch (error) {
            console.log(error);
            alert(
              "Something went wrong while uploading the image, please try again!"
            );
            reject();
          }
        });
      },

      getSubmissionStatus: async (idx) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();

            let res = await fetch(`${BACKEND_URI}/api/v1/submissions/${idx}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            res = await res.json();

            resolve(res);
          } catch (error) {
            console.log(error);
            alert(
              "Something went wrong while getting the status, please try again!"
            );
          }
        });
      },

      update: async (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();

            let res = await fetch(`${BACKEND_URI}/api/v1/recipes`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            });

            res = await res.json();

            recipes.recent.get();

            resolve(res);
          } catch (error) {
            alert(
              "Something went wrong while updatting the recipe, please try again!"
            );
          }
        });
      },

      updateImage: async (image, idx) => {
        return new Promise(async (resolve, reject) => {
          try {
            if (!session)
              throw new Error("You are not authenticated. Please login!");

            const token = await session.getToken();

            const formData = new FormData();

            formData.append("image", image);

            let res = await fetch(
              `${BACKEND_URI}/api/v1/recipes/images/upload/${idx}`,
              {
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${token}`,
                },

                body: formData,
              }
            );

            res = await res.json();

            //recipes.recent.get();

            resolve(res);
          } catch (error) {
            console.log(error);
            alert(
              "Something went wrong while updating the image, please try again!"
            );
            reject();
          }
        });
      },
    },
  };

  //* Recent

  let setRecentList: React.Dispatch<React.SetStateAction<GetRecipe[] | []>>,
    setRecentCount: React.Dispatch<React.SetStateAction<number>>,
    setRecentUserList: React.Dispatch<React.SetStateAction<GetRecipe[] | []>>,
    setRecentUserCount: React.Dispatch<React.SetStateAction<number>>;

  [recipes.recent.list, setRecentList] = useState<GetRecipe[]>([]);
  [recipes.recent.count, setRecentCount] = useState<number>(1);

  [recipes.recent.userList, setRecentUserList] = useState<GetRecipe[]>([]);
  [recipes.recent.userCount, setRecentUserCount] = useState<number>(0);

  const recent = recipes.recent;

  //* Search

  let setSearchResults: React.Dispatch<React.SetStateAction<GetRecipe[] | []>>,
    setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSearchIsPending: React.Dispatch<React.SetStateAction<boolean>>,
    setSearchCount: React.Dispatch<React.SetStateAction<number>>;

  [recipes.search.results, setSearchResults] = useState<GetRecipe[]>([]);
  [recipes.search.isActive, setSearchIsActive] = useState<boolean>(false);
  [recipes.search.isPending, setSearchIsPending] = useState<boolean>(false);
  [recipes.search.count, setSearchCount] = useState<number>(0);

  const search = recipes.search;

  //* Specific

  let setSpecific: React.Dispatch<React.SetStateAction<Recipe | {}>>;

  [recipes.specific.state, setSpecific] = useState<Recipe | {}>({});

  const specific = recipes.specific;

  //* Config

  const config = recipes.config;

  return (
    <RecipeContext.Provider value={recipes}>{children}</RecipeContext.Provider>
  );
};
