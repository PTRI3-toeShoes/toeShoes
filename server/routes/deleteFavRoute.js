const express = require('express');
const favsController = require('../controllers/favsController')
const router = express.Router();

router.delete(
  '/',
  favsController.deleteFav,
  (req, res) => {
    return res.status(209).send('FAV DELETED');
  }
);

module.exports = router;