import mysql2  from "mysql2/promise"
import { variablesBd } from "../config/config.js";

export async function newConnection (){
    const connection = await mysql2.createConnection({
        host: variablesBd.DB_HOST,
        user: variablesBd.DB_USER,
        password: variablesBd.DB_PASSWORD,
        database: variablesBd.DB_NAME
    })
    return connection;
}