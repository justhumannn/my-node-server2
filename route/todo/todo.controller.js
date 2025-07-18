const db = require('../../db/db.js')

exports.mainGetMid = (req,res) => {
    const is_logined = req.session.is_logined
    if (is_logined == true) res.redirect('/logined/main')
    else res.render('main.html')
}

exports.listGetMid = (req, res) => {
    db.query('select * from todo', (error, result)=> {
        if (error) return console.log(error);

        res.render('todo/list.html', {postList:result})
    })
}
exports.writeGetMid = (req,res) => {
    const is_logined = req.session.is_logined
    if (is_logined == true) res.render('todo/write.html')
    else res.redirect('/')
}

exports.eidtIdGetMid = (req,res) => {
    const id = Number(req.params.id);
    db.query('select * from todo where id = ?',[id], (error,result) => {
        if (error) return console.log(error);
        console.log(result)
        res.render('todo/edit.html',{udtPost:result[0]})
    })
}

exports.createPostMid = (req,res) => {
    db.query('insert into todo(todo,dueDate) values (?, ?)',[req.body.todo,req.body.dueDate],
        (error,result) => {
            if (error) return console.log(error);
            console.log('저장완료');
            res.redirect('/list');
        }
    )
}

exports.deletePostMid = (req,res) => {
    db.query('delete from todo where id = ?',[req.body.id], (error,result) => {
        if (error) return console.log(error);
        res.redirect('/list');
    })
}

exports.editPostMid = (req,res) => {
    const todo = req.body.todo;
    const dueDate = req.body.dueDate;
    const id = Number(req.body.id)
    db.query (
        'update todo set todo = ? ,dueDate = ? where id = ?',[todo,dueDate,id],
        (error,result) => {
            if (error) console.log(error);
            res.redirect('/list')
        }
    )
}