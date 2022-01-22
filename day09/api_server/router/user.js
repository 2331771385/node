/**
 * 创建用户路由模块
 */
var express = require('express');
var router = express.Router();

// 导入验证表单规则的中间件
const expressJoi = require('@escook/express-joi');
// 引入表单验证规则的文件
const {SCHEMA_USER} = require('../schema/user')

// 引入路由处理函数
var routerHandle = require('../router_handler/user')

// 挂载路由
// 注册新用户
// 在注册新用户的时候需要先试用表单验证规则的中间件
router.post('/reguser', expressJoi(SCHEMA_USER), routerHandle.regUser)

// 登录
router.post('/login',expressJoi(SCHEMA_USER), routerHandle.login)

// 创建数据库的路由
router.get('/createBase', routerHandle.createBase)

module.exports = router;