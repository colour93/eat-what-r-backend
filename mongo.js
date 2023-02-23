/**
 * MongoDB 服务
 */

const mongoose = require('mongoose');

module.exports = async () => {
    
    const { mongo } = require('./config.json');

    mongoose.connect(`mongodb://${mongo.username}:${mongo.password}@${mongo.address}/${mongo.database}`,{ useNewUrlParser: true,useUnifiedTopology: true});

    const dbInstance = mongoose.connection;

    dbInstance.on('err', console.error.bind(console, "数据库连接错误"));

    dbInstance.once('open', () => {
        console.log("数据库连接成功")
    })

}