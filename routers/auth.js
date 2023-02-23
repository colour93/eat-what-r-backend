/**
 * 登录态路由
 * path: /auth
 */

const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

const authMid = require('../middlewares/auth');

router.post('/login', authCtrl.login);

router.get('/logout', authMid, authCtrl.logout);

module.exports = router;