import React from "react";
import { SignIn } from "@clerk/clerk-react";

const AuthSignIn: React.FC = () => {
  return (
    <main className="font-inter h-full">
      <div
        className="bg-gradient-to-r from-darkorange to-gold-100 min-h-[287px] h-[35vh] w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex justify-center items-center h-full pt-10">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "normal-case text-md bg-darkorange hover:bg-[#fcaf5d]",
              formFieldInput: "rounded-md border-[#ebebeb]",
              footerActionLink: "text-[#007dd3] font-medium",
            },
          }}
        />
      </section>
    </main>
  );
};

export default AuthSignIn;
