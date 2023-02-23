/**
 * 登录态控制器
 */

const $ = require('../utils/res');

module.exports = {

    async login(req, res, next) {

        // 初始化变量
        let { user, pwd } = req.body;
        let result, token;

        // 判断入参
        if (!user || !pwd) {
            $.missingParam(res);
            return;
        }

        // 从数据库查找user
        compareOrigin = await Admin.findOne({ user });

        // 比对
        if (!compareOrigin || !$.comparePwd(pwd, 'admin', compareOrigin.pwd)) {
            $.passwordWrong(res);
            return;
        }

        // 签发token
        token = jwt.sign({
            ts: compareOrigin.ts,
            pwd: compareOrigin.pwd
        }, 'token', {
            expiresIn: 7 * 24 * 60 * 60
        })
        console.log(token)
        $.ok(res, {
            token
        })
    },

    async logout (req, res, next) {
        res.clearCookie('token');
        $.ok(res);
    }
}