/**
 * Shop
 */

const { Schema, model } = require("mongoose");

// shopList
module.exports = model('Shop', new Schema({
    shopName: {
        type: String,
        unique: true
    },
    shopId: {
        type: Number,
        unique: true
    },
    schoolName: String,
    schoolId: Number,
    tag: [String],
    delivery: Boolean,
    food: [{
        itemName: String,
        itemId: {
            type: Number,
            unique: true,
            sparse: true
        },
        price: Number,
        ts: {
            type: Number,
            unique: true,
            sparse: true
        }
    }],
    drink: [{
        itemName: String,
        itemId: {
            type: Number,
            unique: true,
            sparse: true
        },
        price: Number,
        ts: {
            type: Number,
            unique: true,
            sparse: true
        }
    }]
}));