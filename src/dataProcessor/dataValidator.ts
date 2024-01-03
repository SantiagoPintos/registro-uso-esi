import { ciValidator } from "./ciValidator";
import { isInDB } from "../dbManager/dbOperator";
import { databaseConnector, closeConnection } from "../dbManager/dbConnection";
import Logger from "../logger/logger";

export function validateData(ci: string):void{
    const logger = new Logger("dataValidator.log");
    //validate if ci is a valid uruguayan ci
    if(!ciValidator(ci)) throw new Error("CI inválida");
    const db = databaseConnector();
    try{
        const isRegistered = isInDB(db, ci);
        if (!isRegistered) {
            throw new Error("CI no registrada en la base de datos");
        }
    } catch (err:any) {
        logger.log('Error al validar datos: ' + err.message);
    }
    finally {
        closeConnection();
    }
}

export function validateNames(name: string, errMsg: string = "Nombre de grupo inválido"): void {
    if (name.match(/[^0-9a-z]/gi) || name.trim() === "" || name === null) throw new Error(errMsg);
}
