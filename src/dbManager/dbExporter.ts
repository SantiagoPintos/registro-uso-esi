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
                    if (err) {
                        dialog.showErrorBox('Error al exportar la base de datos', err.message);
                        console.error('Error exportando la base de datos', err)
                    } else {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Operación realizada correctamente',
                            message: 'Base de datos exportada correctamente.',
                            buttons: ['OK']
                        });
                        console.log('Base de datos exportada correctamente', backupRoute)
                    }
                });
            } else {
                dialog.showErrorBox('Error', 'No fue posible obtener la ruta de destino');
                console.error('Error al obtener la ruta para exportar el archivo');
            }
        }
    }).catch((err)=>{
        console.error('Error en el cuadro de diálogo: ',err);
    })
}


