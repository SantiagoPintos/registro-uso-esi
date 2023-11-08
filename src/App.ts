import { app, BrowserWindow } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"
import { databaseConnector, closeConnection } from "./dbManager/dbConnection";
import { createData } from "./dbManager/dbOperator";

const createWindow = async ():Promise<void> => {
    const db = databaseConnector();
    createData(db);
    closeConnection();

    const win = new BrowserWindow({
        height: 900,
        width: 1000,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));

    setMainMenu();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    })
});

app.on("window-all-closed",async () => {
    if(process.platform !== "darwin") app.quit();    
})