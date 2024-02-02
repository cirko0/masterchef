import { FunctionComponent } from "react";

import logo from "../../assets/logo.png";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Nav: FunctionComponent = () => {
  return (
    <header className="flex items-center md:justify-between flex-col md:flex-row h-28 md:h-24 my-10">
      <Link to="/" className="no-underline">
        <img className="w-auto h-[80px]" alt="MasterChef Logo" src={logo} />
      </Link>
      <section className="cursor-pointer">
        <UserButton></UserButton>
      </section>
    </header>
  );
};

export default Nav;
