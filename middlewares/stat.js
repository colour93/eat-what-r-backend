/**
 * 统计 中间件
 */

const $$ = require('../utils/res');

const Stat = require('../schemas/Stat');

module.exports = {
    async apiStat (req, res, next) {

        let oldToday, newToday, date, oldTotal, newTotal;

        // 生成日期串
        date = $$.getDateNumber();
    
        oldToday = await Stat.findOne({date});
        oldTotal = await Stat.findOne({type: 'total'});
    
        if (!oldToday) {
            // 如果为当天第一次
            newToday = await Stat.findOneAndUpdate({date}, {
                date,
                count: 1,
                type: 'day'
            }, {
                upsert: true
            })
        } else {
            // 如果不是第一次
            newToday = await Stat.findOneAndUpdate({date}, {
                date,
                count: oldToday.count + 1
            })
        }
    
        if (!oldTotal) {
            // 如果为总数第一次
            newTotal = await Stat.findOneAndUpdate({type: 'total'}, {
                count: 1,
                type: 'total'
            }, {
                upsert: true
            })
        } else {
            // 如果不是第一次
            newTotal = await Stat.findOneAndUpdate({type: 'total'}, {
                count: oldTotal.count + 1
            })
        }
    
        next();

    }
}