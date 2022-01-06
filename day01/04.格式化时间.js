/**
 * 对于nodejs中的格式化时间，有现有的模块
 * 1.首先引入moment模块,在引入该模块之前，require('moment')
 * 2.引入的模块moment()就可以获取当前时间
 * 3.对模块moment()调用匹配函数format('YYYY-MM-DD HH:mm:ss')就可以按照指定格式对结果进行输出
 */
const moment = require('moment');
const dt = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(dt);