let express = require('express');
let router = express.Router();

let User = require('../model/user').User;

/*GET PERSONAL INFOMATION PAGE*/
router.get('/', function (req, res) {
    res.render('personalInfo');
});

router.post('/get_info', function (req, res) {
    (async () => {
        let eid = req.body.email;
        let result = await User.findAll({
            where: {
                eid: eid
            }
        });
        res.end(JSON.stringify({
            password: result[0].dataValues.password,
            cname: result[0].dataValues.cname || '',
            cadd: result[0].dataValues.cadd || '',
            cpro: result[0].dataValues.cpro || ''
        }));
    })();
});


router.post('/change_info', function (req, res) {
    (async () => {
        let email = req.body.email;
        let pw = req.body.pw;
        let cname = req.body.cname;
        let cadd = req.body.cadd;
        let cpro = req.body.cpro;
        let result = await User.update(
            {
                'password':pw,
                'cname':cname,
                'cadd':cadd,
                'cpro':cpro
            },
            {
                'where': {
                    'eid':email
                }
            }
        );
        if(result.length>0){
            res.end('ok');
        }else{
            res.end('error');
        }
    })();
});

module.exports = router;