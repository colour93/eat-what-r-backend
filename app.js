/**
 * 吃点什么
 * EatWhat
 * @author colour93
 */

async function main () {
    
    await require('./mongo')();
    
    require('./express');
}

main();