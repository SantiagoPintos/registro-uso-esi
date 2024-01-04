import { Database } from 'sqlite3';
import Logger from '../logger/logger';
const logger = new Logger('dbOperator.log');

export function createData(db: Database){
    const createQueryGrupo= "CREATE TABLE IF NOT EXISTS Grupo(nombre TEXT PRIMARY KEY)";
    const createQueryAlumnos = "CREATE TABLE IF NOT EXISTS alumnos (ci TEXT PRIMARY KEY, nombre TEXT NOT NULL, apellido TEXT NOT NULL, grupo TEXT, FOREIGN KEY(grupo) REFERENCES Grupo(nombre))";
    const createQueryRegistro= "CREATE TABLE IF NOT EXISTS registro (alumno TEXT PRIMARY KEY, entrada DATETIME NOT NULL, salida DATETIME NOT NULL, FOREIGN KEY (alumno) REFERENCES alumnos(ci))";
    
    try {
        db.run(createQueryGrupo, [], function(err: Error|null){
            if (err) {
                logger.log('Error al crear la tabla de grupos: ' + err.message);
                throw new Error(err.message);
            }
        })
        db.run(createQueryAlumnos, [], function(err: Error|null){
            if (err) {
                logger.log('Error al crear la tabla de alumnos: ' + err.message);
                throw new Error(err.message);
            }
        })
        db.run(createQueryRegistro, [], function(err: Error|null){
            if (err) {
                logger.log('Error al crear la tabla de registro: ' + err.message);
                throw new Error(err.message);
            }
        })
    } catch (err:any){
        logger.log('Error al crear las tablas de la base de datos: ' + err.message);
        throw new Error('Imposible crear tablas de base de datos'+ err);
    }
    
}

export function insertGrupo(db: Database, data: Grupo): Promise<void> {
    return new Promise((resolve, reject): void => {
        const insertQuery = "INSERT INTO Grupo(nombre) VALUES (?)";
        db.run(insertQuery, [data.nombre], function (err: Error | null) {
            if (err) {
                logger.log('Error al insertar grupo en la base de datos: ' + err.message);
                reject(new Error(err.message))
            } else {
                resolve();
            }
        });
    });
}

export async function insertAlumnoInDB(db: Database, data: Alumno): Promise<void>{
    //check if already is in database
    if(isInDB(db, data.ci)){
        return new Promise((resolve, reject) => {
            reject(new Error('El alumno ya existe'));
        })
    }
    return new Promise((resolve, reject) => {
        const insertQuery = "INSERT INTO alumnos(ci, nombre, apellido, grupo) VALUES(?, ?, ?, ?)";
        db.run(insertQuery, [data.ci, data.nombre, data.apellido, data.grupo], function(err: Error|null){
            if(err){
                logger.log('Error al insertar alumno en la base de datos: ' + err.message);
                reject(new Error(err.message));
            } else {
                resolve();
            }
        })
    })
}

export function insertOrUpdateRegistro(db: Database, data: Registro): Promise<void> {
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM registro WHERE alumno = ? AND entrada = ?";
        db.get(selectQuery, [data.alumno.ci, data.hora], (err, row) => {
            if (err) {
                logAndReject("Error al consultar la base de datos: " + err.message, reject);
            } else if (row) {
                updateRegistro(db, data, resolve, reject);
            } else {
                insertRegistro(db, data, resolve, reject);
            }
        });
    });
}

function updateRegistro(db: Database, data: Registro, resolve: () => void, reject: (error: Error) => void): void {
    const updateQuery = "UPDATE registro SET salida = ? WHERE alumno = ? AND entrada = ?";
    db.run(updateQuery, [data.alumno.ci, data.hora], function (err: Error | null) {
        if (err) {
            logAndReject("Error al actualizar registro de uso en la base de datos: " + err.message, reject);
        } else {
            resolve();
        }
    });
}

function insertRegistro(db: Database, data: Registro, resolve: () => void, reject: (error: Error) => void): void {
    const insertQuery = "INSERT INTO registro(alumno, entrada) VALUES(?, ?)";
    db.run(insertQuery, [data.alumno.ci, data.hora], function (err: Error | null) {
        if (err) {
            logAndReject("Error al insertar registro de uso en la base de datos: " + err.message, reject);
        } else {
            resolve();
        }
    });
}

function logAndReject(errorMessage: string, reject: (error: Error) => void): void {
    logger.log(errorMessage);
    reject(new Error(errorMessage));
}

export function isInDB(db: Database, ci: string): boolean{
    const selectQuery = "SELECT ci FROM alumnos WHERE ci = ?";
    let result: boolean = false;
    try{
        db.get(selectQuery, [ci], function(err: Error|null, row: any){
            if(err) {
                logger.log('Error en método isInDB: ' + err.message);
                throw new Error(err.message)
            }
            if(row) result = true;
        })
    }
    catch(err:any){
        logger.log('Error al buscar en la base de datos: ' + err.message);
        throw new Error('Error al buscar en la base de datos');
    }
    return result;
}

export function groupIsInDB(db: Database, name: string): Promise<void>{
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT nombre FROM Grupo WHERE nombre = ?";
        db.get(selectQuery, [name.toUpperCase()], function(err: Error|null, row: any) {
            if (err) {
                logger.log('Error en groupIsInDB: ' + err.message);
                reject(new Error(err.message));
            } else {
                if (row && row.nombre === name.toUpperCase()) {
                    reject(new Error('El grupo ya existe'));
                } else {
                    resolve();
                }
            }
        });
    });
}

export async function deleteGroupFromDB(db: Database, name: string): Promise<void>{
    return new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM Grupo WHERE nombre = ?";
        db.run(deleteQuery, [name.toUpperCase()], function(err: Error|null){
            if(err){
                logger.log('Error al eliminar grupo de la base de datos: ' + err.message);
                reject(new Error(err.message));
            } else {
                resolve();
            }
        })
    })
}

export async function getAllGroups(db: Database): Promise<string[]>{
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT nombre FROM Grupo";
        const result: string[] = [];
        db.all(selectQuery, [], function(err: Error|null, rows: any){
            if(err){
                logger.log('Error al obtener todos los grupos de la base de datos: ' + err.message);
                reject(new Error(err.message));
            } else {
                rows.forEach((row: any) => {
                    result.push(row.nombre);
                });
                resolve(result);
            }
        })
    })
}

export async function getAlumnoFromCi(ci: string, db: Database): Promise<Alumno>{
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM alumnos WHERE ci = ?";
        db.get(selectQuery, [ci], function(err: Error|null, row: any){
            if(err){
                logger.log('Error al obtener alumno de la base de datos: ' + err.message);
                reject(new Error(err.message));
            } else {
                if(row){
                    const alumno: Alumno = {
                        nombre: row.nombre,
                        apellido: row.apellido,
                        ci: row.ci,
                        grupo: row.grupo
                    }
                    resolve(alumno);
                } else {
                    reject(new Error('Alumno no encontrado'));
                }
            }
        })
    })
}

export async function deleteStudentFromDB(db: Database, ci: string): Promise<void>{
    return new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM alumnos WHERE ci = ?";
        db.run(deleteQuery, [ci], function(err: Error|null){
            if(err){
                logger.log('Error al eliminar alumno de la base de datos: ' + err.message);
                reject(new Error(err.message));
            } else {
                resolve()
            }
        });
    });
}

