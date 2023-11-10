import { Menu, shell } from "electron"
import { databaseExporter} from "../dbManager/dbExporter";
import {databasePath} from "../dbManager/dbConnection";

export const setMainMenu = () => {
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
