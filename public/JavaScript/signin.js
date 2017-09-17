function chk_email(email) {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(email);
}

function chk_password(pw) {
    if(pw===''||pw.length<8||pw.length>20){
        return false;
    }
    let reg1=/^[0-9A-Za-z]+$/;
    if(!reg1.test(pw)){
        return false;
    }
    let reg2=/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/;
    return reg2.test(pw);
}