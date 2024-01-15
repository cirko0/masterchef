import { FunctionComponent } from "react";

const Nav: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between text-left my-20 px-[20rem]">
      <img className="object-contain h-[8rem]" alt="" src="/logo.png" />
      <div className="w-[7rem] h-[7rem] rounded-[50%] bg-gold-100 flex items-center justify-center cursor-pointer">
        <p className="text-[2.5rem] text-white font-bold">JD</p>
      </div>
    </header>
  );
};

export default Nav;
