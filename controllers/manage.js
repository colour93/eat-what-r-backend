/**
 * 管理控制器
 */

const $ = require('../utils/res');
const $$ = require('../utils/fn');

const School = require('../schemas/School');
const Shop = require('../schemas/Shop');
const Admin = require('../schemas/Admin');
const Stat = require('../schemas/Stat');

module.exports = {

    async getOverviewStats(req, res, next) {

        // 初始化变量
        let schoolCount, shopCount, apiTodayCount, apiTotalCount, date;

        // 生成日期数字串
        date = $$.getDateNumber();

        // 获取学校总数
        schoolCount = await School.count();

        // 获取店铺总数
        shopCount = await Shop.count();

        // 获取当日API调用量
        apiTodayCount = await Stat.findOne({ date })
            .then((result) => {
                if (!result) {
                    return 0;
                }
                return result.count;
            });

        // 获取全部API调用量
        apiTotalCount = await Stat.findOne({ type: 'total' })
            .then((result) => {
                if (!result) {
                    return 0;
                }
                return result.count;
            });

        $.ok(res, {
            schoolCount,
            shopCount,
            apiTodayCount,
            apiTotalCount
        })

    },

    async addSchool(req, res, next) {

        // 初始化变量
        let schoolId;

        // 赋值
        let { schoolName, keywords } = req.body;

        // 判断入参
        if (!schoolName || !keywords) {
            $.missingParam(res);
            return;
        }

        // 格式化变量 关键字
        keywords = keywords.split(',');

        // 插入文档
        lastDoc = await School.aggregate([{ "$sort": { "schoolId": -1 } }, { "$limit": 1 }]);

        // 判断以前有没有文档
        if (!lastDoc.length) {
            schoolId = 1
        } else {
            schoolId = lastDoc[0].schoolId + 1;
        };


        try {
            result = await School.create({
                schoolId,
                schoolName,
                keywords
            })
        } catch (err) {
            switch (err.code) {

                // unique 问题
                case 11000:
                    $.exist(res);
                    return;

                // 其他问题
                default:
                    $.fetalError(res);
                    console.log(err);
                    return;
            }
        }

        $.ok(res, result);
        console.log(`School 新增 ${result.schoolId} : ${result.schoolName}`);
    },

    async getSchoolList(req, res, next) {
        let result;
        result = await School.find({}, { _id: 0, __v: 0 });
        $.ok(res, { data: result });
    },

    async deleteSchool(req, res, next) {

        let result;

        let { schoolId } = req.body;
        schoolId = parseInt(schoolId);
        if (isNaN(schoolId)) {
            $.missingParam(res);
            return;
        };

        result = await School.deleteOne({ schoolId });
        if (!result.deletedCount) {
            $.notFound(res, "学校不存在");
            return;
        };
        $.ok(res);
    },

    async addShop(req, res, next) {

        let { shopName, schoolId, tag, delivery } = req.body;
        let schoolInfo;
        schoolId = parseInt(schoolId);
        delivery = parseInt(delivery);

        // 判断入参
        if (!shopName || isNaN(schoolId) || !tag || isNaN(delivery)) {
            $.missingParam(res);
            return;
        };

        // 格式化变量 关键字
        tag = tag.split(',');

        // 获取学校名称
        schoolInfo = await School.findOne({ schoolId });
        if (!schoolInfo) {
            $.notFound(res, "学校不存在");
            return;
        };
        console.log(schoolInfo);

        // 插入文档
        lastDoc = await Shop.aggregate([
            { "$match": { "schoolId": schoolId } },
            { "$sort": { "shopId": -1 } },
            { "$limit": 1 }
        ])

        // 判断以前有没有文档
        if (!lastDoc.length) {
            shopId = schoolId * 10000 + 1
        } else {
            shopId = lastDoc[0].shopId + 1;
        };

        console.log(shopId)
        let { schoolName } = schoolInfo;
        try {
            result = await Shop.create({
                shopName,
                shopId,
                schoolId,
                schoolName,
                tag,
                delivery
            })
        } catch (err) {
            switch (err.code) {

                // unique 问题
                case 11000:
                    console.log(err)
                    $.exist(res);
                    return;

                // 其他问题
                default:
                    $.fetalError(res);
                    console.log(err);
                    return;
            }
        }

        $.ok(res, result);
        console.log(`Shop 新增 ${result.shopId} : ${result.shopName}`);

    },

    async getShopList(req, res, next) {

        let result, school;

        let { schoolId } = req.query;

        schoolId = parseInt(schoolId);

        if (isNaN(schoolId)) {
            $.missingParam(res);
            return;
        };

        school = await School.findOne({ schoolId }, { _id: 0, __v: 0 });

        if (!school) {
            $.notFound(res);
            return;
        }

        result = await Shop.find({ schoolId }, { _id: 0, __v: 0, food: 0, drink: 0, schoolId: 0, schoolName: 0 });

        $.ok(res, {
            school,
            data: result
        });
    },

    async deleteShop(req, res, next) {

        let result;

        let { shopId } = req.body;
        shopId = parseInt(shopId);
        if (isNaN(shopId)) {
            $.missingParam(res);
            return;
        };

        result = await Shop.deleteOne({ shopId });
        if (!result.deletedCount) {
            $.notFound(res, "店铺不存在");
            return;
        };
        $.ok(res);
    },

    async addItem(req, res, next) {

        let { itemName, price, shopId, type } = req.body;
        let priceNull, itemId, temp, newType;
        shopId = parseInt(shopId);
        if (!price) {
            priceNull = true;
        }
        price = parseFloat(price);

        // 判断入参
        if (!itemName || isNaN(shopId) || (isNaN(price) && !priceNull) || !type || (type != 'food' && type != 'drink')) {
            $.missingParam(res);
            return;
        };
        if (priceNull) {
            price = null;
        }

        // 判断是否存在店铺id
        result = await Shop.findOne({ shopId });
        if (!result) {
            $.notFound(res, "店铺不存在");
            return;
        }

        // 生成时间戳
        let ts = new Date().getTime();

        // 计算shopId
        if (type == 'food') {
            count = result.food.length;
            itemId = (shopId * 100000) + 10000 + (count + 1);
        } else {
            count = result.drink.length;
            itemId = (shopId * 100000) + 20000 + (count + 1);
        }

        // 插入文档
        try {
            if (type == 'food') {
                ctrlResult = await Shop.findOneAndUpdate({ shopId }, {
                    $addToSet: {
                        food: {
                            itemName,
                            itemId,
                            price,
                            ts
                        }
                    }
                }, { new: true })
                temp = ctrlResult.food.filter((p) => {
                    return p.ts === ts;
                });
                temp = temp[0];
                newType = "食品";
            } else {
                ctrlResult = await Shop.findOneAndUpdate({ shopId }, {
                    $addToSet: {
                        drink: {
                            itemName,
                            itemId,
                            price,
                            ts
                        }
                    }
                }, { new: true })
                temp = ctrlResult.drink.filter((p) => {
                    return p.ts === ts;
                });
                temp = temp[0];
                newType = "饮品";
            }
        } catch (err) {
            switch (err.code) {

                // unique 问题
                case 11000:
                    // console.log(err)
                    $.exist(res);
                    return;

                // 其他问题
                default:
                    $.fetalError(res);
                    console.log(err);
                    return;
            }
        }
        result = {
            shopName: ctrlResult.shopName,
            shopId: ctrlResult.shopId,
            schoolName: ctrlResult.schoolName,
            schoolId: ctrlResult.schoolId,
            tag: ctrlResult.tag,
            delivery: ctrlResult.delivery,
            new: temp,
            newType
        }

        $.ok(res, result);
        console.log(`Shop - Item 新增 ${result.shopName}[${result.shopId}]`);
    },

    async getItemList(req, res, next) {

        let { shopId } = req.query;
        shopId = parseInt(shopId);
        if (isNaN(shopId)) {
            $.missingParam(res);
            return;
        };

        let result;
        result = await Shop.findOne({ shopId }, { _id: 0, __v: 0 });
        if (!result) {
            $.notFound(res, '店铺不存在');
            return;
        };

        const school = {
            schoolId: result.schoolId,
            schoolName: result.schoolName
        }

        const shop = {
            shopId: result.shopId,
            shopName: result.shopName
        }

        let data = [];

        result.food.forEach(e => {
            data.push({
                itemId: e.itemId,
                itemName: e.itemName,
                price: e.price,
                type: 'food'
            })
        })

        result.drink.forEach(e => {
            data.push({
                itemId: e.itemId,
                itemName: e.itemName,
                price: e.price,
                type: 'drink'
            })
        })

        $.ok(res, {
            school,
            shop,
            data
        });
    },

    async deleteItem(req, res, next) {

        let result;

        let { itemId } = req.body;
        let shopId, typeId;
        itemId = parseInt(itemId);
        if (isNaN(itemId)) {
            $.missingParam(res);
            return;
        };

        shopId = parseInt(itemId.toString().substring(itemId.toString().length - 5, 0));

        console.log(shopId);

        // result = await Shop.updateOne({shopId}, {
        //     $pull: {

        //     }
        // });
        // if (!result.deletedCount) {
        //     $.notFound(res, "店铺不存在");
        //     return;
        // };
        $.ok(res);
    },

    async addAdmin(req, res, next) {

        let { user, pwd } = req.body;

        if (!user || !pwd) {
            $.missingParam(res);
            return;
        }

        ts = new Date().getTime();

        try {

            result = await Admin.create({
                user, pwd, ts
            })

        } catch (err) {

            switch (err.code) {

                // unique 问题
                case 11000:
                    $.exist(res);
                    return;

                // 其他问题
                default:
                    $.fetalError(res);
                    console.log(err);
                    return;
            }
        }


        $.ok(res, result);
    }

}