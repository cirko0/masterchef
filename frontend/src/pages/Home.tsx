import { FunctionComponent } from "react";
import RecipeCard from "../components/RecipeCard";
import Nav from "../components/Nav";
import { BiSearch } from "react-icons/bi";

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
        <div className="md:w-[50rem] mt-10">
          <div className="flex w-full flex-wrap items-stretch gap-5">
            <input
              type="search"
              className="m-0 w-[1px] min-w-0 flex-auto rounded-[1rem] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-6 py-[0.25rem] text-[1.8rem] font-medium text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-darkorange focus:text-neutral-700  focus:outline-none dark:border-darkorange dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-darkorange"
              placeholder="Search"
              aria-label="Search"
            />

            <button
              className="flex bg-darkorange items-center justify-center text-white p-5 text-[2rem] rounded-[1rem] outline-none border-none cursor-pointer"
              type="button"
            >
              <BiSearch />
            </button>
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
