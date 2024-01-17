import { FunctionComponent } from "react";
import Nav from "../components/navigation/Nav";
import {
  BiPlusMedical,
  BiSolidMagicWand,
  BiSolidTimeFive,
} from "react-icons/bi";

const Recipe: FunctionComponent = () => {
  return (
    <div className="bg-white w-full">
      <Nav />

      <section className="relative w-full text-[2rem] text-white font-inter px-[20rem] z-20 grid grid-cols-2 gap-10 items-center mb-16">
        <div className="absolute w-full left-0 top-0 z-0 bg-gradient-to-r from-darkorange to-gold-100 h-[40rem]" />
        <div className="flex flex-col h-full justify-end gap-[15rem] py-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-[3.2rem] font-bold relative ">
              Creamy Strawbery Milkshake
            </h1>
            <i className="font-medium relative">By John Doe</i>
          </div>
          <div className="relative flex items-center justify-start gap-5">
            <div className="rounded-3xs flex gap-2 items-center justify-center bg-white shadow-[5px_4px_10px_2px_rgba(0,_0,_0,_0.25)] p-[1rem]">
              <BiSolidTimeFive className="text-black text-[2rem]" />
              <p className="text-[1.8rem] font-medium text-black">10 Mins</p>
            </div>
            <div className=" rounded-3xs  flex items-center justify-center bg-white shadow-[5px_4px_10px_2px_rgba(0,_0,_0,_0.25)] p-[1rem]">
              <p className="text-[1.8rem] font-medium text-black">Vegetarian</p>
            </div>
          </div>
        </div>

        <img
          className="relative rounded-xl h-[35rem] justify-self-end object-cover mt-32"
          alt=""
          src="/thumb.png"
        />
      </section>
      <section className="flex flex-col justify-start gap-8 mx-[20rem] mb-10">
        <h1 className="font-bold text-[3rem] text-black">Introduction</h1>
        <div className="text-[1.8rem] font-medium text-black">
          Indulge in a refreshing Energising Iced Coffee by Dhruv Malik. This
          invigorating beverage combines the bold flavors Of instant coffee with
          the creamy richness Of milk. resulting in a delightful pick—me—up.
        </div>
      </section>

      <section className="mx-[20rem] flex flex-col gap-10 mb-10">
        <h1 className="text-[3rem] font-bold text-black">Good to know</h1>

        <div className="grid gap-[4rem] grid-cols-2 ">
          <div className="rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] flex gap-[1.1rem] p-8">
            <div className="rounded-8xs bg-gainsboro flex items-center py-[0.5rem] px-[1rem] gap-[1rem]">
              <BiSolidMagicWand className="text-[2rem]" />
              <p className="font-medium text-[1.6rem]">AI Insights</p>
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] flex gap-[1.1rem] p-8">
            <div className="rounded-8xs bg-gainsboro flex items-center py-[0.5rem] px-[1rem] gap-[1rem]">
              <BiPlusMedical className="text-[2rem]" />
              <p className="font-medium text-[1.6rem]">Health</p>
            </div>
          </div>
        </div>
        <i className=" text-[1.6rem] font-medium text-slategray">
          Disclaimer: AI Insights are experimental and may, at times, contain
          inaccurate or controversial information.
        </i>
      </section>

      <section className="mx-[20rem] flex flex-col gap-[2rem] mb-10">
        <h1 className="text-[3rem] font-bold">What you’ll need</h1>
        <div className="flex flex-col items-start gap-[2rem]">
          <h3 className="font-medium text-[2rem]">Dairy</h3>
          <p className="px-16 py-8 bg-white text-[1.6rem] rounded-3xs border-[1px] font-medium font-inter text-black text-left shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-slategray border-dashed">
            cold milk
          </p>
        </div>
        <div className="flex flex-col items-start gap-[2rem]">
          <h3 className="font-medium text-[2rem]">
            Spices, condiments, nuts & everything else
          </h3>
          <div className="flex items-start gap-[2rem]">
            <p className="px-16 py-8 bg-white text-[1.6rem] rounded-3xs border-[1px] font-medium font-inter text-black text-left shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-slategray border-dashed">
              instant coffe granules
            </p>
            <p className="px-16 py-8 bg-white text-[1.6rem] rounded-3xs border-[1px] font-medium font-inter text-black text-left shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-slategray border-dashed">
              sugar
            </p>
            <p className="px-16 py-8 bg-white text-[1.6rem] rounded-3xs border-[1px] font-medium font-inter text-black text-left shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-slategray border-dashed">
              ice
            </p>
            <p className="px-16 py-8 bg-white text-[1.6rem] rounded-3xs border-[1px] font-medium font-inter text-black text-left shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] border-slategray border-dashed">
              cold milk
            </p>
          </div>
        </div>
      </section>

      <section className="mx-[20rem] flex flex-col gap-[2.5rem]">
        <h1 className="text-[3rem] font-bold text-black">Steps</h1>
        <div className="flex flex-col items-center justify-start">
          <div className="rounded-t-xl rounded-b-none bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-full pb-10 p-5 flex flex-col -m-5">
            <div className="text-[1.4rem] text-darkorange font-medium">
              You’ll need to get hold of
            </div>
            <div className="text-[1.4rem] font-medium text-black">
              Instant Coffe Granules, Sugar & Warm Water
            </div>
          </div>

          <div className="rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-full p-5 flex gap-10 items-center">
            <div className="rounded-[50%] bg-darkorange shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.25)] w-[6rem] h-[6rem] flex items-center justify-center">
              <p className="text-[3.2rem] font-medium text-white">1</p>
            </div>
            <div className="font-medium text-[1.6rem]">
              Combine 3 tablespoons warm water, 2 teaspoons instant coffe
              granules, and 1 teaspon sugar in a sealable jar
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-full p-5 flex gap-10 items-center">
          <div className="rounded-[50%] bg-darkorange shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.25)] w-[6rem] h-[6rem] flex items-center justify-center">
            <p className="text-[3.2rem] font-medium text-white">2</p>
          </div>
          <div className="font-medium text-[1.6rem]">
            Seal and shake until foamy.
          </div>
        </div>
      </section>

      {/* 
     
      
      <section className=" top-[147.5rem] left-[10.3rem] w-[165.1rem] h-[35rem] flex flex-col items-start justify-start gap-[2.5rem] text-left text-[3.2rem] text-black font-inter">
        <h1 className="m-0 text-inherit font-bold font-inherit">
          Steps
        </h1>
        <div className="w-[165.1rem] h-[16rem] flex flex-col items-center justify-start text-[1.4rem] text-darkorange">
          <div className="rounded-t-xl rounded-b-none bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[165.1rem] h-[8rem] flex flex-col items-start justify-start py-[1.1rem] px-[3.3rem] box-border gap-[0.3rem]">
            <div className="relative font-medium">
              You’ll need to get hold of
            </div>
            <div className="relative font-medium text-black">{`Instant Coffe Granules, Sugar & Warm Water`}</div>
          </div>
          <div className="relative rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[165.1rem] h-[10.1rem] mt-[-2.1rem] text-[1.6rem] text-black">
            <div className="absolute top-[4.1rem] left-[11.3rem] font-medium">
              Combine 3 tablespoons warm water, 2 teaspoons instant coffe
              granules, and 1 teaspon sugar in a sealable jar
            </div>
            <div className="absolute top-[2.1rem] left-[3.3rem] rounded-[50%] bg-darkorange shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.25)] w-[5.8rem] h-[5.8rem]" />
            <div className="absolute top-[3.2rem] left-[5.4rem] text-[3.2rem] font-medium text-white inline-block w-[1.6rem] h-[3.5rem]">
              1
            </div>
          </div>
        </div>
        <div className="relative rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[165.1rem] h-[10.1rem] text-[1.6rem]">
          <div className="absolute top-[4rem] left-[11.3rem] font-medium">
            Seal and shake until foamy.
          </div>
          <div className="absolute top-[2.1rem] left-[3.3rem] rounded-[50%] bg-darkorange shadow-[0px_0px_5px_1px_rgba(0,_0,_0,_0.25)] w-[5.8rem] h-[5.8rem]" />
          <div className="absolute top-[3.1rem] left-[5.1rem] text-[3.2rem] font-medium text-white inline-block w-[2.1rem] h-[3.8rem]">
            2
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Recipe;
