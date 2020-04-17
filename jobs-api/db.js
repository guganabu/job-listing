const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('jobs');
const tableName = 'job';

// Create database
db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`, (err, row) => {
    if (err) {
        console.log('Error while run query!');
    } 
    if (!row) {
        createTable();
    }
})
function createTable() {
    db.run("CREATE TABLE job (id INTEGER, job_id TEXT, title TEXT, type TEXT, company TEXT, company_url TEXT, job_url TEXT, location TEXT, description TEXT)");
    console.log(`Table ${tableName} Created!`);
}

db.close();
exports.db;