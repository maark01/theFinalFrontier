"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const pg_1 = require("pg");
const db = new pg_1.Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_SECRET,
    port: Number(process.env.POSTGRES_PORT)
});
db.connect().then((client) => {
    client.query('SELECT $1::text as status', ['OK'])
        .then(_ => {
        console.log(`Connect to DB: ${process.env.POSTGRES_DB} has been established`);
    })
        .catch((e) => {
        throw e;
    }).finally(() => {
        client.release();
    });
}).catch((error) => console.error(`Connection error`, error));
exports.default = db;
