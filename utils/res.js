/**
 * 响应
 */

const { response } = require('express');

module.exports = {
    /**
     * 正常返回
     * @param {response} res 
     * @param {Object} data 
     * @param {String} msg 
     * @returns 
     */
    ok: (res, data, msg) => {
        if (!msg) {
            msg = "success";
        };
        res.send({
            code: 100,
            msg,
            data
        });
        return;
    },
    /**
     * 缺少参数
     * @param {response} res 
     * @returns 
     */
    missingParam: (res) => {
        res.send({
            code: 101,
            msg: "参数不正确或缺少参数"
        });
        return;
    },
    /**
     * 已存在
     * @param {response} res 
     * @returns 
     */
    exist: (res) => {
        res.send({
            code: 102,
            msg: "条目已存在"
        });
        return;
    },
    /**
     * 密码错误
     * @param {response} res 
     * @returns
     */
    passwordWrong: (res) => {
        res.send({
            code: 103,
            msg: "用户名或密码错误"
        });
        return;
    },
    /**
     * token 过期
     * @param {response} res 
     * @returns 
     */
    tokenExpired: (res) => {
        res.send({
            code: 401,
            msg: "登陆已失效"
        });
        return;
    },
    /**
     * 无权访问
     * @param {response} res 
     * @returns 
     */
    unauthorized: (res) => {
        res.status(401).send({
            code: 401,
            msg: "无权访问"
        });
        return;
    },
    /**
     * 未找到
     * @param {response} res 
     * @param {String} msg 
     * @returns 
     */
    notFound: (res, msg) => {
        if (!msg) {
            msg = "未找到";
        };
        res.status(404).send({
            code: 404,
            msg
        });
        return;
    },
    /**
     * 访问受限
     * @param {response} res 
     * @param {String} msg 
     * @returns 
     */
    forbidden: (res, msg) => {
        if (!msg) {
            msg = "forbidden";
        };
        res.status(403).send({
            code: 403,
            msg
        });
        return;
    },
    /**
     * 内部错误
     * @param {response} res 
     * @param {String} msg 
     * @returns 
     */
    fetalError: (res, msg) => {
        res.send({
            code: -1,
            msg: "内部错误"
        });
        return;
    }
}