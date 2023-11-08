import * as sqlite3 from 'sqlite3'

let db: sqlite3.Database|null = null;

export function databaseConnector(){
    if(db===null){
        db = new sqlite3.Database('./src/database/database.sqlite', (err: Error|null) =>{
            if (err){
                console.error(err)
            } else {
                console.log('Conexion exitosa a db');
            }
    
        });
    }
    return db;
}

export function closeConnection(){
    if(db!==null){
        db.close((err: Error|null) => {
            if (err) console.error(err.message);

            console.log('Conexion a db cerrada')
        })
    }
}
