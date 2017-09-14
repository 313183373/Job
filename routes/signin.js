var express = require('express');
var router = express.Router();

// 引入数据表模版
const User=require('../model/user').User;


/* GET Sign In page. */
router.get('/', function(req, res, next) {
    res.render('signin');
});


router.post('/check',function (req, res, next) {
    User.findAll({
        where:{
            eid:req.body.email,
            password:req.body.password
        }
    }).then(function (result) {
        if(result.length>0) {
            console.log('欢迎'+result[0].eid);
            res.send('欢迎');
        }else{
            res.send('账号或密码错误!');
        }
    }).catch(function (e) {
        console.error(e);
    })
});
module.exports = router;
