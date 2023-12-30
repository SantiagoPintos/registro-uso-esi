import { ciValidator } from "../../dataProcessor/ciValidator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { deleteStudentFromDB } from "../../dbManager/dbOperator";
import { getAlumnoFromCi } from "../../dbManager/dbOperator";
import path from "path";

export const deleteStudentHTMLPath = path.join(__dirname, "deleteStudent.html");
export async function deleteStudent(ci: string): Promise<string|undefined> {
    let response: string|undefined;
    ci=ci.trim().toUpperCase();
    if(!ciValidator(ci)) throw new Error('Cédula inválida');

    try {
        const db = databaseConnector();
        const alumno = await getAlumnoFromCi(ci, db);
        await deleteStudentFromDB(db, ci);
        response = `Alumno ${alumno.nombre} ${alumno.apellido} eliminado con éxito`;
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        closeConnection();
    }
    return response;
}
