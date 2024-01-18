import React from "react";
import { SignUp } from "@clerk/clerk-react";

const AuthSignUp: React.FC = () => {
  return (
    <main className="font-poppins min-h-[69vh]">
      <div
        className="bg-ninja-blue min-h-[287px] h-[35vh] w-full absolute right-0 z-0"
        aria-hidden
      />

      <section className="flex flex-col justify-center items-center min-h-[651px] h-[85vh]">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "font-poppins normal-case bg-[#0089e3] hover:bg-[#007dd3] text-md",
              formFieldInput: "rounded-md border-[#ebebeb]",
              footerActionLink: "text-[#007dd3] font-medium",
            },
          }}
        />

        <div className="mt-6">
          <p className="text-xs text-center text-gray-500">
            Username-based signups are no longer available. <br />
            However, you can continue to use your existing username-based
            account.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthSignUp;
