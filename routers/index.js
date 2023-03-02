/**
 * 路由索引
 */

const express = require('express');
const router = express.Router();

const rootRouter = require('./root');
const authRouter = require('./auth');
const manageRouter = require('./manage');

router.use('/', rootRouter);
router.use('/auth', authRouter);
router.use('/manage', manageRouter);

module.exports = router;