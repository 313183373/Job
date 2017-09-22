let express = require('express');
let router = express.Router();

let Job=require('../model/user').Job;

router.get('/', function (req, res, next) {
    let jid=req.query.id;
    (async ()=>{
        let job=await Job.findAll({
            where:{
                jid:jid
            }
        });
        job=job[0];
        res.render('jobinfo',{job_info:job});
    })();
});


module.exports = router;