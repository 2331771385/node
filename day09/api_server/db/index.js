/**
 * 配置数据库文件，连接数据库
 */
// 引入数据库文件
const mysql = require('mysql');

// 创建数据库连接文件
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_db_01'
});
db.connect((err) => {
    if (err) {
        return new Error('数据库连接失败')
    }
    console.log('数据库连接成功');
})
 module.exports = db;