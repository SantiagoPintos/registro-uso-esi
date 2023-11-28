import { ciValidator } from "./ciValidator";

export function validateData(ci: string): void {
    //validate if ci is a valid uruguayan ci
    if(!ciValidator(ci)) throw new Error("Cédula inválida");
    //TODO: Check if CI is in database
}