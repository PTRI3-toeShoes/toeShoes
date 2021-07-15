const db = require('../models/dbModel');

const cookieController = {};

// /**
//  * setCookie - set a cookie with a random number
//  * currently not used
//  */
// cookieController.setCookie = (req, res, next) => {
//   const num = Math.floor(Math.random() * 99);
//   res.locals.cookie = num;
//   res.cookie("secret", num, {httpOnly: true})
//   .then(()=>next())
// };

//finds user, sets ssid cookie

cookieController.setSSIDCookie = (req, res, next) => {
  const queryString = `SELECT * FROM users WHERE email = $1` 
  // User.findOne({email: req.body.email})
  db.query(queryString, [req.body.email])
    .then((data) => {
      //data comes back in array of rows
      const id = data.rows[0].id;
     // console.log('id from Cookie setter ', id)
      res.locals.cookie = id;
      res.cookie("ssid", id, {httpOnly: true});
    })
    .then(() => next())
    .catch(e => {
      console.log('SetSSIDCookie Error: ', e);
    })
}

module.exports = cookieController;
