const express = require('express');
const favsController = require('../controllers/favsController');
const router = express.Router();

router.get('/', favsController.getFavs, (req, res) => {
  return res.status(209).send(res.locals.favsArr);
});

module.exports = router;
