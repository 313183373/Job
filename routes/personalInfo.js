let express = require('express');
let router = express.Router();

let User = require('../model/user').User;

/*GET PERSONAL INFOMATION PAGE*/
router.get('/', function (req, res) {
    res.render('personalInfo');
});

router.post('/get_info',function (req, res) {
    (async ()=> {
        let eid = req.body.email;
        let result=await User.findAll({
            where: {
                eid: eid
            }
        });
        res.end(JSON.stringify({
            password:result[0].dataValues.password,
            cname:result[0].dataValues.cname||'',
            cadd:result[0].dataValues.cadd||'',
            cpro:result[0].dataValues.cpro||''
        }));
    })();
});

module.exports = router;