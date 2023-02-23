/**
 * Admin 模型
 */

const crypto = require('crypto');
const { adminSalt } = require('../config.json').secret;

const { Schema, model } = require("mongoose");

// AdminList
module.exports = model('Admin', new Schema({
    user: {
        type: String,
        unique: true
    },
    pwd: {
        type: String,
        set(val) {
            return crypto.createHash("md5").update(val + "." + adminSalt).digest("hex");
        }
    },
    ts: {
        type: Number,
        unique: true
    },
    lastLogin: Date
}));