/**
 * 开发时使用控制器
 */

module.exports = {

    async devTest (req, res, next) {
        res.cookie('key', '232', {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.send('ok');
    }

}