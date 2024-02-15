import React, { createContext, useContext, useRef, useState, FC } from "react";
import { Dialog, ProviderProps } from "../interfaces/provider.interfaces";

const DialogContext = createContext<Dialog | undefined>(undefined);

export const useDialogs = (): Dialog => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialogs must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider: FC<ProviderProps> = ({ children }) => {
  const dialog: Dialog = {
    display: false,
    type: "",
    message: "Loading...",
    title: "MasterChef + AI",
    showAuth: () => {
      setType("auth");
      setDisplay(true);
    },

    showMessage: (title: string, message: string) => {
      setMessage(message);
      setTitle(title);

      setType("message");
      setDisplay(true);
    },

    showLoading: (message: string) => {
      console.log(message);
      setMessage(message);

      setType("loading");
      setDisplay(true);
    },

    awaitConfirmation: (title: string, message: string): Promise<any> => {
      return new Promise((resolve) => {
        pendingResolution.current = resolve;

        setMessage(message);
        setTitle(title);

        setType("confirm");
        setDisplay(true);
      });
    },

    close: (result: boolean | undefined = undefined) => {
      setType("none");
      setDisplay(false);

      if (result !== undefined && pendingResolution.current !== undefined) {
        pendingResolution.current(result);
        pendingResolution.current = undefined;
      }
    },
  };

  // Dialog

  let setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  let setType: React.Dispatch<React.SetStateAction<string>>;
  let setMessage: React.Dispatch<React.SetStateAction<string>>;
  let setTitle: React.Dispatch<React.SetStateAction<string>>;

  [dialog.display, setDisplay] = useState<boolean>(false);
  [dialog.type, setType] = useState<string>("");
  [dialog.message, setMessage] = useState<string>("Loading...");
  [dialog.title, setTitle] = useState<string>("MasterChef + AI");

  const pendingResolution = useRef<Function | undefined>(undefined);

  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
};
