const pgp = require("pg-promise")();

const config = {
    host: 'localhost',
    port: 5432,
    database: 'gallery',
    user: 'gallery',
    password: '1234',
    max: 30 
};

const db = pgp(config);

module.exports = db;