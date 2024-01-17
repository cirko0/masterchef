import { FunctionComponent } from "react";

import logo from "../../assets/logo.png";

const Nav: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between text-left my-20 px-[20rem]">
      <a href="/" className="no-underline">
        <img className="object-contain h-[8rem]" alt="" src={logo} />
      </a>
      <div className="w-[5rem] h-[5rem] rounded-[50%] bg-gold-100 flex items-center justify-center cursor-pointer">
        <p className="text-[2rem] text-white font-bold">JD</p>
      </div>
    </header>
  );
};

export default Nav;
