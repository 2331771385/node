/**
 * 使用引入的express模块快速创建web服务器
 * 根据提供的express模块的api创建服务器，以及创建不同的路由
 * 在express框架中，分配路由是使用app.get(url, callback)
 * 在分配路由的方法中，有两个参数，第一个参数是分配的路由的名称
 * 第二个参数是分配完路由之后的回调函数
 * 在express框架中，可以使用res.type()方法设置Content-Type的值
 * 使用res.send()向客户端浏览器发送消息
 * 这个方法和http模块中的res.end()方法的作用类似
 * 
 * express框架可以使用app.get()封装不同的路由页面
 * 使用app.use()封装中间件
 * 路由的分配和中间件的封装是有顺序的，如果在路由分配之前封装中间件，就会一直执行中间件
 * 不会向下执行封装的路由
 * 
 * 可以通过第二个函数中的参数的个数来判断是封装的中间件，还是分配的路由
 * app.get():创建一个get请求的路径
 * app.post():创建一个post请求的路径
 * 
 * 
 * 当使用视图的新路由替换旧路由的时候
 * 不需要指定返回的类型和状态码：视图引擎默认会返回text/html的内容类型以及200的状态码
 * 
 */
const express = require('express');
var app = express(); // 快速创建web服务器

// 引入视图引擎模块,创建默认布局main，如果不特别指明，所有视图都用这个布局
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

// 引入自己封装的模块fortune，
var fortune = require('./lib/fortune');

// 设置了handlebars视图引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 设置服务器的端口,如果没有设置process.env.PORT这个参数，就使用默认的端口3000
app.set('port', process.env.PORT || 3000);

// static中间件可以将一个或多个目录转换为包含静态资源的目录
// 目录不需要经过任何处理直接发送给客户端
// static中间件放在所有的路由之前
// 这个中间件相当于给想要发送的静态资源创建了一个路由，渲染文件并发送给客户端
app.use(express.static(__dirname + '/public'))

// 分配不同的路由
app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel')

    // 使用这些视图的新路由替换旧路由.render()就是渲染指定的视图页面为HTML
    res.render('home')
});

// 分配about页面的路由
app.get('/about', function (req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel')

    // 引入自己封装的模块，直接使用exports暴露出来的方法getFortune()
    res.render('about', {fortune: fortune.getFortune()})
})

// 当路由匹配不到的时候，就会执行这个中间件,在使用app.use()封装中间件的时候，需要使用res.status()返回状态码
app.use(function (req, res, next) {
    // res.type('text/plain');
    // res.status(404); // express框架中默认的状态码是200，可以使用res.status()设置状态码
    // res.send('404-Not Found');

    // 使用视图的新路由替换旧路由
    res.status(404);
    res.render('404');
})

app.use(function (err, req, res, next) {
    console.log('服务器发生错误');
    console.log(err);
    res.status(500);
    res.render('500');
})

// 启动服务器
app.listen(app.get('port'), function () {
    console.log('express started on http://localhost:' + app.get('port'));
})