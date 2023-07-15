import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import path from "path";

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

    if (isDev) {
        win.webContents.openDevTools();
    }

    ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
    })
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