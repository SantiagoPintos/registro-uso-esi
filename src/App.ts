import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"
import { databaseConnector, closeConnection, createDatabaseIfNotExists} from "./dbManager/dbConnection";
import { createData, getAllGroups  } from "./dbManager/dbOperator";
import { validateData } from "./dataProcessor/dataValidator";
import { createGroup } from "./groupManager/newGroup/newGroup";
import { deleteGroup } from "./groupManager/deleteGroup/deleteGroup";
import { addAlumno, convertToAlumno } from "./studentManager/newStudent/newStudent";

export const debug: boolean = app.isPackaged ? false : true;

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
    if(debug) win.webContents.openDevTools()
    setMainMenu(win);

    //receive string (ci) from renderer process
    ipcMain.handle("ci", async (_event:Electron.IpcMainInvokeEvent, ci: string): Promise<string|undefined> => {
        try{
            validateData(ci);
            return ci;
        } catch (e:any) {
            if(debug) console.error(e.message);
            return e.message;
        }
    })


    ipcMain.handle("createGroup", async (_event: Electron.IpcMainInvokeEvent, name: string): Promise<string|undefined> => {
        try{
            await createGroup(name);
            return name;
        }
        catch(e:any){
            if(debug) console.error(e.message);
            return e.message;
        }
    })

    ipcMain.handle("deleteGroup", async (_event: Electron.IpcMainInvokeEvent, name: string): Promise<string|undefined> => {
        try{
            await deleteGroup(name);
            return name;
        }
        catch(e:any){
            if(debug) console.error(e.message);
            return e.message;
        }
    })

    ipcMain.handle("getAllGroups", async (): Promise<string[]|undefined> => {
        try{
            const db = databaseConnector();
            const groups = await getAllGroups(db);
            closeConnection();
            return groups;
        }
        catch(e:any){
            if(debug) console.error(e.message);
            return e.message;
        }
    })

    ipcMain.on("returnToMain", () => {
        win.loadFile(path.join(__dirname, "index.html"));
    })

    ipcMain.handle("createStudent", async (_event: Electron.IpcMainInvokeEvent, data: {name: string, ap: string, ci: string, group: string}): Promise<string|undefined> => {
        const alumno = convertToAlumno(data);
        try{
            await addAlumno(alumno);
            return `Alumno ${alumno.nombre} ${alumno.apellido} agregado con éxito`;
        } catch (e:any) {
            if(debug) console.error(e.message);
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