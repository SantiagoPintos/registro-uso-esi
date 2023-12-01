import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"
import { databaseConnector, closeConnection, createDatabaseIfNotExists } from "./dbManager/dbConnection";
import { createData } from "./dbManager/dbOperator";
import { validateData } from "./dataProcessor/dataValidator";
import { createGroup } from "./groupManager/newGroup/newGroup";

const createWindow = async ():Promise<void> => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const db = databaseConnector();
    createData(db);
    closeConnection();

    const win = new BrowserWindow({
        height: height,
        width: width,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));
    win.webContents.openDevTools();
    setMainMenu(win);

    //receive string (ci) from renderer process
    ipcMain.handle("ci", async (_event:Electron.IpcMainInvokeEvent, ci: string): Promise<string|undefined> => {
        try{
            await validateData(ci);
            return ci;
        } catch (e:any) {
            console.error(e.message);
            return e.message;
        }
    })


    ipcMain.handle("createGroup", async (_event: Electron.IpcMainInvokeEvent, name: string): Promise<string|undefined> => {
        try{
            await createGroup(name);
            return name;
        }
        catch(e:any){
            console.error(e.message);
            return e.message;
        }
    })
};

app.whenReady().then(() => {
    createDatabaseIfNotExists();
    createWindow();

    app.on("activate", () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on("window-all-closed",async () => {
    if(process.platform !== "darwin") app.quit();    
})