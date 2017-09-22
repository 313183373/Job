class Job {
    constructor(position, workplace, nature, company, url) {
        this.position = position;//工作职位
        this.workplace = workplace;//工作地
        this.nature = nature;//公司性质
        this.company = company;//公司名称
        this.url = url;//工作详情的链接
    }
}

//代完善，html的输出显示
function showHtml(jobList) {
    console.log(jobList);
}

function showJobs(rows) {
    let jobList = [];//存查询到的记录
    for (var i = 0, usr; usr = rows[i++];) {
        url = '';
        let job = new Job(usr.position, usr.workplace, usr.nature, usr.company, url);
        jobList.push(job);
    }
    showHtml(jobList);//在页面中输出
}

module.exports = showJobs;