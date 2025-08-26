const db = require('../../db/db.js')

exports.commentCreatePostMid = (req,res) => {
    const {username} = req.session.user
    const id = Number(req.params.id);
    console.log(id,username);
    db.query(
        'select * from users where username = ?',
        [username],
        (error,result) => {
            if (error) return console.log(error);
            let user_id = Number(result[0].id);
            db.query(
                'insert into comment (comment,content_id,user_id) values (?,?,?)',
                [req.body.comment,id,user_id],(error,result1) => {
                    if (error) return console.log(2);
                    res.redirect(`/board/content/${id}`);
                }
            )
        }
    )
}
