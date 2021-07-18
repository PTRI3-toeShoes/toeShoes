const db = require('../models/dbModel');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  const ssidCookie = res.locals.cookie;
  try {
    const queryString = `INSERT INTO sessions (cookie_id) VALUES ($1)`;
    const results = await db.query(queryString, [ssidCookie]);
    return next();
  } catch (e) {
    console.log('StartSession Error', e);
  }
};


sessionController.isLoggedIn = async (req, res, next) => {
  const ssidCookie = req.cookies.ssid;
  try {
    const queryString = `SELECT * FROM sessions WHERE cookie_id = $1`;
    const results = await db.query(queryString, [ssidCookie]);
    if (!results.rows.length) {
      return res.status(500).send({ isLoggedIn: false });
    } else {
      return next();
    }
  } catch (e) {
    console.log('IsLoggedIn ERROR: ', e);
  }
};

module.exports = sessionController;
