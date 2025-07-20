const express = require('express');
const router = express.Router();
const boardMid = require('./board.controller.js');

router.get('/board/write',boardMid.boardWriteGetMid);
router.get('/board/list',boardMid.boardListGetMid);
router.get('/board/content/:id', boardMid.boardContentGetMid);
router.get('/board/edit/:id',boardMid.boardEditIdGetMid)
router.post('/board/create',boardMid.boardCreatePostMid);
router.post('/board/delete',boardMid.boardDeletePostMid);
router.post('/board/edit',boardMid.boardEditPostMid);
router.post('/board/delete',boardMid.boardDeletePostMid);
router.post('/board/like/:id',boardMid.boardLikeIdPostMid);

module.exports = router