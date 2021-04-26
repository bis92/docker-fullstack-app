const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    port: '3306',
    user: 'root',
    password: '164487s2',
    database: 'myapp'
});
exports.pool = pool;