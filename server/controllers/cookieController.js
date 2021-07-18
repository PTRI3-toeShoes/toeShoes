const db = require('../models/dbModel');

const cookieController = {};

//finds user, sets ssid cookie

cookieController.setSSIDCookie = (req, res, next) => {
  const queryString = `SELECT * FROM users WHERE email = $1` 
  let email = res.locals.userEmail;

  if(res.locals.oauthToken){
    email = res.locals.email;
  }
  db.query(queryString, [email])
    .then((data) => {
      const id = data.rows[0].id;
      res.locals.cookie = id;
      res.cookie("ssid", id, {httpOnly: true});
    })
    .then(() => next())
    .catch(e => {
      console.log('SetSSIDCookie Error: ', e);
    })
}

module.exports = cookieController;
