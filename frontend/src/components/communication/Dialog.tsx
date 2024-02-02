import React, { useEffect, useRef } from "react";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useDialogs } from "../../providers/dialogContext";
import { BiLoaderAlt, BiX } from "react-icons/bi";
interface DialogProps {}

const Dialog: React.FC<DialogProps> = () => {
  const dialogs = useDialogs();
  const element = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogs.display) {
      element.current!.open = false;
      return;
    }

    element.current!.open = true;
    // window.scrollTo(0, 0);
  }, [dialogs, element]);

  const close = (result: boolean | undefined = undefined) => {
    dialogs.close(result);
  };

  return (
    <dialog
      ref={element}
      className="fixed overflow-auto backdrop-blur-md bg-slate-600/30 h-full w-[100vw] right-0 top-0 z-20 border-0"
    >
      <div className="flex flex-col justify-center items-center h-full gap-3 overflow-auto">
        {dialogs.type === "loading" && (
          <div className="text-[20px] bg-white shadow-master h-32 min-w-[275px] max-w-[80vw] rounded-xl flex justify-center items-center gap-3 px-6 py-3">
            <BiLoaderAlt className="animate-spin text-[#66bd94]" />
            <p className="font-semibold text-slate-600">
              {dialogs.message.current}
            </p>
          </div>
        )}

        {dialogs.type === "auth" && (
          <div className="flex flex-col justify-center items-center h-full gap-3">
            <SignedOut>
              <SignIn
                appearance={{
                  elements: {
                    card: "font-inter",
                    formButtonPrimary:
                      "normal-case text-md bg-darkorange hover:bg-[#fcaf5d]",
                    formFieldInput: "rounded-md border-[#ebebeb]",
                    footerActionLink: "text-[#007dd3] font-medium",
                  },
                }}
              />
            </SignedOut>

            <SignedIn>
              <div className="text-ninja-blue bg-white p-5 rounded md:max-w-[50vw]">
                <p className="font-semibold">You are already signed in.</p>
                <p className="mt-1">
                  You may have signed in on another tab/window while this page
                  was open. Please close this dialog to proceed.
                </p>
                <p className="text-slate-400">
                  <small>Error Code: SignIn_Dialog_When_Authenticated</small>
                </p>
              </div>
            </SignedIn>

            <button
              onClick={() => {
                close();
              }}
              className="font-bold text-[20px] outline-none border-none p-2 flex items-center justify-center cursor-pointer rounded-full"
            >
              <BiX />
            </button>
          </div>
        )}

        {dialogs.type === "confirm" && (
          <div className="bg-white min-w-[200px] max-w-[90vw] md:max-w-[50vw] lg:[30vw] rounded-xl flex flex-col justify-center items-center gap-3 px-6 py-3">
            <div className=" font-semibold text-slate-600 flex flex-col gap-1 text-center">
              <p className="font-bold">{dialogs.title.current}</p>
              <p className="font-medium">{dialogs.message.current}</p>
            </div>

            <div className="flex gap-1 font-semibold ">
              <button
                type="button"
                onClick={() => close(true)}
                className="bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-7 py-2"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => close(false)}
                className="bg-[#0F7556] text-white font-bold rounded-lg hover:opacity-90 cursor-pointer px-7 py-2"
              >
                No
              </button>
            </div>
          </div>
        )}

        {dialogs.type === "message" && (
          <div className="bg-white min-w-[200px] max-w-[90vw] md:max-w-[50vw] lg:[30vw] rounded-xl flex flex-col justify-center items-center gap-3 px-6 py-3">
            <div className="font-semibold text-slate-600 flex flex-col gap-1 text-center">
              <p className="font-bold">{dialogs.title.current}</p>
              <p className="font-medium">{dialogs.message.current}</p>
            </div>

            <div className="flex gap-1 font-semibold ">
              <button
                type="button"
                onClick={() => {
                  close();
                }}
                className="bg-[#0F7556] text-white font-bold rounded-lg hover:opacity-90 cursor-pointer px-7 py-2"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Dialog;
