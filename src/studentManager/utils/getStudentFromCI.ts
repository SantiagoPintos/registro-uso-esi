import { getAlumnoFromCi } from "../../dbManager/dbOperator";
import { ciValidator } from "../../dataProcessor/ciValidator";
import { closeConnection, databaseConnector } from "../../dbManager/dbConnection";
import { debug } from "../../App";
import { Database } from 'sqlite3';

export async function getStudentFromCi(ci: string): Promise<Alumno>{
    let db: Database|null = null;
    try{
        if(!ciValidator(ci)) throw new Error("CI inválida");
        db = databaseConnector();
        return await getAlumnoFromCi(ci, db);
    } catch (e:any) {
        if(debug) console.error('getStudentFromCi: '+e.message);
        throw new Error(e.message);
    }
    finally {
        if(db){
            closeConnection();
        }
    }
}
