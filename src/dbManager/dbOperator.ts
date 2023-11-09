import { Database } from 'sqlite3';

export function createData(db: Database){
    const createQuery = "CREATE TABLE IF NOT EXISTS alumnos (ci INTEGER PRIMARY KEY, nombre TEXT NOT NULL, grupo TEXT NOT NULL, hora DATETIME NOT NULL)";

    db.run(createQuery, [], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Tabla creada');
    })
}

export function insertAlumno(db: Database, data: Alumno){
    const insertQuery = "INSERT INTO alumno (ci, nombre, grupo, hora) VALUES (?, ?, ?, ?)";

    db.run(insertQuery, [data.ci, data.nombre, data.grupo, data.hora], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Alumno insertado');
    })
}