import mysql2  from "mysql2/promise"

export async function newConnection (){
    const connection = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'db_system'
    })
    return connection;
}