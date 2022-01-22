/**
 * 该模块主要用于定义一些用户的验证规则
 */
// 引入表单验证规则
const joi = require('joi')

/**
 * 其中在Joi的验证规则中，有以下几个函数
 * string()：输入内容必须是字符串
 * alphanum()：输入的内容必须是a-zA-Z0-9
 * min(): 输入的长度最小是多少位
 * max():输入的长度最大是多少位
 * required(): 这个字段是必填的
 */

const username = joi.string().alphanum().min(3).max(12).required();
const password = joi.string().pattern(/^[\S]{6,18}$/).required();

// 将post请求中form表单的body对象向外导出
exports.SCHEMA_USER = {
    body: {
        username,
        password
    }
}