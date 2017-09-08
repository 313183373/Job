var express = require('express');
var router = express.Router();

// 引入数据表模版
const User=require('../model/user');


/* GET Sign In page. */
router.get('/', function(req, res, next) {
    res.render('signin');
});


router.post('/check',function (req, res, next) {
    User.findAll({
        where:{
            email:req.body.email,
            password:req.body.password
        }
    }).then(function (result) {
        if(result.length>0) {
            console.log('欢迎'+result[0].email);
        }else{
            console.log('账号或者密码错误!');
        }
        res.redirect('/');
    }).catch(function (e) {
        console.error(e);
    })
});
module.exports = router;
