const db = require('../models/dbModel');

const favsController = {};

favsController.addFavs = (req, res, next) => {
  //verify favorite and email are on the request
  // if (!req.body.favorite || !req.cookies.ssid) {
  //   console.log('no favorites found');
  //   return res
  //     .status(501)
  //     .send('favsController.addFavs error: nothing on body');
  // } else {
  // console.log('INSIDE ELSE');
  console.log('SAM in addFavs' , process.env.GOOGLE_CLIENT_KEY);

  console.log('SSID ', req.cookies.ssid);
  //find the user
  // User.findById(req.cookies)

  const queryString = `INSERT INTO favorites (zpid, user_id) VALUES ($1, $2)`;
  db.query(queryString, [req.body.favorite.zpid, req.cookies.ssid])
  // MapModal.js on front end has console log on line 43 that logs req.body.favorite

  // User.findById(req.cookies.ssid)
  //   .then((user) => {
  //     console.log('INSIDE FIND', user);
  //     //grab the existing favs array
  //     const favs = user.favorites;
  //     //push new fav onto it
  //     favs.push(req.body.favorite);
  //     //set the new favs array to the user favorites
  //     user.favorites = favs;
  //     //save it
  //     user.save();
  //   })
    .then(() => next())
    .catch((err) => console.log('favscontroller.addfavs error, ', err.message));
  // }
};

favsController.getFavs = (req, res, next) => {
  //verify email is on the request
  // console.log('in get favs');
  // if (!req.cookies.ssid) {
  //   return res
  //     .status(500)
  //     .send('favsController.getFavs error: no cookies line 40');
  // } else {
    //let favsArr;

    const queryString = `SELECT zpid FROM favorites WHERE user_id = $1`;


    db.query(queryString, [req.cookies.ssid])
      .then((data) => {
        //console.log(user);
        res.locals.favsArr = data.rows; //user.favorites;
      })
      .then(() => next())
      .catch((err) => console.log('favscontroller.getFavs error, ', err));
  // }
};

favsController.deleteFav =  (req, res, next) =>{
    console.log('zpid to delete on backend', req.body.zpid);

    const queryString = `DELETE FROM favorites WHERE (user_id = $1 AND zpid = $2);`

    db.query(queryString, [req.cookies.ssid, req.body.zpid])
      .then(() => next())
      .catch ((err) => console.log('deleteFav error ', err))


};

module.exports = favsController;
