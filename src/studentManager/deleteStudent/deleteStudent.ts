import { ciValidator } from "../../dataProcessor/ciValidator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { deleteStudentFromDB } from "../../dbManager/dbOperator";
import { getAlumnoFromCi } from "../../dbManager/dbOperator";
import path from "path";
import Logger from "../../logger/logger";

export const deleteStudentHTMLPath = path.join(__dirname, "deleteStudent.html");
export async function deleteStudent(ci: string): Promise<string|undefined> {
    const logger = new Logger("deleteStudent.log");
    let response: string|undefined;
    ci=ci.trim().toUpperCase();
    if(!ciValidator(ci)) throw new Error('Cédula inválida');

    try {
        const db = databaseConnector();
        const alumno = await getAlumnoFromCi(ci, db);
        await deleteStudentFromDB(db, ci);
        response = `Alumno ${alumno.nombre} ${alumno.apellido} eliminado con éxito`;
    } catch (error: any) {
        logger.log('Error al eliminar alumno de la base de datos: ' + error.message);        
        throw new Error(error.message);
    } finally {
        closeConnection();
    }
    return response;
}
