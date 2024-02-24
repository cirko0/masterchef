import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="h-28 md:h-24 flex items-center justify-center flex-col gap-2 md:justify-start md:flex-row my-6">
      <Link to="#">
        <img
          className="h-12 w-auto grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all ease-in-out duration-500"
          src={logo}
          alt="MasterChef Logo"
        />
      </Link>
      <span
        className="h-6 w-0.5 bg-gray-400 hidden md:block"
        aria-hidden="true"
      ></span>
      <p className="text-xs font-medium text-gray-600 text-center md:text-left">
        <span className="font-semibold">
          © {new Date().getFullYear()} Ivan Ćirković. All Rights Reserved.{" "}
          <br />
        </span>
        Built with React, Node, Clerk, MongoDB & OpenAI SDK
        <br />
      </p>
    </footer>
  );
};

export default Footer;
