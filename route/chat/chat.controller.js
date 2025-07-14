exports.chatGetMid = (req,res) => {
    const username = req.session.user;
    console.log(username);
    const is_login = req.session.is_logined
    if (is_login === true) res.render('chat/chat.html',{username});
    else res.redirect('/')
}