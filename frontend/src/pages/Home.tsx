import { FunctionComponent } from "react";
import RecipeCard from "../components/RecipeCard";
import Nav from "../components/Nav";
import { TERipple } from "tw-elements-react";

const Home: FunctionComponent = () => {
  return (
    <div className="bg-white w-full px-[20rem]">
      <Nav />
      <section className="grid grid-cols-5 my-20 gap-10">
        <div className="rounded-xl bg-darkorange p-10 flex flex-col gap-5 col-span-3">
          <h1 className="text-white font-bold text-[3rem]">Featured</h1>
          <p className="font-medium text-[1.8rem] text-white">
            A delectable garlic bread recipe with a perfect balance of flavors.
          </p>
        </div>
        <RecipeCard />
        <div className="rounded-xl bg-gold-100 p-10 flex flex-col gap-6">
          <h1 className="text-white font-bold text-[3rem]">
            Share with AI assist
          </h1>
          <button className=" text-[1.8rem] font-bold  text-gold-200 text-center cursor-pointer [border:none] outline-none px-12 py-6 bg-white  rounded-3xs flex items-center justify-center">
            Add Recipes
          </button>
          <button className=" text-[1.8rem] font-bold  text-gold-200 text-center cursor-pointer [border:none] outline-none px-12 py-6 bg-white  rounded-3xs flex items-center justify-center">
            My recipes
          </button>
        </div>
      </section>

      <div className="w-full flex items-start justify-center my-20 flex-col">
        <h1 className="text-[3rem]">There’s more to explore</h1>
        <div className="mb-3 md:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            {/* <!--Search button--> */}
            <TERipple color="light">
              <button
                className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                type="button"
                id="button-addon1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </TERipple>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-5 w-full text-left text-[2rem] text-gold-100  gap-10">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>

      <div className="w-full flex items-center justify-center my-20">
        <button className="px-12 py-4 border-none outline-none cursor-pointer text-[1.8rem] font-bold text-white rounded-[1.5rem] bg-gradient-to-r from-darkorange to-gold-100">
          Load More
        </button>
      </div>
    </div>
    // <div className="relative bg-white w-full h-[174rem] overflow-hidden text-left text-[2rem] text-white ">
    //   <h1 className=" absolute top-[58.9rem] left-[14.8rem] text-[4.8rem] font-bold font-inherit text-black">
    //     There’s more to explore
    //   </h1>
    //

    //
    //   <div className="absolute top-[158.1rem] left-[79.3rem] rounded-xl [background:linear-gradient(90deg,_#f88d1d,_#feca04_72.5%)] w-[33.3rem] h-[7rem] flex flex-col items-center justify-start py-[1.5rem] px-[0rem] box-border text-[3.2rem]">
    //     <h2 className=" relative text-inherit font-bold font-inherit">
    //       Load More
    //     </h2>
    //   </div>
    //   <Nav />
    //   <div className="absolute top-[21.4rem] left-[14.7rem] rounded-[30px] bg-darkorange w-[78rem] h-[33.8rem] flex flex-col items-start justify-start py-[3.2rem] px-[4.8rem] box-border gap-[2.1rem] text-[4rem]">
    //     <h1 className=" relative text-inherit font-bold font-inherit">
    //       Featured
    //     </h1>
    //     <div className="relative text-[2.4rem] font-medium inline-block w-[53.3rem] h-[5.8rem] shrink-0">
    //       <p className="">
    //         A delectable garlic bread recipe with a perfect balance of flavors.
    //       </p>
    //       <p className="">&nbsp;</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
