import { Database } from 'sqlite3';

export function createData(db: Database){
    const createQueryGrupo= "CREATE TABLE IF NOT EXISTS Grupo(nombre TEXT PRIMARY KEY)";
    const createQueryAlumnos = "CREATE TABLE IF NOT EXISTS alumnos (ci TEXT PRIMARY KEY, nombre TEXT NOT NULL, grupo TEXT, FOREIGN KEY(grupo) REFERENCES Grupo(nombre))";
    const createQueryRegistro= "CREATE TABLE IF NOT EXISTS registro (alumno TEXT PRIMARY KEY, entrada DATETIME NOT NULL, salida DATETIME NOT NULL, FOREIGN KEY (alumno) REFERENCES alumnos(ci))";

    try {
        db.run(createQueryGrupo, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            console.log('Tabla grupos creada');
        })
        db.run(createQueryAlumnos, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            console.log('Tabla alumnos creada');
        })
        db.run(createQueryRegistro, [], function(err: Error|null){
            if (err) throw new Error(err.message);
            console.log('Tabla registro creada');
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
                console.log('Grupo insertado');
                resolve();
            }
        });
    });
}
export function insertAlumno(db: Database, data: Alumno){
    const insertQuery = "INSERT INTO alumno (ci, nombre, grupo, hora) VALUES (?, ?, ?, ?)";

    db.run(insertQuery, [data.ci, data.nombre, data.grupo, data.hora], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Alumno insertado');
    })
}

export function insertRegistro(db:Database, data:Registro){
    const insertQuery = "INSERT INTO Registro(alumno, entrada, saluda) VALUES(?, ?, ?)";
    db.run(insertQuery, [data.alumno, data.entrada, data.salida], function (err: Error|null){
        if(err) throw new Error(err.message);
        console.log('Registro insertado con éxito');
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
                    reject(new Error('Error, el grupo ya existe'));
                } else {
                    resolve();
                }
            }
        });
    });
}
