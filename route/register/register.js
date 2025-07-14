const express = require('express');
const router = express.Router();
const registerMid = require('./register.controller.js')

router.get('/register',registerMid.registerGetMid);
router.post('/register',registerMid.registerPostMid);

module.exports = router