export {};

declare global {
    interface Window {
      ciTransfer: ciTransfer;
      createGroup: createGroup;
    }

    interface ciTransfer {
        sendToMain: (ci: string) => string;
    }
    interface sendGroupToMain{
        sendGroupToMain: (name: string) => string;
    }
  }