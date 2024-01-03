import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { deleteGroupFromDB } from "../../dbManager/dbOperator";
import { validateNames } from "./../../dataProcessor/dataValidator";
import path from "path";
import Logger from "../../logger/logger";

export const deleteGroupHTMLPath = path.join(__dirname, "deleteGroup.html");
export async function deleteGroup(name: string): Promise<void> {
    const logger = new Logger("deleteGroup.log");
    name=name.trim().toUpperCase();
    validateNames(name);

    try {
        const db = databaseConnector();
        await deleteGroupFromDB(db, name);
    } catch (error: any) {
        logger.log('Error al eliminar grupo de la base de datos: ' + error.message);
        throw new Error(error.message);
    } finally {
        closeConnection();
    }

}