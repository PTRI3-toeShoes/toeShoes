const express = require('express');
const middlewares = require('../controllers/properties');
const router = express.Router();

router.get('/:zpid', 
middlewares.getTargetForSale,
(req, res)=>{
    return res.status(200).send(res.locals.targetForSale);``
});

module.exports = router;