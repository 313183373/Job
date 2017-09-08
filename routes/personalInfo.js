var express = require('express');
var router = express.Router();

/*GET PERSONAL INFOMATION PAGE*/
router.get('/', function (req, res) {
    res.render('personalInfo');
});

module.exports = router;