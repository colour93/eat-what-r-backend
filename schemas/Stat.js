/**
 * Stat
 */

const { Schema, model } = require("mongoose");

module.exports =  model('Stat', new Schema ({
    count: Number,
    date: Number,
    type: String
}));