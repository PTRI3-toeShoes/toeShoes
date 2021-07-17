const express = require('express');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
const googleOauthController = require('../controllers/googleOauthController');
const router = express.Router();


router.post(
  '/',
  [
    userController.verifyLogin,
    cookieController.setSSIDCookie,
    sessionController.startSession,
  ],
  (req, res) => {
    return res.status(209).send({ isLoggedIn: true });
  }
);

module.exports = router;
