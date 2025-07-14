const express = require('express');
const router = express.Router();
const chatMid = require('./chat.controller.js');

router.get('/chat',chatMid.chatGetMid)

module.exports = router