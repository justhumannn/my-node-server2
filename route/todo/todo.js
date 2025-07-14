const express = require('express');
const router = express.Router();
const todoMid = require('./todo.controller.js');

router.get('/',todoMid.mainGetMid)
router.get('/write',todoMid.writeGetMid);
router.get('/list',todoMid.listGetMid);
router.get('/edit/:id', todoMid.eidtIdGetMid);
router.post('/create',todoMid.createPostMid);
router.post('/delete',todoMid.deletePostMid);
router.post('/edit',todoMid.editPostMid);

module.exports = router