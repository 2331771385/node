/**
 * 创建用户路由模块
 */
var express = require('express');
var router = express.Router();

// 引入路由处理函数
var routerHandle = require('../router_handler/user')

// 挂载路由
// 注册新用户
router.post('/reguser', routerHandle.regUser)

// 登录
router.post('/login', routerHandle.login)

// 创建数据库的路由
router.get('/createBase', routerHandle.createBase)

module.exports = router;