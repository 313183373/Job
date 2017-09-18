let express = require('express');
let router = express.Router();

let Job=require('../model/user').Job;

/* GET Post Job page. */
router.get('/', function(req, res, next) {
    res.render('postJob');
});


router.post('/create_job',function (req, res) {
    let workplace=(req.body.oCountry?req.body.oCountry:'')+(req.body.oCity?req.body.oCity:'')+(req.body.prov?req.body.prov:'')+(req.body.city?req.body.city:'')+(req.body.street?req.body.street:'');
    console.log(workplace);
    (async ()=>{
        let result= await Job.create({
            userEid:req.body.email,
            title:req.body.title,
            company:req.body.company,
            jobdesc:req.body.desc,
            proposal:req.body.apply,
            deadline:req.body.deadline,
            position:req.body.category,
            nature:req.body.type,
            tags:req.body.tags,
            workplace:workplace,
            publish:0
        });
        if(result){
            res.end(JSON.stringify(result));
        }else{
            res.end('error');
        }
    })();
});

module.exports = router;