const db = require('../models/dbModel');
const userController = {};
const bcrypt = require('bcrypt');
const salt_rounds = 10;

//USER CREATION - STANDARD (no OAuth)

userController.createUser = (req, res, next) => {
  //check request for correct data
  if (req.body.emails && req.body.passwords) {
    //perform encryption
    bcrypt.hash(req.body.passwords, salt_rounds, (error, hash) => {
      //error check
      if (error) console.log('bcrypt error');
      //create user w encrypted pw
      else {
        const queryString = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;

        db.query(queryString, [req.body.emails, req.body.emails, hash])
          .then(result => {
            if (result) {
              res.locals.userEmail = req.body.emails;
              return next();
            }
          })
          .catch(e => {
            console.log('CreateUser Error: ', e);
          });
      }
    });
  }
};

//USER VERIFICATION - STANDARD (no OAuth)

userController.verifyLogin = async (req, res, next) => {
  try {
  //find by username
  const findQuery = 'SELECT * FROM users WHERE email = $1';
  const results = await db.query(findQuery, [req.body.email]);

  if(results.rows.length != 1) {
    return res.send({ message: 'user not found' });
  } else {
   bcrypt.compare(req.body.password, results.rows[0].password, (error, match) => {
      // login fail
      if (error) res.status(500).json(error);
      // login success
     else 
      if (match) {
        res.locals.userEmail = req.body.email;
        return next();
      }
      //login fail (incorrect pw)
      else return res.send({ message: 'incorrect PW' });
   });
  }
} catch (e) {
  console.log('VerifyUser Error: ', e);
}
};

module.exports = userController;
