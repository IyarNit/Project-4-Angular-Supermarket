
const mysql2 = require('mysql2');

require("dotenv").config()

const { HOST, DB_PORT, USER, PASSWORD, DATABASE } = process.env

const pool = mysql2.createPool({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection(function (err, connection) {
    if (connection) return console.log("mySql Connected")
    if (err) {
        console.log(err)

        throw err; // not connected!

    }
})

module.exports = pool.promise()


