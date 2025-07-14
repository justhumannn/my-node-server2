const db = require('../../db/db.js')

exports.loginGetMid = (req,res) => {
    res.render('login/login.html')
}

exports.loginPostMid = (req,res) => {
    const {username,pw} = req.body;
    db.query(`select * from users where username = '${username}'`, (error,result) => {
        if (error) return console.log(error);
        if (result.length) {
            if (result[0].password === pw){
                console.log('login success');
                req.session.user = result[0]
                req.session.is_logined = true
                res.redirect('./logined/main')
            }else {
                console.log('login failed');
                res.redirect('/')
            }
        } else {
            console.log('login failed');
            res.redirect('/')
        }
    })
}

exports.logoutPostMid = (req,res) => {
    req.session.is_logined = false
    res.redirect('/')
}

exports.loginedMainGetMid = (req,res) => {
    const {user} = req.session
    res.render('logined_main.html',{user})
}