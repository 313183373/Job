let express = require('express');
let router = express.Router();

let Job = require('../model/user').Job;
let User=require('../model/user').User;

/* GET home page. */
router.get('/', function (req, res, next) {
    let result;
    let position=req.query.position;
    let nature=req.query.nature;
    if(!position&&!nature){
        (async ()=>{
            result=await Job.findAll({
                where:{
                    publish:'1',
                }
            });
            res.render('index', {job_list:result}); //render 一个jade文件
        })();
    }else if(!position&&nature){
        (async ()=>{
            result=await Job.findAll({
                where:{
                    publish:'1',
                    nature:nature
                }
            });
            res.render('index', {job_list:result}); //render 一个jade文件
        })();
    }else if(!nature&&position){
        (async ()=>{
            result=await Job.findAll({
                where:{
                    publish:'1',
                    position:position
                }
            });
            res.render('index', {job_list:result}); //render 一个jade文件
        })();
    }else{
        (async ()=>{
            result=await Job.findAll({
                where:{
                    publish:'1',
                    position:position,
                    nature:nature
                }
            });
            res.render('index', {job_list:result}); //render 一个jade文件
        })();
    }
});

module.exports = router;
