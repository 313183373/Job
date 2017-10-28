let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let DB = require('../model/user.js');
let User = DB.User;
let Job = DB.Job;

let user_list;
let job_list;
router.get('/', function (req, res) {
    (async () => {
        user_list = await User.findAll();
        job_list = await Job.findAll();
        res.render('backend', {user_list, job_list});
    })();
});

router.get('/users', function (req, res) {
    (async () => {
        user_list = await User.findAll();
        res.render('backend_users', {user_list});
    })();
});

router.get('/jobs', function (req, res) {
    (async () => {
        job_list = await Job.findAll();
        res.render('backend_jobs', {job_list});
    })();
});


router.post('/get_user_number', function (req, res) {
    (async () => {
        let user_list = await User.findAll();
        console.log(user_list.length);
        res.end(user_list.length.toString());
    })();
});

router.post('/searchUser', function (req, res) {
    (async () => {
        let text = req.body.text;
        let words = resolve(text);
        let url = 'select * from users where (';
        for (let i = 0; i < words.length; i++) {
            url += `eid like '${words[i]}' OR password like '${words[i]}' OR cname like '${words[i]}' OR cpro like '${words[i]}' OR cadd like '${words[i]}'`;
            if (words[i + 1]) {
                url += ' OR ';
            }
        }
        url += `)`;

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
            // rows=rows.map((val,index,arr)=>{
            //     return val.jid;
            // });
            res.end(JSON.stringify(rows));
        });

        //3.关闭数据库
        connection.end();
    })();
});

function resolve(str) {
    let words = str.trim().split(/\s/);
    words = words.filter(function (word) {
        return word !== ''
    });
    words = words.map(function (word) {
        return word = `%${word}%`
    });
    return words;
}

router.post('/deleteSeletedUser', function (req, res) {
    let list = JSON.parse(req.body.dlist);
    (async () => {
        let result = await User.destroy({
            where:{
                eid:{
                    $in:list
                }
            }
        });
        console.log(result);
        if(result) {
            res.end('ok');
        }else{
            res.end('error');
        }
    })();
});


module.exports = router;