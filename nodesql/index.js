const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");
});

async function dbquery(sql) {
    try {
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject({status:false});
                } else {
                    resolve({status:true, data:result});
                }
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return {status:false}
    }
}


async function dbinsert(sql, post) {
    try {
        return new Promise((resolve, reject) => {
            db.query(sql, post, (err, result) => {
                if (err) {
                    console.log(err);
                    reject({status:false});
                } else {
                    resolve({status:true, data:result});
                }
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return {status:false}
    }
}

module.exports = { dbquery, dbinsert }


const express = require('express');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())

const routes = require('./routes')
app.use('/', routes)


app.get("/createTable", (req, res) => {
    let sql = "CREATE TABLE users(id int PRIMARY KEY AUTO_INCREMENT, password VARCHAR(50), email VARCHAR(100) UNIQUE, userid VARCHAR(100) UNIQUE NOT NULL, blockedCount INT, otp INT, username VARCHAR(20))";

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        console.log(res)
        res.send("Users table created");
    });
});


app.listen((process.env.port), () => console.log('http://localhost:4001'))