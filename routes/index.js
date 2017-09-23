let express = require('express');
let router = express.Router();
let mysql =require('mysql');

let Job = require('../model/user').Job;
let User=require('../model/user').User;



/* GET home page. */
router.get('/', function (req, res, next) {
    let result;
    let position=req.query.position;
    let nature=req.query.nature;
    let info=req.query.info;
    if(info){
        console.log(info);
        let jid_list=JSON.parse(info);
        (async ()=>{
            let job_list=await Job.findAll({
                where:{
                    jid:{
                        $in:jid_list
                    }
                }
            });
            res.render('index',{job_list});
        })()
    }else {
        if (!position && !nature) {
            (async () => {
                result = await Job.findAll({
                    where: {
                        publish: '1',
                    }
                });
                res.render('index', {job_list: result}); //render 一个jade文件
            })();
        } else if (!position && nature) {
            (async () => {
                result = await Job.findAll({
                    where: {
                        publish: '1',
                        nature: nature
                    }
                });
                res.render('index', {job_list: result}); //render 一个jade文件
            })();
        } else if (!nature && position) {
            (async () => {
                result = await Job.findAll({
                    where: {
                        publish: '1',
                        position: position
                    }
                });
                res.render('index', {job_list: result}); //render 一个jade文件
            })();
        } else {
            (async () => {
                result = await Job.findAll({
                    where: {
                        publish: '1',
                        position: position,
                        nature: nature
                    }
                });
                res.render('index', {job_list: result}); //render 一个jade文件
            })();
        }
    }
});

router.post('/filter_job_position',function (req, res) {
    (async ()=>{
        let result=await Job.findAll({
            where:{
                position:req.body.position
            }
        });
        res.end(JSON.stringify(result));
    })();
});

router.post('/filter_job_nature',function (req, res) {
    (async ()=>{
        let result=await Job.findAll({
            where:{
                nature:req.body.nature
            }
        });
        res.end(JSON.stringify(result));
    })();
});

//提取搜索词
function resolve(str) {
    let words = str.trim().split(' ');
    words = words.filter(function (word) { return word !== '' });
    words = words.map(function (word) { return word = `%${word}%` });
    return words;
}

router.post('/queryjob',function (req, res) {
    (async ()=>{
        let content=req.body.content;
        let words = resolve(content);
        let url = `select * from jobs where (`;
        for (let i = 0; i < words.length; i++) {
            url += `title like '${words[i]}' OR workplace like '${words[i]}' OR jobdesc like '${words[i]}'`;
            if (words[i + 1]) {
                url += ' OR ';
            }
        }
        url += `) AND publish='1';`;

        let connection = mysql.createConnection({
            host: 'rm-uf666l9f181m30sa1o.mysql.rds.aliyuncs.com',
            user: 'www',
            password: 'www',
            database: 'test',
            port: '3306'
        });

        connection.connect(function (err) {
            if (err) {
                console.log('error connecting:' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });

        //2.查询
        connection.query(url, function (err, rows, fields) {
            if (err) throw err;
            console.log('selected！');
            rows=rows.map((val,index,arr)=>{
                return val.jid;
            });
            res.end(JSON.stringify(rows));
        });

        //3.关闭数据库
        connection.end();
    })();
});

module.exports = router;
