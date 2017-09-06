var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require 路由文件，可以看routes里面的文件怎么写的，也很简单
var index = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var signup=require('./routes/signup');
var forgetpw=require('./routes/forgetpw');

var app = express();

// view engine setup 设置解析jade模版的引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public  基本设置
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 这个是用路由
app.use('/', index);
app.use('/users', users);
app.use('/signin', signin);
app.use('/signup',signup);
app.use('/forget_password',forgetpw);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
