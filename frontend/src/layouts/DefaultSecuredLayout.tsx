import React, { useEffect } from "react";
import { useUser, SignedIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/communication/Dialog";
import Nav from "../components/navigation/Nav";

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
    <div className="bg-white mt-20 w-full px-[20rem]">
      <Nav />

      <SignedIn>{children}</SignedIn>

      <Dialog />
    </div>
  );
};

export default DefaultSecuredLayout;
