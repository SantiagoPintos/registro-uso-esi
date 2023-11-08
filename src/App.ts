import { app, BrowserWindow } from "electron";
import path from "path";
import { setMainMenu } from "./menu/menu"
import  sqlite3  from "sqlite3";

const isDev:boolean = true;
let db;
const createWindow = async ():Promise<void> => {
    db = new sqlite3.Database('./database/database.db', (err: Error|null) =>{
        if (err)
            console.error(err)

        console.log('Conexion exitosa a la base de datos');
    });

    const createQuery = "CREATE TABLE alumnos (ci INTEGER PRIMARY KEY, nombre TEXT, grupo TEXT)";
    db.run(createQuery, [], function(this: any, err: Error) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Filas actualizadas: ${this.changes}`);
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conexión a la base de datos cerrada');
  });

    const win = new BrowserWindow({
        height: 900,
        width: 1000,
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