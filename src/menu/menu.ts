import { Menu, shell, BrowserWindow } from "electron"
import { databaseExporter} from "../dbManager/dbExporter";
import { newGroupHTMLPath } from "../groupManager/newGroup/newGroup";
import { deleteGroupHTMLPath } from "../groupManager/deleteGroup/deleteGroup";

export const setMainMenu = (window: BrowserWindow) => {
    const template: Array<object> = [
        {
            label: 'Horarios',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'quit' }
            ],
        },
        {
            label: 'Utilidades',
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
                {
                    label: 'Exportar base de datos',
                    click: () => { databaseExporter() }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ] 
        },
        {
            label: 'Read more',
            submenu: [
                {
                    label: 'Click to read more about Electron',
                    click:async () => {
                        await shell.openExternal('https://electronjs.org')
                    }                        
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
