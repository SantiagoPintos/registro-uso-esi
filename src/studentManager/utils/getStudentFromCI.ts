import { getAlumnoFromCi } from "../../dbManager/dbOperator";
import { ciValidator } from "../../dataProcessor/ciValidator";
import { closeConnection, databaseConnector } from "../../dbManager/dbConnection";
import Logger from "../../logger/logger";
import { Database } from 'sqlite3';

export async function getStudentFromCi(ci: string): Promise<Alumno>{
    const logger = new Logger("getStudentFromCi.log");
    let db: Database|null = null;
    try{
        if(!ciValidator(ci)) throw new Error("CI inválida");
        db = databaseConnector();
        return await getAlumnoFromCi(ci, db);
    } catch (e:any) {
        logger.log('Error al obtener alumno de la base de datos: ' + e.message);
        throw new Error(e.message);
    }
    finally {
        if(db){
            closeConnection();
        }
    }
}
