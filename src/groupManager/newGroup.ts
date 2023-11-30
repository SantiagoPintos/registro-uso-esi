import { insertGrupo } from "../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../dbManager/dbConnection";
import { groupIsInDB } from "../dbManager/dbOperator";

export async function createGroup(name: string): Promise<void> {
    validateData(name);
    const group: Grupo = {
        nombre: name,
    }

    try {
        const db = databaseConnector();
        if (!groupIsInDB(db, name)){
            await insertGrupo(db, group);
        }
    } catch (error: any) {
        //hack, needs to be fixed later
        if (error.message.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed")) {
            throw new Error("Error, el grupo ya existe");
        } else {
            throw new Error('Error al insertar grupo en la base de datos');
        }


    } finally {
        closeConnection();
    }
}

function validateData(name: string): void {
    if (name === "" || name === null) throw new Error("Nombre de grupo invalido");
}