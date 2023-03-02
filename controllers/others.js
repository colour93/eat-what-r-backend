/**
 * 杂七杂八
 */

const axios = require('axios');

const $ = require('../utils/res');

module.exports = {
    async getBingWallpaper(req, res, next) {

        axios.get("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN")
            .then((resp) => {
                $.ok(res, {
                    url: "https://cn.bing.com" + resp.data.images[0].url
                })
            })

    }
}