import { app, BrowserWindow, screen, ipcMain, IpcMainEvent } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"
import { databaseConnector, closeConnection, createDatabaseIfNotExists } from "./dbManager/dbConnection";
import { createData } from "./dbManager/dbOperator";
import { validateData } from "./dataProcessor/dataValidator";

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
    setMainMenu();

    //receive string (ci) from renderer process
    ipcMain.on("ci", (event: IpcMainEvent, ci: string) => {
        validateData(ci);
        //TODO: send the data or the error to the renderer process
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