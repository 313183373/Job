//输出搜索结果
function showJobs(rows) {  
    for (var i = 0, usr; usr = rows[i++];) {
        console.log(usr.title);  
    }
}

//筛选
function selectJobsBy(url) {
    // 1.连接数据库
    let mysql = require('mysql');

    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'jbdb',
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
        showJobs(rows);//将查询到的记录在页面中展示
        console.log('\n');
    });

    //3.关闭数据库
    connection.end();
}

module.exports = selectJobsBy;