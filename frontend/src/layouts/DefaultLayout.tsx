import React from "react";
import Dialog from "../components/communication/Dialog";
import Nav from "../components/navigation/Nav";
import Footer from "../components/navigation/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto container bg-white md:px-11 px-6">
      <Nav />

      {children}

      <Dialog />

      <Footer />
    </div>
  );
};

export default DefaultLayout;
