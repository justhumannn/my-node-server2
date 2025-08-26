const express = require('express');
const router = express.Router();
const commentMid = require('./comment.controller.js');

router.post('/board/comment/:id',commentMid.commentCreatePostMid)

module.exports = router