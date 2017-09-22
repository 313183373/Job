var showJobs = require('./show.js');

function selectJobsBy(condition) {
    // 1.连接数据库
    let mysql = require('mysql');

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
    let url;
    let natures = ['志愿', '全职', '兼职', '合同'];
    if (condition === 'all') {
        url = "select * from jobs where publish='1';";
    }
    else if (natures.includes(condition)) {
        url = `select * from jobs where publish='1' and nature='${condition}';`;
    }
    else {
        url = `select * from jobs where publish='1' and position='${condition}';`;
    }
    connection.query(url, function (err, rows, fields) {
        if (err) throw err;

        console.log('select after deleted');
        showJobs(rows);//将查询到的记录在页面中展示
        console.log('\n');
    });

    //3.关闭数据库
    connection.end();
}

selectJobsBy('test');