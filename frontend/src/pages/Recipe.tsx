import { FunctionComponent } from "react";
import Nav from "../components/Nav";

const Recipe: FunctionComponent = () => {
  return (
    <div className="bg-white w-full px-[20rem]">
      <Nav />

      <section className="absolute top-[19.6rem] left-[0rem] w-[192rem] h-[41.5rem] text-left text-[2rem] text-white font-inter">
        <div className="absolute top-[0rem] left-[0rem] [background:linear-gradient(90deg,_#f88d1d,_#feca04_73.73%)] w-[192rem] h-[37.3rem]" />
        <i className="absolute top-[19.3rem] left-[10.3rem] font-medium">
          By John Doe
        </i>
        <h1 className="m-0 absolute top-[14.7rem] left-[10.3rem] text-[3.2rem] font-bold font-inherit">
          Creamy Strawbery Milkshake
        </h1>
        <div className="absolute top-[34.4rem] left-[10.3rem] rounded-3xs bg-white shadow-[5px_4px_10px_2px_rgba(0,_0,_0,_0.25)] w-[10.5rem] h-[3.6rem] flex flex-row items-center justify-start py-[1rem] px-[0.9rem] box-border gap-[0.7rem] text-[1.6rem] text-black">
          <img
            className="relative w-[1.7rem] h-[1.7rem] overflow-hidden shrink-0 object-cover"
            alt=""
            src="/frame@2x.png"
          />
          <div className="relative font-medium inline-block w-[6.1rem] h-[1.5rem] shrink-0">
            10 Mins
          </div>
        </div>
        <button className="cursor-pointer [border:none] py-[1rem] px-[0rem] bg-white absolute top-[34.4rem] left-[22.4rem] rounded-3xs shadow-[5px_4px_10px_2px_rgba(0,_0,_0,_0.25)] w-[10.5rem] h-[3.6rem] flex flex-col items-center justify-start box-border">
          <div className="relative text-[1.6rem] font-medium font-inter text-black text-left inline-block w-[8.3rem] h-[1.5rem] shrink-0">
            Vegetarian
          </div>
        </button>
        <img
          className="absolute top-[6.7rem] left-[102.2rem] rounded-xl w-[73.2rem] h-[34.8rem] object-cover"
          alt=""
          src="/image@2x.png"
        />
      </section>
      <section className="absolute top-[62.6rem] left-[10.3rem] w-[154.8rem] h-[10.6rem] flex flex-col items-start justify-start gap-[1.9rem] text-left text-[3.2rem] text-black font-inter">
        <h1 className="m-0 relative text-inherit font-bold font-inherit">
          Introduction
        </h1>
        <div className="relative text-[2rem] font-medium inline-block w-[154.8rem]">
          Indulge in a refreshing Energising Iced Coffee by Dhruv Malik. This
          invigorating beverage combines the bold flavors Of instant coffee with
          the creamy richness Of milk. resulting in a delightful pick—me—up.
        </div>
      </section>
      <section className="absolute top-[76.9rem] left-[10.3rem] w-[165.1rem] h-[29.9rem] text-left text-[1.6rem] text-black font-inter">
        <i className="absolute top-[28rem] left-[0rem] font-medium text-slategray">
          Disclaimer: AI Insights are experimental and may, at times, contain
          inaccurate or controversial information.
        </i>
        <h1 className="m-0 absolute top-[0rem] left-[0rem] text-[3.2rem] font-bold font-inherit inline-block w-[21.6rem]">
          Good to know
        </h1>
        <div className="absolute top-[6.3rem] left-[0rem] w-[165.1rem] h-[18rem] flex flex-row items-center justify-center py-[0rem] px-[0.1rem] box-border gap-[4rem] text-[1.4rem]">
          <div className="rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[80.6rem] h-[18rem] flex flex-row items-start justify-start py-[1.6rem] px-[3.4rem] box-border gap-[1.1rem]">
            <div className="rounded-8xs bg-gainsboro w-[11.2rem] h-[2.6rem] flex flex-row items-center justify-start py-[0rem] pr-[0.6rem] pl-[0.8rem] box-border gap-[1rem]">
              <img
                className="relative w-[1.7rem] h-[1.7rem] overflow-hidden shrink-0 object-cover"
                alt=""
                src="/frame@2x.png"
              />
              <div className="relative font-medium inline-block w-[7.1rem] h-[1.8rem] shrink-0">
                AI Insights
              </div>
            </div>
            <div className="rounded-8xs bg-gainsboro w-[11.2rem] h-[2.6rem] flex flex-row items-center justify-start py-[0rem] pr-[0.6rem] pl-[0.8rem] box-border gap-[1rem]">
              <img
                className="relative w-[1.7rem] h-[1.7rem] overflow-hidden shrink-0 object-cover"
                alt=""
                src="/frame@2x.png"
              />
              <div className="relative font-medium inline-block w-[7.1rem] h-[1.8rem] shrink-0">
                AI Insights
              </div>
            </div>
          </div>
          <div className="relative rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[80.3rem] h-[18rem]" />
        </div>
      </section>
      <div className="absolute top-[110.5rem] left-[10.3rem] w-[79.2rem] h-[33.3rem] flex flex-col items-start justify-start gap-[2.2rem]">
        <h1 className="m-0 relative text-[3.2rem] font-bold font-inherit">
          What you’ll need
        </h1>
        <div className="w-[17.5rem] h-[12.5rem] flex flex-col items-start justify-start gap-[3.9rem]">
          <h3 className="m-0 relative text-inherit font-medium font-inherit">
            Dairy
          </h3>
          <button className="cursor-pointer py-[0rem] px-[5.1rem] bg-white rounded-3xs shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] box-border w-[17.1rem] h-[5.7rem] flex flex-col items-end justify-center border-[1px] border-dashed border-slategray">
            <div className="relative text-[1.6rem] font-medium font-inter text-black text-left">
              cold milk
            </div>
          </button>
        </div>
        <div className="relative w-[79.1rem] h-[12.5rem]">
          <h3 className="m-0 absolute top-[0rem] left-[0rem] text-inherit font-medium font-inherit">{`Spices, condiments, nuts & everything else`}</h3>
          <button className="cursor-pointer py-[0rem] px-[1.2rem] bg-white absolute top-[6.8rem] left-[0.4rem] rounded-3xs shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] box-border w-[19.3rem] h-[5.7rem] flex flex-col items-end justify-center border-[1px] border-dashed border-slategray">
            <div className="relative text-[1.6rem] font-medium font-inter text-black text-left inline-block w-[16.8rem]">
              instant coffe granules
            </div>
          </button>
          <button className="cursor-pointer py-[0rem] px-[6.3rem] bg-white absolute top-[6.8rem] left-[22.2rem] rounded-3xs shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] box-border w-[17.1rem] h-[5.7rem] flex flex-col items-end justify-center border-[1px] border-dashed border-slategray">
            <div className="relative text-[1.6rem] font-medium font-inter text-black text-left">
              sugar
            </div>
          </button>
          <button className="cursor-pointer p-0 bg-white absolute top-[6.8rem] left-[42.1rem] rounded-3xs shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] box-border w-[17.1rem] h-[5.7rem] flex flex-col items-center justify-center border-[1px] border-dashed border-slategray">
            <div className="relative text-[1.6rem] font-medium font-inter text-black text-left">
              ice
            </div>
          </button>
          <button className="cursor-pointer py-[0rem] px-[5.1rem] bg-white absolute top-[6.8rem] left-[62rem] rounded-3xs shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] box-border w-[17.1rem] h-[5.7rem] flex flex-col items-end justify-center border-[1px] border-dashed border-slategray">
            <div className="relative text-[1.6rem] font-medium font-inter text-black text-left">
              cold milk
            </div>
          </button>
        </div>
      </div>
      <section className="absolute top-[147.5rem] left-[10.3rem] w-[165.1rem] h-[35rem] flex flex-col items-start justify-start gap-[2.5rem] text-left text-[3.2rem] text-black font-inter">
        <h1 className="m-0 relative text-inherit font-bold font-inherit">
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
      </section>
    </div>
  );
};

export default Recipe;
