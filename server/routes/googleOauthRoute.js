const express = require('express');
const googleOauthController = require('../controllers/googleOauthController');
const router = express.Router();


router.post('/', googleOauthController.googleLogin);

module.exports = router;