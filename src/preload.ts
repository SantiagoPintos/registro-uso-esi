import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ciTransfer', {
    sendToMain: (ci:string) => ipcRenderer.send('ci', ci),
})