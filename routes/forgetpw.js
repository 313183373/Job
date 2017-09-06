let express = require('express');
let router = express.Router();

/*GET FORGET PASSWORD PAGE*/
router.get('/', function (req, res) {
    res.render('forgetpw');
});

module.exports = router;