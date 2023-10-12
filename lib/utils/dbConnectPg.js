const pgp = require('pg-promise')();

const conn = {
    host: 'localhost',
    port: 5432,
    database: 'Salary',
    user: 'postgres',
    password: 'abcd1234',
    max: 30 // maximum size of the connection pool
};

module.exports = pgp(conn);