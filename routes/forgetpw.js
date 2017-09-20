let express = require('express');
let router = express.Router();

let User=require('../model/user').User;


/*GET FORGET PASSWORD PAGE*/
router.get('/', function (req, res) {
    res.render('forgetpw');
});

router.post('/check',function (req, res) {
    let email=req.body.email;
    (async ()=>{
        let user=await User.findAll({
            where:{
                eid:email
            }
        });

        if(user.length>0){
            let result=await User.update({
                password:req.body.pw
            },{
                where:{
                    eid:email
                }
            });
            if(result.length>0){
                res.end('ok');
            }else{
                res.end('error');
            }
        }else{
            res.end('邮箱没有注册');
        }
    })();
});

module.exports = router;