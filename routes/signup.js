let express=require('express');

let router=express.Router();

/*GET SIGN UP*/
router.get('/',function (req, res) {
    res.render('signup');
});

module.exports=router;