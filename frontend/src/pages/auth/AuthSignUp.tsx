import React from "react";
import { SignUp } from "@clerk/clerk-react";

const AuthSignUp: React.FC = () => {
  return (
    <main className="h-full">
      <div
        className="bg-gradient-to-r from-darkorange to-gold-100 min-h-[287px] h-[35vh] w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex flex-col justify-center items-center pt-5">
        <SignUp
          appearance={{
            layout: {
              showOptionalFields: false,
            },
            elements: {
              formButtonPrimary:
                "normal-case text-md bg-darkorange hover:bg-[#fcaf5d]",
              formFieldInput: "rounded-md border-[#ebebeb]",
              footerActionLink:
                "text-darkorange font-medium hover:text-darkorange",
            },
          }}
        />

        {/* <div className="mt-6">
          <p className="text-xs text-center text-gray-500">
            Username-based signups are no longer available. <br />
            However, you can continue to use your existing username-based
            account.
          </p>
        </div> */}
      </section>
    </main>
  );
};

export default AuthSignUp;
