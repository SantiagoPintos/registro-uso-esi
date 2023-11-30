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
});

contextBridge.exposeInMainWorld('createGroup', {
    sendGroupToMain: async (name: string): Promise<string|undefined> => {
        try{
            return await ipcRenderer.invoke("createGroup", name);
        }
        catch(e:any){
            console.error(e.message);
            return e.message;
        }
    }
});
