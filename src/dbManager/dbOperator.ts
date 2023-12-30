import { Database } from 'sqlite3';
import { debug } from '../App';

export function createData(db: Database){
    const createQueryGrupo= "CREATE TABLE IF NOT EXISTS Grupo(nombre TEXT PRIMARY KEY)";
    const createQueryAlumnos = "CREATE TABLE IF NOT EXISTS alumnos (ci TEXT PRIMARY KEY, nombre TEXT NOT NULL, apellido TEXT NOT NULL, grupo TEXT, FOREIGN KEY(grupo) REFERENCES Grupo(nombre))";
    const createQueryRegistro= "CREATE TABLE IF NOT EXISTS registro (alumno TEXT PRIMARY KEY, entrada DATETIME NOT NULL, salida DATETIME NOT NULL, FOREIGN KEY (alumno) REFERENCES alumnos(ci))";

    try {
        db.run(createQueryGrupo, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            if(debug) console.log('Tabla grupos creada');
        })
        db.run(createQueryAlumnos, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            if(debug) console.log('Tabla alumnos creada');
        })
        db.run(createQueryRegistro, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            if(debug) console.log('Tabla registro creada');
        })
    } catch (err){
        throw new Error('Imposible crear tablas de base de datos'+ err);
    }

}

export function insertGrupo(db: Database, data: Grupo): Promise<void> {
    return new Promise((resolve, reject): void => {
        const insertQuery = "INSERT INTO Grupo(nombre) VALUES (?)";
        db.run(insertQuery, [data.nombre], function (err: Error | null) {
            if (err) {
                reject(new Error(err.message));
            } else {
                if(debug) console.log('Grupo insertado');
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
                reject(new Error(err.message));
            } else {
                if(debug) console.log('Alumno insertado');
                resolve();
            }
        })
    })
}

export function insertRegistro(db:Database, data:Registro){
    const insertQuery = "INSERT INTO Registro(alumno, entrada, saluda) VALUES(?, ?, ?)";
    db.run(insertQuery, [data.alumno, data.entrada, data.salida], function (err: Error|null){
        if(err) throw new Error(err.message);
        if(debug) console.log('Registro insertado con éxito');
    })
}

export function isInDB(db: Database, ci: string): boolean{
    const selectQuery = "SELECT ci FROM alumnos WHERE ci = ?";
    let result: boolean = false;
    try{
        db.get(selectQuery, [ci], function(err: Error|null, row: any){
        if(err) throw new Error(err.message);
        if(row) result = true;
    })
    }
    catch(err){
        throw new Error('Error al buscar en la base de datos');
    }
    return result;
}

export function groupIsInDB(db: Database, name: string): Promise<void>{
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT nombre FROM Grupo WHERE nombre = ?";
        db.get(selectQuery, [name.toUpperCase()], function(err: Error|null, row: any) {
            if (err) {
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
                reject(new Error(err.message));
            } else {
                if(debug) console.log('Grupo eliminado');
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
                reject(new Error(err.message));
            } else {
                if(debug) console.log(`Alumno ${ci} eliminado`);
                resolve()
            }
        });
    });
}

