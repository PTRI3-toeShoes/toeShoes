const { Pool } = require('pg');

console.log('RGR process.env.SQL_STRING in dbModel: ', process.env.SQL_STRING);

const pool = new Pool ({
    connectionString: "postgres://wropaeom:iiD5vZLE3pltW78jVbLG19DqubsoY7E8@batyr.db.elephantsql.com/wropaeom"
});

module.exports = {
    query : (text, params, callback) => {
        console.log('Executing Query ', text);
        return pool.query(text, params, callback);
    }
};