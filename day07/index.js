/**
 * 使用node中的http模块比较复杂
 * 所以相比较而言，使用的是express框架
 * 首先使用require()将express模块引入
 * 然后调用express实例创建web服务器
 * 最后使用listen监听端口，开启web服务器
 * 
 * 要实现以下几个功能
 * 1.get: /articles: 获取所有的文章
 * 2.get: /articles/:id   获取指定的文章
 * 3.post: /articles  创建新的文章
 * 4.delete: /articles/:id 删除指定的文章
 * 
 * 注意：post请求需要消息体解析，
 * 消息体解析器知道如何接受MIME-encoded post请求消息的主体部分
 * 并将其转化为可用的消息
 * 可以使用express框架中的body-parser
 * 
 * 在项目中添加数据库，可以使用SQLite,还有热门的sqlite3模块
 * SQLite是进程内的数据库，所以很方便，不需要在系统上安装运行的数据库，
 * 添加的所有数据都会写进一个文件中，如果程序停到之后重新启动，原来的数据还在
 * 
 * 
 * 在项目中增加public以及views目录
 * 在项目中使用模板引擎handlesbar
 */
var express = require('express');
var app = express();

// 引入数据库的实体类Article,加载数据库模块
const Article = require('./db').Article;

// 引入下载文章的模块node-readability，这个模块提供了异步函数，可以下载指定url中的页面并将HTML转换为简易版
const read = require('node-readability');

// 引入body-parser
var bodyParser = require('body-parser');

// 引入模板引擎handlebars模块
var handlesbar = require('express3-handlebars').create({
    defaultLayout: 'main'
})

// 使用模板引擎
app.engine('handlebars', handlesbar.engine);
app.set('view engine', 'handlebars')

// 设置支持编码为json的请求消息体
app.use(bodyParser.json());
// 设置支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({ extended: true }))

// 设置web服务器的端口号
var port = process.env.PORT || 3000;

// 用到了数据库，所以这个数组就不需要了
// const articles = [
//     {
//         title: 'Example'
//     }
// ]

// 添加路由
app.get('/', (req, res) => {
    // 这是使用的express模块的send方法向客户端发送消息
    // res.send('这是首页!'); // 向客户端响应消息

    // 改用render函数，渲染模板引擎
    res.render('home')
})

// 获取所有的文章
app.get('/articles', (req, res, next) => {
    Article.all((err, data) => {
        if (err) {
            return next(err);
        }
        // 改用render渲染函数
        // res.send(data)
        res.render('list', {data: data})
    })
})

// 获取指定的文章
app.get('/articles/:id', (req, res, next) => {
    var ids = req.params.id;
    Article.find(ids, (err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data)
    })
})

// 创建新的文章
app.post('/articles', (req, res, next) => {
    // 创建新的文章，内容是发送来的请求
    // var article = { title: req.body.title };
    // 将创建的文章放入文章数组中
    // articles.push(article);

    // 使用数据库创建文章,获取到请求体中的url参数
    const url = req.body.url;

    // 使用node-readability模块获取指定url中的文章并下载
    read(url, (err, result) => {
        if (err || !result) {
            return res.status(500).send('服务器端错误！')
        }
        Article.create({
            title: result.title,
            content: result.content
        }, (error, data) => {
            if (error) {
                return next(error)
            }
            // 将整个文章数组响应到客户端
            res.send(data)
        })
    })
    
})

// 删除指定的文章
app.delete('/articles/:id', (req, res, next) => {
    var ids = req.params.id;
    // 使用delete方法删除的数据，其位置会被保留，所以需要换一种方式
    // delete articles[ids];

    // 会将下标为ids的数据删除掉 
    // articles.splice(ids, 1);

    // 调用数据库删除指定的文章
    Article.delete(ids, (err, data) => {
        if (err) {
            return next(err);
        }
        res.send({message: 'Deleted'})
    })
})

// 开启web服务器
app.listen(port, () => {
    console.log('the server is running: http://localhost:3000');
})

module.exports = app;