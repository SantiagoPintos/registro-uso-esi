import { dialog} from 'electron'
import fs from 'fs'
import { databasePath } from "./dbConnection";
import Logger from '../logger/logger';

export function databaseExporter(){
    const logger = new Logger('dbExporter.log');
    const dialogOptions = {
        title: 'Seleccione ubicación para exportar la base de datos',
        buttonLabel: 'Exportar',
        defaultPath: 'registro.sqlite',
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
                        logger.log('Error exportando la base de datos: ' + err.message);
                        
                    } else {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'Operación realizada correctamente',
                            message: 'Base de datos exportada correctamente.',
                            buttons: ['OK']
                        });
                        logger.log('Base de datos exportada correctamente');
                    }
                });
            } else {
                dialog.showErrorBox('Error', 'No fue posible obtener la ruta de destino');
                logger.log('Error al obtener la ruta para exportar el archivo');
            }
        }
    }).catch((err)=>{
        logger.log('Error al exportar la base de datos: ' + err.message);
        throw new Error(err.message);
    })
}


