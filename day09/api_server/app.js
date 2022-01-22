/**
 * 1.创建服务器
 * 2.设置cors跨域
 */
var express = require('express');
// 创建服务器的实例对象
var app = express();
// 导入表单验证规则的模块,之前的是hapi/joi,现在的验证规则是joi
const joi = require('joi');

// 引入cors模块解决跨域问题
var cors = require('cors');
// 将cors设置成全局中间件
app.use(cors());

// 解析表单数据
// 解析json格式的数据
app.use(express.json());
// 解析urlencoded的数据
app.use(express.urlencoded({extended: false}))

// 在所有路由之前，封装一个全局中间件
app.use((req, res, next) => {
    // 封装一个处理对象,指定参数的默认值，状态是1
    res.cc = function(err, status = 1) {
        // 判断传来的err类型，如果是错误对象，就输入err.message,否则，直接输出错误字符串
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }

    // 将处理器交给下面的中间件或者是路由
    next();
})

// 导入并且使用定义的路由
var router = require('./router/user');
app.use('/api', router)

// 在路由之后，定义错误级别的中间件
app.use((err, req, res, next) => {
    // 如果是表单验证规则出错，
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 未知的错误
    res.cc(err)
})

// 启动服务器
app.listen(3007, (req, res) => {
    console.log('server is running at:http://localhost:3007');
})