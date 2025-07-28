const express = require('express');
const router = express.Router();
const voteMid = require('./vote.controller.js');

router.get('/vote',voteMid.voteGetMid)
router.get('/vote/write',voteMid.voteCreateGetMid)
router.post('/vote/write',voteMid.voteCreatePostMid)
router.get('/vote/content/:id', voteMid.voteContentIdGetMid);
router.get('/vote/:content/:id',voteMid.voteContentVoteGetMid);
module.exports = router