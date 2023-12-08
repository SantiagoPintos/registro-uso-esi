export {};

declare global {
    interface Window {
      ciTransfer: ciTransfer;
      groupManager: groupManager;
      studentManager: studentManager;
    }

    interface ciTransfer {
        sendToMain: (ci: string) => string;
    }
    interface sendGroupToMain{
        sendGroupToMain: (name: string) => string;
    }

    interface studentManager{
        sendStudentToMain: (data: {name: string, ap: string, ci: string}) => string;
    }
  }