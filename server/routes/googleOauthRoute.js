const express = require('express');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const googleOauthController = require('../controllers/googleOauthController');
const router = express.Router();


router.post('/', [
    googleOauthController.googleLogin,
    cookieController.setSSIDCookie,
    sessionController.startSession],
    (req, res) => {
        console.log('res in the googleOauth Route: ', res);
        res.status(200).send({ isLoggedIn: true })
    }
);

module.exports = router;