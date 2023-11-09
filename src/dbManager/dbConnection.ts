import * as sqlite3 from 'sqlite3';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const databasePath = path.join(app.getPath("userData"), 'database.sqlite');
let db: sqlite3.Database;

export function createDatabaseIfNotExists() {
  if (!fs.existsSync(databasePath)) {
    try{
      const directoryPath = path.dirname(databasePath);
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      fs.writeFileSync(databasePath, '');
    } catch (err) {
      console.log('Error al crear db', err);
    }
  } else {
    console.log('db ya existe');
  }
}

export function databaseConnector() {
  db = new sqlite3.Database(databasePath, (err: Error | null) => {
    if (err) throw new Error(err.message);
    console.log('Conexion exitosa a db');
  });

  return db;
}

export function closeConnection(){
    if(db!==null){
        db.close((err: Error|null) => {
            if (err) throw new Error(err.message);

            console.log('Conexion a db cerrada')
        })
    }
}
