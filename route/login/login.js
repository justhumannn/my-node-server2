const express = require('express');
const router = express.Router();
const loginMid = require('./login.controller.js')

router.get('/login',loginMid.loginGetMid)
router.get('/logined/main',loginMid.loginedMainGetMid)
router.post('/login',loginMid.loginPostMid)
router.post('/logout',loginMid.logoutPostMid)

module.exports = router