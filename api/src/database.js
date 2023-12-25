const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE data (
            id TEXT UNIQUE PRIMARY KEY,
            link TEXT,
            title TEXT,
            img TEXT,
            count INTEGER DEFAULT 0
            )`,
        (err) => {
            if (err) {
                console.log('Table "data" already created');
            }
        });
    }
});

module.exports = db;