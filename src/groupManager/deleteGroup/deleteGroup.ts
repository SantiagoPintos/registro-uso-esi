import { databaseConnector, closeConnection } from "../../dbManager/dbConnection";
import { deleteGroupFromDB } from "../../dbManager/dbOperator";
import { validateData } from "../newGroup/newGroup";
import path from "path";

export const deleteGroupHTMLPath = path.join(__dirname, "deleteGroup.html");
export async function deleteGroup(name: string): Promise<void> {
    name=name.trim().toUpperCase();
    validateData(name);

    try {
        const db = databaseConnector();
        await deleteGroupFromDB(db, name);
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        closeConnection();
    }

}