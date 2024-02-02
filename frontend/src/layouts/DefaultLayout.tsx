import React, { ReactNode } from "react";
import Dialog from "../components/communication/Dialog";
import Nav from "../components/navigation/Nav";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto container bg-white px-11">
      <Nav />

      {children}

      <Dialog />
    </div>
  );
};

export default DefaultLayout;
