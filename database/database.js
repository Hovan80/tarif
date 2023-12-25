import sqlite3 from "sqlite3";
const path = require('path')

const dbPath = path.join(__dirname, 'database.sqlite')
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    throw err;
});

const initDb = () => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS tarif (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                price REAL NOT NULL,
                minute INTEGER,
                sms INTEGER,
                mobile_internet INTEGER,
                home_internet INTEGER
            );
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                pasport_id INTEGER NOT NULL,
                tarif_id INTEGER,
                last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (tarif_id) REFERENCES tarif(id)
            );
            CREATE TABLE IF NOT EXISTS user_log(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL, 
                pasport_id INTEGER NOT NULL,
                tarif_id INTEGER NOT NULL,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            );`, (err) => {
            if (err) console.error(err.message);
            throw err;})
}

export {initDb, db}