require("dotenv").config()
import { Pool, PoolClient } from 'pg'

const db = new Pool({   
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_SECRET,
    port: Number(process.env.POSTGRES_PORT)
})

db.connect().then((client: PoolClient) => {
    client.query('SELECT $1::text as status', ['OK']) 
        .then(_ => {
            console.log(`Connect to DB: ${process.env.POSTGRES_DB} has been established`)
        })
        .catch((e: Error) => {
            throw e
        }).finally(() => {
            client.release()
        })
}).catch((error: Error) => console.error(`Connection error`, error))

export default db