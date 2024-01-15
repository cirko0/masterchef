import { FunctionComponent } from "react";

const Nav: FunctionComponent = () => {
  return (
    <header className="absolute top-[1.4rem] left-[6.6rem] w-[177.7rem] h-[16.3rem] flex flex-row items-center justify-start gap-[152.5rem] text-left text-[3.2rem] text-white font-inter">
      <img
        className="relative w-[16.3rem] h-[16.3rem] object-cover"
        alt=""
        src="/logo@2x.png"
      />
      <div className="relative w-[8.9rem] h-[8.9rem]">
        <div className="absolute top-[0rem] left-[0rem] rounded-[50%] bg-gold-100 w-[8.9rem] h-[8.9rem]" />
        <h2 className="m-0 absolute top-[2.8rem] left-[2.4rem] text-inherit font-bold font-inherit inline-block w-[4.2rem] h-[3.2rem]">
          JD
        </h2>
      </div>
    </header>
  );
};

export default Nav;
