let express = require('express');
let router = express.Router();
let DB = require('../model/user.js');
let User = DB.User;
let Job = DB.Job;

let user_list;
let job_list;
router.get('/', function (req, res) {
    (async () => {
        user_list = await User.findAll();
        job_list = await Job.findAll();
        res.render('backend',{user_list,job_list});
    })();
});

router.get('/users',function (req,res) {
    (async ()=>{
        user_list = await User.findAll();
        res.render('backend_users',{user_list});
    })();
});

router.get('/jobs',function (req, res) {
    (async ()=>{
        job_list = await Job.findAll();
        res.render('backend_jobs',{job_list});
    })();});


router.post('/get_user_number', function (req, res) {
    (async () => {
        let user_list = await User.findAll();
        console.log(user_list.length);
        res.end(user_list.length.toString());
    })();
});

module.exports = router;