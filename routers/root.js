/**
 * 根路由
 * path: /
 */

const express = require('express');
const router = express.Router();

// 中间件
const statMid = require('../middlewares/stat');

// 主控制器
const mainCtrl = require('../controllers/main');

// 开发控制器
const devCtrl = require('../controllers/dev');

// 其他控制器
const othersCtrl = require('../controllers/others');

// bing壁纸
router.get('/bing', othersCtrl.getBingWallpaper);

// 开发测试
router.get('/devTest', devCtrl.devTest);

// 搜索学校
router.get('/searchSchool', mainCtrl.searchSchool);

// 搜索店铺
router.get('/searchShop', mainCtrl.searchShop);

// 抽卡！
router.get('/get/:type', statMid.apiStat, mainCtrl.getRandomItems);

module.exports = router;