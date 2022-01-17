/**
 * 使用数据库来存储数据
 * 所以，在数据库中需要有以下几个接口
 * 1.Article.all(cb): 返回所有的文章
 * 2.Article.find(id, cb): 给定id，返回给定id的文章
 * 3.Article.create({ title, content }, cb): 创建一篇新的文章
 * 4.Article.delete(id, cb): 根据给定的id，删除文章
 * 这些模块都可以使用sqlite3实现。可以使用db.all获取多行数据
 * 使用db.get获取一行数据，
 */

// 引入数据库模块sqlite3
var sqlite3 = require('sqlite3').verbose();
// 数据库的名字
const dbName = 'later.sqlite';
// 链接到一个数据库文件
const db = new sqlite3.Database(dbName);

// 检查数据库中是否有指定的表，如果没有，就创建
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS articles
         (id integer primary key, title, content TEXT)
    `;
    db.run(sql); // 运行sql语句
})

// 创建article实体类
class Article {
    // 获取所有的文章，cb是回调函数
    static all(cb) {
        // 执行sql语句，SELECT * FROM articles 获取所有的文章
        db.all('SELECT * FROM articles', cb)
    }

    // 获取指定的文章
    static find(id, cb) {
        // 带问号的查询语法提供具体指的方法可以获取指定的文章
        db.get('SELECT * FROM articles WHERE id = ?', id, cb)
    }

    // 创建新的文章
    static create(data, cb) {
        // 问号表示参数，
        // 执行插入sql语句 INSERT INTO articles(title, content) values(?, ?)
        const sql = 'INSERT INTO articles(title, content) values(?, ?)';
        db.run(sql, data.title, data.content, cb);
    }

    // 删除指定的文章
    static delete(id, cb) {
        if (!id) {
            return cb(new Error('please provide an id'));
        }
        // 执行删除的sql语句 delete from articles where id = ?
        const sql = 'delete from articles where id = ?';
        db.run(sql, id, cb);
    }
}

// 将数据库db以及实体类Article导出
module.exports = db;
module.exports.Article = Article;