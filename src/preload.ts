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

contextBridge.exposeInMainWorld('groupManager', {
    getAllGroups: async (): Promise<string[]|undefined> => {
        try{
            return await ipcRenderer.invoke("getAllGroups");
        }
        catch(e:any){
            console.error(e.message);
            return e.message;
        }
    },
    sendGroupToMain: async (name: string): Promise<string|undefined> => {
        try{
            return await ipcRenderer.invoke("createGroup", name);
        }
        catch(e:any){
            console.error(e.message);
            return e.message;
        }
    },
    returnToMain: (): void => {
        ipcRenderer.invoke("returnToMain");
    },
    deleteGroup: async (name: string): Promise<string|undefined> =>{
        try{
            return await ipcRenderer.invoke("deleteGroup", name);
        }
        catch(e:any){
            console.error(e.message);
            return e.message;
        }
    }
});

contextBridge.exposeInMainWorld('studentManager', {
    sendStudentToMain: async (data: {name: string, ap: string, ci: string}): Promise<string|undefined> => {
        try{
            return await ipcRenderer.invoke("createStudent", data);
        }catch(e:any){
            console.error(e.message);
            return e.message;
        }
    }
});
