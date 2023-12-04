export {};

declare global {
    interface Window {
      ciTransfer: ciTransfer;
      groupManager: groupManager;
    }

    interface ciTransfer {
        sendToMain: (ci: string) => string;
    }
    interface sendGroupToMain{
        sendGroupToMain: (name: string) => string;
    }
  }