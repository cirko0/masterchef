import React, { createContext, useContext, useRef, useState, FC } from "react";

export interface Dialog {
  display: boolean;
  type: string;
  message: React.MutableRefObject<string>;
  title: React.MutableRefObject<string>;
  showAuth: () => void;
  showMessage: (title: string, message: string) => void;
  showLoading: (message: string) => void;
  awaitConfirmation: (title: string, message: string) => Promise<any>;
  close: (result?: any) => void;
}

const DialogContext = createContext<Dialog | undefined>(undefined);

export const useDialogs = (): Dialog => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogs must be used within a DialogProvider");
  }
  return context;
};

interface DialogProviderProps {
  children: React.ReactNode;
}

export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const dialog: Dialog = {} as Dialog;

  let setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  let setType: React.Dispatch<React.SetStateAction<string>>;

  [dialog.display, setDisplay] = useState<boolean>(false);
  [dialog.type, setType] = useState<string>("");

  dialog.message = useRef<string>("Loading...");
  dialog.title = useRef<string>("MasterChef + AI");

  const pendingResolution = useRef<Function | undefined>(undefined);

  dialog.showAuth = () => {
    setType("auth");
    setDisplay(true);
  };

  dialog.showMessage = (title: string, message: string) => {
    dialog.message.current = message;
    dialog.title.current = title;

    setType("message");
    setDisplay(true);
  };

  dialog.showLoading = (message: string) => {
    dialog.message.current = message;

    setType("loading");
    setDisplay(true);
  };

  dialog.awaitConfirmation = (title: string, message: string): Promise<any> => {
    return new Promise((resolve) => {
      pendingResolution.current = resolve;

      dialog.message.current = message;
      dialog.title.current = title;

      setType("confirm");
      setDisplay(true);
    });
  };

  dialog.close = (result: any = undefined) => {
    setType("none");
    setDisplay(false);

    if (result !== undefined && pendingResolution.current !== undefined) {
      pendingResolution.current(result);
      pendingResolution.current = undefined;
    }
  };

  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  );
};
