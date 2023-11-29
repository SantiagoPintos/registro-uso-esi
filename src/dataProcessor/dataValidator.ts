import { ciValidator } from "./ciValidator";
import { isInDB } from "../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../dbManager/dbConnection";

export function validateData(ci: string):void{
    //validate if ci is a valid uruguayan ci
    if(!ciValidator(ci)) throw new Error("CI invalida");
    const db = databaseConnector();
    try{
        const isRegistered = isInDB(db, ci);
        if (!isRegistered) {
            throw new Error("CI no registrada en la base de datos");
        }
    } finally {
        closeConnection();
    }
}