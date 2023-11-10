import { dialog} from 'electron'
import fs from 'fs'
import {databasePath} from "./dbConnection";

export function databaseExporter(){
    const dialogOptions = {
        title: 'Seleccione ubicación para exportar la base de datos',
        buttonLabel: 'Exportar',
        filters: [
            { name: 'Archivos sqlite', extensions: ['sqlite']},
        ]
    }

    dialog.showSaveDialog(dialogOptions).then((result) => {
        if(!result.canceled){
            const backupRoute: string | undefined = result.filePath;
            if(backupRoute){
                fs.copyFile(databasePath, backupRoute, (err) => {
                    err ? console.error('Error exportando la base de datos', err)
                        : console.log('Base de datos exportada correctamente', backupRoute)
                });
            } else {
                console.error('Error al obtener la ruta para exportar el archivo');
            }
        }
    }).catch((err)=>{
        console.error('Error en el cuadro de diálogo: ',err);
    })
}


