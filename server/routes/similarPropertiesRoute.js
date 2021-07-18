const express = require('express');
const middlewares = require('../controllers/properties');
const router = express.Router();

router.post('/', 
  [middlewares.getComparableProperties], 
  (req, res) => {
    // console.log('res.locals in the getSimilarProperties Route: ', res.locals);
    // console.log('req.body in the getSimilarProperties Route: ', req.body);
    return res.status(200).send({ 
      grabSimilarProperties: true,
      similarProperties: res.locals.similarProperties
     });
  }
);

module.exports = router;