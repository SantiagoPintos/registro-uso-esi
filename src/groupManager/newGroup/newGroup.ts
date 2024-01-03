import { insertGrupo } from "../../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { groupIsInDB } from "../../dbManager/dbOperator";
import { validateNames } from "./../../dataProcessor/dataValidator"
import path from "path";
import Logger from "../../logger/logger";

export const newGroupHTMLPath = path.join(__dirname, "newGroup.html");
export async function createGroup(name: string): Promise<void> {
    const logger = new Logger("newGroup.log");
    name=name.trim().toUpperCase();
    validateNames(name);
    const group: Grupo = {
        nombre: name,
    }

    try {
        const db = databaseConnector();
        await groupIsInDB(db, name)
        await insertGrupo(db, group);
    } catch (error: any) {
        logger.log('Error al insertar grupo en la base de datos: ' + error.message);
        throw new Error(error.message);
    } finally {
        closeConnection();
    }
}

