/**
 * 1.创建服务器
 * 2.设置cors跨域
 */
var express = require('express');
// 创建服务器的实例对象
var app = express();

// 引入cors模块解决跨域问题
var cors = require('cors');
// 将cors设置成全局中间件
app.use(cors());

// 解析表单数据
// 解析json格式的数据
app.use(express.json());
// 解析urlencoded的数据
app.use(express.urlencoded({extended: false}))

// 导入并且使用定义的路由
var router = require('./router/user');
app.use('/api', router)

// 声明全局错误的中间件
app.use((err, req, res, next) => {
    if (err) {
        return res.send({status: 1, message: '连接失败'})
    }
})

// 启动服务器
app.listen(3007, (req, res) => {
    console.log('server is running at:http://localhost:3007');
})