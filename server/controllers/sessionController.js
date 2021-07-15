//const session = require('express-session');

// const Session = require('../models/sessionModel');

const db = require('../models/dbModel');

const sessionController = {};

//creates cookie, stores SSID in db

sessionController.startSession = async (req, res, next) => {
  console.log('KEF IN startSession middleware');
  const ssidCookie = res.locals.cookie;
  try {
    const queryString = `INSERT INTO sessions (cookie_id) VALUES ($1)`;
    const results = await db.query(queryString, [ssidCookie]);
    return next();
  } catch (e) {
    console.log('StartSession Error', e);
  }
  // Session.create({
  //   cookieId: ssidCookie,
  // });
  // next();
};

//finds cookie
//on success - next()
//on fail, sends obj with isloggedin: false

sessionController.isLoggedIn = async (req, res, next) => {
  //console.log('KEF IN isLoggedIn middleware');
  const ssidCookie = req.cookies.ssid;
  //find the cookie
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

  // Session.findOne({
  //   cookieId: ssidCookie,
  // }).then((data) => {
  //   //if not logged in, return false object (USE THIS FOR REDIRECT)
  //   if (!data) {
  //     return res.status(500).send({ isLoggedIn: false });
  //   }
  //   //else, you are logged in, go next
  //   else {
  //     next();
  //   }
  // });
};

module.exports = sessionController;
