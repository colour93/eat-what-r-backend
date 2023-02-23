/**
 * 路由索引
 */

const express = require('express');
const router = express.Router();

const rootRouter = require('./root');
const manageRouter = require('./manage');

router.use('/', rootRouter);
router.use('/manage', authMid, manageRouter);

module.exports = router;