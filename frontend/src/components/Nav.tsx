import { FunctionComponent } from "react";

const Nav: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between text-left my-20">
      <img className="object-contain h-[10rem]" alt="" src="/logo.png" />
      <div className="w-[9rem] h-[9rem] rounded-[50%] bg-gold-100 flex items-center justify-center">
        <p className="text-[3.2rem] text-white font-inter font-bold">JD</p>
      </div>
    </header>
  );
};

export default Nav;
