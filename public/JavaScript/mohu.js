let selectJobsBy = require('./selectJobs.js')

//提取搜索词
function resolve(str) {
    words = str.trim().split(' ');
    words = words.filter(function (word) { return word !== '' });
    words = words.map(function (word) { return word = `%${word}%` });
    return words;
}


//输出搜索结果
function showJobs(rows) {
    let jobList = [];//存查询到的记录
    for (var i = 0, usr; usr = rows[i++];) {
        url = '';
        let job = new Job(usr.position, usr.workplace, usr.nature, usr.company, url);
        jobList.push(job);
    }
    showHtml(jobList);//在页面中输出
}

//模糊搜索主程序
function mohuSelect(str) {
    let words = resolve(str);
    et url = `select * from jobs where (`;
    for (let i = 0; i < words.length; i++) {
        url += `title like '${words[i]}' OR workplace like '${words[i]}' OR jobdesc like '${words[i]}'`;
        if (words[i + 1]) {
            url += ' OR ';
        }
    }
    url += `) AND publish='1';`;
    console.log(url);
    selectJobsBy(url);

}

//测试
//let str = '一 武汉 描述';
//mohuSelect(str)
