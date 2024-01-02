import { Menu, BrowserWindow } from "electron"
import { databaseExporter} from "../dbManager/dbExporter";
import { newGroupHTMLPath } from "../groupManager/newGroup/newGroup";
import { deleteGroupHTMLPath } from "../groupManager/deleteGroup/deleteGroup";
import { newStudentHTMLPath } from "../studentManager/newStudent/newStudent";
import { deleteStudentHTMLPath } from "../studentManager/deleteStudent/deleteStudent";

export const setMainMenu = (window: BrowserWindow) => {
    const template: Array<object> = [
        {
            label: 'Configuración',
            submenu: [
                { 
                    role: 'togglefullscreen',
                    label: 'Pantalla completa' 
                },
                { type: 'separator' },
                { 
                    role: 'reload',
                    label: 'Recargar la aplicación' 
                },
                { 
                    role: 'quit',
                    label: 'Salir' 
                }
            ],
        },
        {
            label: 'Administración',
            submenu: [
                {
                    label: 'Agregar grupo',
                    click: () => {
                        window.webContents.loadFile(newGroupHTMLPath)
                    }
                },
                {
                    label: 'Eliminar grupo',
                    click: () => {
                        window.webContents.loadFile(deleteGroupHTMLPath)
                    }
                },
                { type: 'separator' },
                {
                    label: 'Agregar alumno',
                    click: () => {
                        window.webContents.loadFile(newStudentHTMLPath)
                    }
                },
                {
                    label: 'Eliminar alumno',
                    click: () => {
                        window.webContents.loadFile(deleteStudentHTMLPath)
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exportar base de datos',
                    click: () => { databaseExporter() }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
