import { insertAlumnoInDB } from "../../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { validateNames } from "./../../dataProcessor/dataValidator";
import { ciValidator } from "../../dataProcessor/ciValidator";
import path from "path";

export const newStudentHTMLPath = path.join(__dirname, "newStudent.html");

export function convertToAlumno(data: { name: string; ap: string; ci: string; group: string }): Alumno {
    return {
        ci: data.ci,
        nombre: data.name,
        apellido: data.ap,
        grupo: data.group
    };
}

export async function addAlumno(data: Alumno) {
    validateNames(data.nombre, "Nombre de alumno inválido");
    validateNames(data.apellido, "Apellido de alumno inválido");
    if (!ciValidator(data.ci)) throw new Error("Cédula inválida");

    try {
        const db = databaseConnector();
        await insertAlumnoInDB(db, data);
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.message);
    } finally {
        closeConnection();
    }    
}
