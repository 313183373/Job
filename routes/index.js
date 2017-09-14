let express = require('express');
let router = express.Router();

let Job = require('../model/user').Job;
let User=require('../model/user').User;

/* GET home page. */
router.get('/', function (req, res, next) {
    let result;
    (async ()=>{
        result=await Job.findAll();
        res.render('index', {job_list:result}); //render 一个jade文件
    })();
});

module.exports = router;
