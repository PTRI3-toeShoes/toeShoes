const { Pool } = require('pg');

console.log('RGR process.env.SQL_STRING in dbModel: ', process.env.SQL_STRING);

const pool = new Pool ({
    connectionString: process.env.SQL_STRING
});

module.exports = {
    query : (text, params, callback) => {
        console.log('Executing Query ', text);
        return pool.query(text, params, callback);
    }
};