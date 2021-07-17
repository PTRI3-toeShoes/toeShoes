const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController');
//note - signup is all lowercase

router.post(
  '/',
  [
    userController.createUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
  ],
  (req, res) => {
    return res.status(209).send({ isLoggedIn: true });
  }
);

module.exports = router;
