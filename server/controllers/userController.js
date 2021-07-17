const db = require('../models/dbModel');
const userController = {};
const bcrypt = require('bcrypt');
const salt_rounds = 10;

//USER CREATION - STANDARD (no OAuth)
//success - next()
//fail - sends obj {success: false}, return out

userController.createUser = (req, res, next) => {
  console.log('KEF IN createUser middleware: ', req.body.emails, req.body.passwords);
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
            if (result) return next();
          })
          .catch(e => {
            console.log('CreateUser Error: ', e);
          });

      }
    });
  }
};
        // const user = new User({
        //   username: req.body.name,
        //   email: req.body.email,
        //   password: hash,
        // });
        // user
        //   .save()
          //   (err, result) => {
          //   if (err) {
          //     //if there is a duplication, sends back message on res.data
          //     return res.send({success: false})
          //   } else {
          //     //else, successful add, go to next
          //     next();
          //   }
          // })
          // .then(() => next())
          // .catch((err) => console.log(err.message));
  //     }
  //   });
  // } else console.log('usercontroller.createuser error - no data recieved');
  // next();
  //};

//USER VERIFICATION - STANDARD (no OAuth)
//success - next()
//fail - sends res.data message obj, return out

userController.verifyLogin = async (req, res, next) => {
  console.log('KEF IN verifyLogin middleware', req.body.email);
  try {
  //find by username
  const findQuery = 'SELECT * FROM users WHERE email = $1';
  const results = await db.query(findQuery, [req.body.email]);

  if(results.rows.length != 1) {
    console.log('NO SUCH USER');
    return res.send({ message: 'user not found' });
  } else {
   // console.log("vu pw: ", results.rows[0].password);
   bcrypt.compare(req.body.password, results.rows[0].password, (error, match) => {
      // login fail
      if (error) res.status(500).json(error);
      // login success
     else 
      if (match) {
        //console.log('SAM IS A NUDGE');
        res.locals.userEmail = req.body.email;
        return next();
      }
      //login fail (incorrect pw)
      else return res.send({ message: 'incorrect PW' });
      //what happens here???
   });
  }
} catch (e) {
  console.log('VerifyUser Error: ', e);
}
  
  
  
  // User.findOne({ email: req.body.email })
  //   .then((user) => {
  //     //if none found, return error
  //     if (!user) return res.send({ message: 'user not found' });
  //     //if user found, compare passwords
  //     else {
  //       bcrypt.compare(req.body.password, user.password, (error, match) => {
  //         //handle weird errors
  //         if (error) res.status(500).json(error);
  //         //login success
  //         else if (match) {
  //           next();
  //         }
  //         //login fail (incorrect pw)
  //         else return res.send({ message: 'incorrect PW' });
  //         //what happens here???
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     res.status(500).json(error);
  //   });
};

module.exports = userController;
