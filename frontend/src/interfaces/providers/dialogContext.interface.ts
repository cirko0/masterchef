// Dialog

export interface Dialog {
  display: boolean;
  type: string;
  message: string;
  title: string;
  showAuth: () => void;
  showMessage: (title: string, message: string) => void;
  showLoading: (message: string) => void;
  awaitConfirmation: (title: string, message: string) => Promise<any>;
  close: (result?: boolean | undefined) => void;
}
