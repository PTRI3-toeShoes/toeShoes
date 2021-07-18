const db = require('../models/dbModel');

const favsController = {};

favsController.addFavs = (req, res, next) => {

  const queryString = `INSERT INTO favorites (zpid, user_id) VALUES ($1, $2)`;
  db.query(queryString, [req.body.favorite.ZPID, req.cookies.ssid])
    .then(() => next())
    .catch((err) => console.log('favscontroller.addfavs error, ', err.message));
};

favsController.getFavs = (req, res, next) => {
    const queryString = `SELECT zpid FROM favorites WHERE user_id = $1`;

    db.query(queryString, [req.cookies.ssid])
      .then((data) => {
        res.locals.favsArr = data.rows; 
      })
      .then(() => next())
      .catch((err) => console.log('favscontroller.getFavs error, ', err));
};

favsController.deleteFav =  (req, res, next) =>{
    console.log('zpid to delete on backend', req.body.zpid);

    const queryString = `DELETE FROM favorites WHERE (user_id = $1 AND zpid = $2);`

    db.query(queryString, [req.cookies.ssid, req.body.zpid])
      .then(() => next())
      .catch ((err) => console.log('deleteFav error ', err))
};

module.exports = favsController;
