import React, { useEffect } from "react";
import { useUser, SignedIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/communication/Dialog";
import Nav from "../components/navigation/Nav";
import Footer from "../components/navigation/Footer";

interface DefaultSecuredLayoutProps {
  children: React.ReactNode;
}

const DefaultSecuredLayout: React.FC<DefaultSecuredLayoutProps> = ({
  children,
}) => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate(
        `/auth/signin#/?redirect_url=${encodeURIComponent(
          window.location.href
        )}`
      );
    }
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="mx-auto container bg-white px-6 md:px-11">
      <Nav />

      <SignedIn>
        {children}
        <Dialog />
      </SignedIn>

      <Footer />
    </div>
  );
};

export default DefaultSecuredLayout;
