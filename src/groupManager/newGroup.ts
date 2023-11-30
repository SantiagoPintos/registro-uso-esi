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
        await groupIsInDB(db, name)
        await insertGrupo(db, group);
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        closeConnection();
    }
}

function validateData(name: string): void {
    if (name === "" || name === null) throw new Error("Nombre de grupo invalido");
}
