const db = require('../../db/db.js')

exports.registerGetMid = (req,res) => {
    res.render('login/register.html')
}

exports.registerPostMid = (req,res) => {
    const {username,pw,pw_check} = req.body;
    if (username.length == 0 || pw.length == 0 || pw_check.length == 0){
        console.log('register failed1')
        res.redirect('/')
    }
    else if (pw != pw_check){
        console.log('register failed')
        res.redirect('/')
    }
    else {
        db.query(`select * from users where username = '${username}'`, (error,result) => {
            if (error) return console.log(error)
            if (result.length == 0){
                db.query(`insert into users (username,password) values
                    ('${username}','${pw}')`, (error, result) => {
                        if (error) return console.log(error)
                        res.redirect('/login')
                })
            } else {
                console.log('register failed2')
                res.redirect('/')
            }
        })
    }
}