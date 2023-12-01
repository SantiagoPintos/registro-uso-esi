import { insertGrupo } from "../../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { groupIsInDB } from "../../dbManager/dbOperator";
import path from "path";

export const newGroupHTMLPath = path.join(__dirname, "newGroup.html");
export async function createGroup(name: string): Promise<void> {
    name=name.trim().toUpperCase();
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
    if (name.match(/[^0-9a-z]/gi) || name.trim() === "" || name === null) throw new Error("Nombre de grupo inválido");
}
