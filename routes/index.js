var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Job' }); //render 一个jade文件
});

module.exports = router;
