/**
 * 在这个文件中引入时间格式化的函数，HTML转换特殊字符的函数，HTML还原特殊字符的函数
 * 然后将这些函数暴露出去
 */
const dt = require('./src/dateFormat');
const he = require('./src/htmlEacape');

module.exports = {
    ...dt,
    ...he
}
