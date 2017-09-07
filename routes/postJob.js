var express = require('express');
var router = express.Router();

/* GET Post Job page. */
router.get('/', function(req, res, next) {
    res.render('postJob');
});

module.exports = router;