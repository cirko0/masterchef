import React from "react";
import { SignIn } from "@clerk/clerk-react";

const AuthSignIn: React.FC = () => {
  return (
    <main className="font-inter h-full">
      <div
        className="bg-gradient-to-r from-darkorange to-gold min-h-[287px] h-[35vh] w-full absolute right-0 z-0 "
        aria-hidden
      />

      <section className="flex justify-center items-center min-h-[651px] h-[85vh]">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "normal-case bg-darkorange hover:bg-[#fcaf5d]",
              formFieldInput: "rounded-md border-whitesmoke",
              footerActionLink:
                "text-darkorange font-medium hover:text-darkorange",
            },
          }}
        />
      </section>
    </main>
  );
};

export default AuthSignIn;
