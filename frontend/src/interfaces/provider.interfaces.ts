export interface ProviderProps {
  children: React.ReactNode;
}

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
