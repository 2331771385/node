/**
 * 借助于express的路由介绍一下请求对象req以及响应对象res
 * 对于res对象，结合实例查看
 */
// 引入express模块
var express = require('express');

// 创建web服务器
var app = express();

// 挂载get方法
app.get('/', (req, res) => {
    res.send('this is get method')
})

// 挂载post方法路由
app.post('/', (req, res) => {
    res.send('this is post method')
})

// 获取url路径中的参数,在url中使用/:/携带的参数，需要使用req.params获取
app.get('/index/:id', (req, res) => {
    console.log(req.params);
    res.send(req.params)
})

// 动态获取多个参数
app.post('/home/:id/:name', (req, res) => {
    var id = req.params.id;
    var name = req.params.name;
    console.log('我是' + id + '号学生，姓名是：' + name);
    res.send(req.params)
})

// 使用req.

// 调用listen方法启动服务器
app.listen(80, () => {
    console.log('the server is running: http://localhost');
})