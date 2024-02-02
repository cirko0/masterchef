import React from "react";
import { SignUp } from "@clerk/clerk-react";

const AuthSignUp: React.FC = () => {
  return (
    <main className="min-h-[69vh]">
      <div
        className="bg-gradient-to-r from-darkorange to-gold-100 min-h-[287px] h-[35vh] w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex justify-center items-center min-h-[651px] h-[85vh] text-md text-base">
        <SignUp
          appearance={{
            layout: {
              showOptionalFields: false,
            },
            elements: {
              formButtonPrimary:
                "normal-case  bg-darkorange hover:bg-[#fcaf5d]",
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

export default AuthSignUp;
