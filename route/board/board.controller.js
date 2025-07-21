const db = require('../../db/db.js')

exports.boardListGetMid = (req, res) => {
    const is_login = req.session.is_logined
    if (is_login === true){
        db.query(`select * from board`, (error, result)=> {
            if (error) return console.log(error);
            res.render('board/content_list.html', {postList:result})
        })
    }
    else res.redirect('/')
}
exports.boardWriteGetMid = (req,res) => {
    const is_login = req.session.is_logined
    if (is_login === true) res.render('board/content_write.html')
    else res.redirect('/')
}

exports.boardEditIdGetMid = (req,res) => {
    const username = req.session.user.username
    const id = Number(req.params.id);
    db.query('select * from board where id = ?', [id],(error,result) => {
        if (username === result[0].author) {
            db.query('select * from board where id = ?',[id], (error,result) => {
                if (error) return console.log(error);
                res.render('board/board_edit.html',{udtPost:result[0]})
            })
        }
    })
}

exports.boardCreatePostMid = (req,res) => {
    const {username} = req.session.user
    db.query(
        'insert into board(subject,content,author,likes,liked_users) values (?,?,?,?,?)',
        [req.body.subject,req.body.content,username,0,JSON.stringify([])],
        (error,result) => {
            if (error) return console.log(error);
            console.log('저장완료');
            res.redirect('/board/list');
        }
    )
}

exports.boardEditPostMid = (req,res) => {
    const subject = req.body.subject;
    const content = req.body.content;
    const id = Number(req.body.id)
    db.query (
        'update board set subject = ? ,content = ? where id = ?',[subject,content,id],
        (error,result) => {
            if (error) console.log(error);
            res.redirect('/board/list')
        }
    )
}

exports.boardContentGetMid = (req,res) => {
    const id = Number(req.params.id)
    db.query ('select * from board where id = ?',[id], (error,result) => {
        if (error) return console.log(error)
        res.render('board/board_content.html',{post:result[0]})
    })
}

exports.boardDeletePostMid = (req,res) => {
    const {username} = req.session.user
    const id = Number(req.body.id);
    db.query('select * from board where id = ?',[id], (error,result) => {
        if (username === result[0].author) {
            db.query('delete from board where id = ?',[id], (error,result) => {
                if (error) return console.log(error);
                res.redirect('/board/list');
            })
        }
    })
}

exports.boardLikeIdPostMid = (req,res) => {
    const id = Number(req.params.id)
    const {username} = req.session.user
    db.query ('select * from board where id = ?',[id], (error,results) => {
        if (error) return console.log(error);
        if (results.length === 0) return res.status(404).send('게시글이 없습니다.');
        const board = results[0];
        let likedUsers = [];
        try {
            likedUsers = JSON.parse(board.liked_users || '[]');
        } catch (e) {
            console.error("liked_users JSON 파싱 오류:", e);
        }

        const alreadyLiked = likedUsers.includes(username);
        const newLikes = alreadyLiked ? board.likes - 1 : board.likes + 1;

        if (alreadyLiked) {
            likedUsers = likedUsers.filter(u => u !== username);
        } else {
            likedUsers.push(username);
        }

        db.query(
            'UPDATE board SET likes = ?, liked_users = ? WHERE id = ?',
            [newLikes, JSON.stringify(likedUsers), id],
            (updateError) => {
                if (updateError) return console.error(updateError);
                res.redirect(`/board/content/${id}`);
            }
        );
    })
}