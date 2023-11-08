import { Database } from 'sqlite3';

export function createData(db: Database){
    const createQuery = "CREATE TABLE alumnos (ci INTEGER PRIMARY KEY, nombre TEXT, grupo TEXT)";

    db.run(createQuery, [], function(err: Error|null){
        if (err) throw new Error(err.message);
        console.log('Tabla creada');
    })
}