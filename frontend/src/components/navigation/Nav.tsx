import { FunctionComponent } from "react";

import logo from "../../assets/logo.png";
import { UserButton } from "@clerk/clerk-react";

const Nav: FunctionComponent = () => {
  return (
    <header className="flex items-center justify-between text-left mb-10">
      <a href="/" className="no-underline">
        <img className="object-contain h-[80px]" alt="" src={logo} />
      </a>
      <div className="cursor-pointer text-[4s0px]">
        <UserButton />
      </div>
    </header>
  );
};

export default Nav;
