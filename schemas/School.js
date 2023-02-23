/**
 * School 模型
 */

const { Schema, model } = require("mongoose");

// SchoolList
module.exports = model('School', new Schema({
    schoolId: {
        type: Number,
        unique: true
    },
    schoolName: String,
    keywords: [{
        type: String,
        unique: true,
    }]
}));