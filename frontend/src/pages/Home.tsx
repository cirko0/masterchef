import { FunctionComponent } from "react";
import RecipeCard from "../components/RecipeCard";
import Nav from "../components/Nav";
import { BiSearch } from "react-icons/bi";

const Home: FunctionComponent = () => {
  return (
    <div className="bg-white w-full px-[40rem]">
      <Nav />
      <section className="grid grid-cols-5 w-full text-left text-[2rem] text-gold-100 font-inter gap-20">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </section>
      <div className="w-full flex items-center justify-center my-20">
        <button className="px-24 py-6 border-none outline-none cursor-pointer text-[3rem] font-bold text-white rounded-[1.5rem] bg-gradient-to-r from-darkorange to-gold-100">
          Load More
        </button>
      </div>
    </div>
    // <div className="relative bg-white w-full h-[174rem] overflow-hidden text-left text-[2rem] text-white font-inter">
    //   <h1 className="m-0 absolute top-[58.9rem] left-[14.8rem] text-[4.8rem] font-bold font-inherit text-black">
    //     There’s more to explore
    //   </h1>
    //   <div className="pt-2 relative mx-auto text-gray-600 w-[30rem]">
    //     <input
    //       className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
    //       type="search"
    //       name="search"
    //       placeholder="Search"
    //     />
    //     <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
    //       <BiSearch />
    //     </button>
    //   </div>

    //   <section className="grid grid-cols-5 items-center justify-center w-full text-left text-[2rem] text-gold-100 font-inter px-[20rem]">
    //     <RecipeCard />
    //     <RecipeCard />
    //     <RecipeCard />
    //   </section>
    //   <section className="absolute top-[115.1rem] left-[14.8rem] w-[165.1rem] flex flex-row flex-wrap items-center justify-center gap-[4.9rem] text-left text-[2rem] text-gold-100 font-inter">
    //     <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
    //       <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
    //         Vegetarian
    //       </div>
    //       <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
    //         John Doe
    //       </div>
    //       <img
    //         className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
    //         alt=""
    //         src="/rectangle-5@2x.png"
    //       />
    //       <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
    //         <p className="m-0">Creamy Strawbery</p>
    //         <p className="m-0">Milkshake</p>
    //       </div>
    //     </div>
    //     <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
    //       <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
    //         Vegetarian
    //       </div>
    //       <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
    //         John Doe
    //       </div>
    //       <img
    //         className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
    //         alt=""
    //         src="/rectangle-5@2x.png"
    //       />
    //       <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
    //         <p className="m-0">Creamy Strawbery</p>
    //         <p className="m-0">Milkshake</p>
    //       </div>
    //     </div>
    //     <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
    //       <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
    //         Vegetarian
    //       </div>
    //       <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
    //         John Doe
    //       </div>
    //       <img
    //         className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
    //         alt=""
    //         src="/rectangle-5@2x.png"
    //       />
    //       <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
    //         <p className="m-0">Creamy Strawbery</p>
    //         <p className="m-0">Milkshake</p>
    //       </div>
    //     </div>
    //     <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
    //       <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
    //         Vegetarian
    //       </div>
    //       <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
    //         John Doe
    //       </div>
    //       <img
    //         className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
    //         alt=""
    //         src="/rectangle-5@2x.png"
    //       />
    //       <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
    //         <p className="m-0">Creamy Strawbery</p>
    //         <p className="m-0">Milkshake</p>
    //       </div>
    //     </div>
    //   </section>
    //   <div className="absolute top-[21.4rem] left-[142.3rem] rounded-xl bg-gold-100 w-[37.6rem] h-[33.8rem] text-[4rem]">
    //     <h1 className="m-0 absolute top-[3.7rem] left-[2.9rem] text-inherit font-bold font-inherit inline-block w-[30.2rem] h-[9.5rem]">{`Share with AI assist `}</h1>
    //     <button className="cursor-pointer [border:none] p-0 bg-white absolute top-[16.5rem] left-[3.3rem] rounded-3xs w-[31rem] h-[6rem] flex flex-col items-center justify-center">
    //       <b className="relative text-[2.6rem] font-inter text-gold-200 text-left">
    //         Add recipe
    //       </b>
    //     </button>
    //     <button className="cursor-pointer [border:none] p-0 bg-white absolute top-[23.8rem] left-[3.3rem] rounded-3xs w-[31rem] h-[6rem] flex flex-col items-center justify-center">
    //       <b className="relative text-[2.6rem] font-inter text-gold-200 text-left">
    //         My recipes
    //       </b>
    //     </button>
    //   </div>
    //   <div className="absolute top-[158.1rem] left-[79.3rem] rounded-xl [background:linear-gradient(90deg,_#f88d1d,_#feca04_72.5%)] w-[33.3rem] h-[7rem] flex flex-col items-center justify-start py-[1.5rem] px-[0rem] box-border text-[3.2rem]">
    //     <h2 className="m-0 relative text-inherit font-bold font-inherit">
    //       Load More
    //     </h2>
    //   </div>
    //   <Nav />
    //   <div className="absolute top-[21.4rem] left-[14.7rem] rounded-[30px] bg-darkorange w-[78rem] h-[33.8rem] flex flex-col items-start justify-start py-[3.2rem] px-[4.8rem] box-border gap-[2.1rem] text-[4rem]">
    //     <h1 className="m-0 relative text-inherit font-bold font-inherit">
    //       Featured
    //     </h1>
    //     <div className="relative text-[2.4rem] font-medium inline-block w-[53.3rem] h-[5.8rem] shrink-0">
    //       <p className="m-0">
    //         A delectable garlic bread recipe with a perfect balance of flavors.
    //       </p>
    //       <p className="m-0">&nbsp;</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
