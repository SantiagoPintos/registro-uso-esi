export {};

declare global {
    interface Window {
      ciTransfer: ciTransfer;
    }

    interface ciTransfer {
        sendToMain: (ci: string) => string;
    }
  }