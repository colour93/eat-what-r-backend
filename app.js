/**
 * 吃点什么
 * EatWhat
 * @author colour93
 */

async function main () {

    if (process.env.ENV && process.env.ENV == 'dev') console.log('开发模式');
    
    await require('./mongo')();
    
    require('./express');

}

main();