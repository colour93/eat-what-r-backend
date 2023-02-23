/**
 * 鉴权中间件
 */

const $ = require('../utils/res');

module.exports = async (req, res, next) => {

    // console.log(req.cookies);

    let token;

    // 判断token是否存在
    if (!req.cookies.token && !req.query.token) {
        $.unauthorized(res);
        return;
    }

    // 判断token来源
    if (req.query.token) {
        token = req.query.token;
    } else {
        token = req.cookies.token;
    }

    // 验证token
    try {
        data = jwt.verify(token, 'token');
    } catch (err) {
        // token失效
        if (err.name == 'TokenExpiredError') {
            $.tokenExpired(res);
            return;
        }
    }

    // 从admin拉取用户信息
    compareOrigin = await Admin.findOne({ ts: data.ts });

    // 判断密码是否更改过
    if (data.pwd != compareOrigin.pwd) {
        $.tokenExpired(res);
        return;
    }

    next();

}