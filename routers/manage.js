/**
 * 管理路由
 * path: /manage
 */

const express = require('express');
const router = express.Router();

const manageCtrl = require('../controllers/manage');

const authMid = require('../middlewares/auth');

router.use(authMid);

// 仪表板状态获取
router.get('/overviewStats', manageCtrl.getOverviewStats);

// =========学校管理=========

// 新增学校
router.post('/school/add', manageCtrl.addSchool);

// 获取学校列表
router.get('/school/list', manageCtrl.getSchoolList);

// 删除学校
router.delete('/school/delete', manageCtrl.deleteSchool);

// =========店铺管理=========

// 新增店铺
router.post('/shop/add', manageCtrl.addShop);

// 获取店铺列表
router.get('/shop/list', manageCtrl.getShopList);

// 删除店铺
router.delete('/shop/delete', manageCtrl.deleteShop);

// =========商品管理=========

// 新增商品
router.post('/item/add', manageCtrl.addItem);

// 获取商品列表
router.get('/item/list', manageCtrl.getItemList);

// 删除商品
router.delete('/item/delete', manageCtrl.deleteItem);

// ========管理员管理=========

// 添加管理员
router.post('/admin/add', manageCtrl.addAdmin);

module.exports = router;