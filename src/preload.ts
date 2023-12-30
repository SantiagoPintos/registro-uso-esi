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
        ipcRenderer.send("returnToMain");
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
    },
    getStudentFromCi: async(ci: string): Promise<Alumno> =>{
        try{
            return await ipcRenderer.invoke("getStudentFromCi", ci); 
        } catch(e:any) {
            console.error(e.message);
            throw new Error(e.message);
        }
    },
    deleteStudentFromDatabase: async (ci: string): Promise<string|undefined> => {
        try{
            return await ipcRenderer.invoke("deleteStudent", ci);
        }catch(e:any) {
            console.error(e.message);
            return e.message;
        }
    },
    //error msg from main process
    onGetStudentFromCiError: (callback: (arg: any) => void) => ipcRenderer.on('getStudentFromCiError', (_event, value) => callback(value)),
});
