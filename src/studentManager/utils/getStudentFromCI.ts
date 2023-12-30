import { getAlumnoFromCi } from "./../../dbManager/dbOperator";
import { ciValidator } from "../../dataProcessor/ciValidator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { debug } from "../../App";

export async function getStudentFromCi(ci: string): Promise<Alumno>{
    try{
        if(!ciValidator(ci)) throw new Error("CI invalida");
        const db = databaseConnector();
        const alumno: Alumno = await getAlumnoFromCi(ci, db);
        closeConnection();
        return alumno;
    } catch (e:any) {
        if(debug) console.error('getStudentFromCi: '+e.message);
        throw new Error(e.message);
    }
}
