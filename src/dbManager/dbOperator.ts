import { Database } from 'sqlite3';

export function createData(db: Database){
    const createQueryAlumnos = "CREATE TABLE IF NOT EXISTS alumnos (ci TEXT PRIMARY KEY, nombre TEXT NOT NULL, grupo TEXT NOT NULL)";
    const createQueryRegistro= "CREATE TABLE IF NOT EXISTS registro (alumno TEXT PRIMARY KEY, entrada DATETIME NOT NULL, salida DATETIME NOT NULL, FOREIGN KEY (alumno) REFERENCES alumnos(ci))";

    db.run(createQueryAlumnos, [], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Tabla alumnos creada');
    })
    db.run(createQueryRegistro, [], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Tabla registro creada');
    })
}

export function insertAlumno(db: Database, data: Alumno){
    const insertQuery = "INSERT INTO alumno (ci, nombre, grupo, hora) VALUES (?, ?, ?, ?)";

    db.run(insertQuery, [data.ci, data.nombre, data.grupo, data.hora], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Alumno insertado');
    })
}