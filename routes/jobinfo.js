let express = require('express');
let router = express.Router();

let Job=require('../model/user').Job;

router.get('/', function (req, res, next) {
    res.render('jobinfo');
});

module.exports = router;