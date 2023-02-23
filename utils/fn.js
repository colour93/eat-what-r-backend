/**
 * 杂七杂八函数
 */

const crypto = require('crypto');
const { adminSalt, userSalt } = require('../config.json').secret;

module.exports = {
    // 密码比对
    comparePwd: (pwd, saltType, dPwd) => {
        let salt, nPwd;
        switch (saltType) {
            case 'admin':
                salt = adminSalt;
                break;
            case 'user':
                salt = userSalt;
                break;
            default:
                return;
        }
        nPwd = crypto.createHash("md5").update(pwd + "." + salt).digest("hex");
        if (nPwd == dPwd) {
            return 1;
        } else {
            return 0;
        }
    },
    // 生成日期数串
    getDateNumber: () => {
        let dateObj = new Date();
        yearStr = dateObj.getFullYear().toString();
        if (dateObj.getMonth() < 9) {
            monthStr = "0" + (dateObj.getMonth() + 1).toString();
        } else {
            monthStr = (dateObj.getMonth() + 1).toString();
        };
        if (dateObj.getDate() < 10) {
            dateStr = "0" + dateObj.getDate().toString();
        } else {
            dateStr = dateObj.getDate().toString();
        }
        return parseInt(yearStr + monthStr + dateStr);
    }
}