import { app, BrowserWindow } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"

const isDev:boolean = true;
const createWindow = async ():Promise<void> => {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));

    setMainMenu();

    if (isDev) {
        win.webContents.openDevTools();
    }
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