/**
 * 这个模块主要讨论段落的概念
 * 如果某一个视图想向布局的head元素中添加一些东西，
 * 或者插入一段jQuery的<script>代码
 * 就需要用到section的辅助方法
 * express3-handlebars没有实现这个功能的方法，但是handlebars的辅助方法可以实现
 * 当我们实例化Handlebars实例的时候，可以穿第一个section的方法
 */
// 引入express框架
var express = require('express');
// 引入express3-handlebars模块
// 可以再视图中使用section方法
var handlebars = require('express3-handlebars').create({
    helpers: {
        section: function (name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }
})

// 快速开启一个express服务器
var app = express();

// 创建模板引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 创建一个路由，用于查看创建的段落是否正常运行
app.get('/', function (req, res) {
    res.render('jquerytest', {layout: 'jqueryT'})
})


// 监听某一个端口，开启服务器
app.listen('3000', function () {
    console.log('The server is running http://localhost:3000');
})