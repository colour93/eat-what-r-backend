/**
 * Express 服务
 */

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config.json');

const { port } = config.express;

console.log("初始化 Express");

// 初始化实例
const app = express();

// 引入路由
const routers = require('./routers');

// 处理跨域
const allowCors = (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', req.headers.origin);
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Credentials','true');
    next();
};

app.use(allowCors);

// 数据处理中间件
app.use(bodyParser.json());
app.use(cookieParser());

// 路由
app.use(routers);

// 设置端口
console.info(`Epxress 运行于 ${port}`);
app.set('port', port);

// 创建 HTTP 服务实例
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// 错误处理
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' 需要提升权限');
            process.exit(1);
        case 'EADDRINUSE':
            console.log(bind + ' 端口已在使用中');
            process.exit(1);
        default:
            throw error;
    }
}

// 监听处理
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
}

module.exports = app;