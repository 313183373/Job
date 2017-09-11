let express = require('express');

let router = express.Router();

const nodemailer = require('nodemailer');

const User = require('../model/user');

/*GET SIGN UP*/
router.get('/', function (req, res) {
    res.render('signup');
});

router.post('/send_email', function (req, res) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        host: 'smtp.exmail.qq.com',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: 'xx313183373@mails.ccnu.edu.cn',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'Ccnu13198547'
        }
    });

    let to = req.body.email;

    const code = Math.floor(Math.random() * 9000) + 1000;

// setup email data with unicode symbols
    let mailOptions = {
        from: '搞事小组<xx313183373@mails.ccnu.edu.cn>', // 发件地址
        to: to, // 收件列表
        subject: '验证码', // 标题
        //text和html两者只支持一种
        //text: code, // 标题
        html: '<b>您的验证码是' + code + '</b>' // html 内容
    };


// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.end(JSON.stringify({code: code}));
        console.log('Message sent: ' + info.response);
    });
});

// 插入数据库数据
router.post('/check', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    (async () => {
        let result = await User.findAll({
            where: {
                email: email,
            }
        });
        if (result.length > 0) {
            res.send('邮箱已经被注册!');
        } else {
            await User.create({
                email: email,
                password: password
            });
            res.redirect('/');
        }
    })();
});

module.exports = router;