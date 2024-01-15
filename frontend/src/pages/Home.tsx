import { FunctionComponent } from "react";
import RecipeCard from "../components/RecipeCard";
import Nav from "../components/Nav";

const Home: FunctionComponent = () => {
  return (
    <div className="relative bg-white w-full h-[174rem] overflow-hidden text-left text-[2rem] text-white font-inter">
      <h1 className="m-0 absolute top-[58.9rem] left-[14.8rem] text-[4.8rem] font-bold font-inherit text-black">
        There’s more to explore
      </h1>
      <div className="absolute top-[68.4rem] left-[14.8rem] rounded-3xs bg-whitesmoke w-[74.7rem] h-[3.9rem] flex flex-row items-center justify-start py-[0.7rem] pr-[1.04rem] pl-[1.6rem] box-border gap-[62.7rem] text-slategray">
        <div className="relative font-medium inline-block w-[6.8rem] h-[2.2rem] shrink-0">
          Search
        </div>
        <img
          className="relative rounded-3xs w-[2.56rem] h-[2.56rem] overflow-hidden shrink-0 object-cover"
          alt=""
          src="/frame@2x.png"
        />
      </div>
      <div className="absolute top-[21.4rem] left-[98.7rem] rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem] text-gold-100">
        <div className="absolute top-[29.3rem] left-[25.1rem] font-medium">
          Vegetarian
        </div>
        <div className="absolute top-[29.3rem] left-[2.1rem] font-medium text-darkorange">
          John Doe
        </div>
        <img
          className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
          alt=""
          src="/rectangle-5@2x.png"
        />
        <div className="absolute top-[21.1rem] left-[2.1rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
          <p className="m-0">Creamy Strawbery</p>
          <p className="m-0">Milkshake</p>
        </div>
      </div>
      <section className="absolute top-[76rem] left-[14.6rem] w-[165.3rem] flex flex-row flex-wrap items-center justify-center gap-[4.9rem] text-left text-[2rem] text-gold-100 font-inter">
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.3rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.3rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.05rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
        <RecipeCard />
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
      </section>
      <section className="absolute top-[115.1rem] left-[14.8rem] w-[165.1rem] flex flex-row flex-wrap items-center justify-center gap-[4.9rem] text-left text-[2rem] text-gold-100 font-inter">
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
        <div className="relative rounded-xl bg-white shadow-[5px_5px_20px_2px_rgba(0,_0,_0,_0.25)] w-[37.6rem] h-[33.8rem]">
          <div className="absolute top-[29.1rem] left-[25.05rem] font-medium">
            Vegetarian
          </div>
          <div className="absolute top-[29.1rem] left-[2.05rem] font-medium text-darkorange">
            John Doe
          </div>
          <img
            className="absolute top-[1.7rem] left-[2.1rem] rounded-xl w-[33.4rem] h-[18.2rem] object-cover"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <div className="absolute top-[20.9rem] left-[2.25rem] text-[2.4rem] font-medium text-black inline-block w-[33.4rem]">
            <p className="m-0">Creamy Strawbery</p>
            <p className="m-0">Milkshake</p>
          </div>
        </div>
      </section>
      <div className="absolute top-[21.4rem] left-[142.3rem] rounded-xl bg-gold-100 w-[37.6rem] h-[33.8rem] text-[4rem]">
        <h1 className="m-0 absolute top-[3.7rem] left-[2.9rem] text-inherit font-bold font-inherit inline-block w-[30.2rem] h-[9.5rem]">{`Share with AI assist `}</h1>
        <button className="cursor-pointer [border:none] p-0 bg-white absolute top-[16.5rem] left-[3.3rem] rounded-3xs w-[31rem] h-[6rem] flex flex-col items-center justify-center">
          <b className="relative text-[2.6rem] font-inter text-gold-200 text-left">
            Add recipe
          </b>
        </button>
        <button className="cursor-pointer [border:none] p-0 bg-white absolute top-[23.8rem] left-[3.3rem] rounded-3xs w-[31rem] h-[6rem] flex flex-col items-center justify-center">
          <b className="relative text-[2.6rem] font-inter text-gold-200 text-left">
            My recipes
          </b>
        </button>
      </div>
      <div className="absolute top-[158.1rem] left-[79.3rem] rounded-xl [background:linear-gradient(90deg,_#f88d1d,_#feca04_72.5%)] w-[33.3rem] h-[7rem] flex flex-col items-center justify-start py-[1.5rem] px-[0rem] box-border text-[3.2rem]">
        <h2 className="m-0 relative text-inherit font-bold font-inherit">
          Load More
        </h2>
      </div>
      <Nav />
      <div className="absolute top-[21.4rem] left-[14.7rem] rounded-[30px] bg-darkorange w-[78rem] h-[33.8rem] flex flex-col items-start justify-start py-[3.2rem] px-[4.8rem] box-border gap-[2.1rem] text-[4rem]">
        <h1 className="m-0 relative text-inherit font-bold font-inherit">
          Featured
        </h1>
        <div className="relative text-[2.4rem] font-medium inline-block w-[53.3rem] h-[5.8rem] shrink-0">
          <p className="m-0">
            A delectable garlic bread recipe with a perfect balance of flavors.
          </p>
          <p className="m-0">&nbsp;</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
