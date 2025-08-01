const db = require('../../db/db.js')

exports.voteGetMid = (req, res) => {
    db.query('select * from vote', (error, result) => {
        if (error) return console.log(error)
        res.render('vote/vote.html', {postList:result})
    })
}
exports.voteCreateGetMid = (req, res) => {
    res.render('vote/vote_write.html')
}

exports.voteCreatePostMid = (req,res) => {
    const {username} = req.session.user
    const vote_count = []
    for (let i = 0; i < req.body.poll_option.length; i++) {
        vote_count.push([req.body.poll_option[i],0])
    }
    db.query(
        'insert into vote(title,vote_content,vote_user,author) values (?,?,?,?)',
        [req.body.title,JSON.stringify(vote_count),JSON.stringify([]),username],
        (error,result) => {
            if (error) return console.log(error);
            console.log('저장완료');
            res.redirect('/vote');
        }
    )
}
exports.voteContentIdGetMid = (req, res) => {
    const id = Number(req.params.id)
    db.query ('select * from vote where id = ?',[id], (error,result) => {
        if (error) return console.log(error)
        let votes = result[0]
        votes.vote_content = JSON.parse(votes.vote_content);
        res.render('vote/vote_content.html',{votes})
    })
}
exports.voteContentVoteGetMid = (req, res) => {
    const id = Number(req.params.id);
    const content = req.params.content;
    const { username } = req.session.user;

    db.query('SELECT * FROM vote WHERE id = ?', [id], (error, results) => {
        if (error) return console.error(error);
        if (results.length === 0) return res.status(404).send('게시글이 없습니다.');

        const vote = results[0];

        // JSON 파싱
        let voteContent = Array.isArray(vote.vote_content) ? vote.vote_content : JSON.parse(vote.vote_content || '[]');
        let votedUsers = Array.isArray(vote.vote_user) ? vote.vote_user : JSON.parse(vote.vote_user || '[]');

        // 이 유저가 이전에 투표한 항목 찾기
        let previousVote = null;
        votedUsers.forEach(u => {
            if (u.startsWith(username + ":")) {
                previousVote = u.split(":")[1];
            }
        });

        // 1️⃣ 이전 투표가 있으면 해당 항목 -1
        if (previousVote) {
            voteContent = voteContent.map(([option, count]) => {
                if (option === previousVote) {
                    return [option, Math.max(0, count - 1)];
                }
                return [option, count];
            });
            // 이전 기록 제거
            votedUsers = votedUsers.filter(u => !u.startsWith(username + ":"));
        }

        // 2️⃣ 같은 항목을 다시 클릭하면 취소만 하고 종료
        if (previousVote === content) {
            return db.query(
                'UPDATE vote SET vote_content = ?, vote_user = ? WHERE id = ?',
                [JSON.stringify(voteContent), JSON.stringify(votedUsers), id],
                (updateError) => {
                    if (updateError) return console.error(updateError);
                    res.redirect(`/vote/content/${id}`);
                }
            );
        }

        // 3️⃣ 새로운 항목에 +1
        voteContent = voteContent.map(([option, count]) => {
            if (option === content) {
                return [option, count + 1];
            }
            return [option, count];
        });

        votedUsers.push(`${username}:${content}`);

        // DB 업데이트
        db.query(
            'UPDATE vote SET vote_content = ?, vote_user = ? WHERE id = ?',
            [JSON.stringify(voteContent), JSON.stringify(votedUsers), id],
            (updateError) => {
                if (updateError) return console.error(updateError);
                res.redirect(`/vote/content/${id}`);
            }
        );
    });
};
