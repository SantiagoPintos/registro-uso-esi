import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('ciTransfer', {
    sendToMain: async (ci: string): Promise<string|undefined> => {
        try{
            return await ipcRenderer.invoke("ci", ci);
        }
        catch (e:any) {
            console.error(e.message);
            return e.message;
        }
    }
})