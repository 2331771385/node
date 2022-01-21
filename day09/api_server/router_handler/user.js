/**
 * 将路由函数抽离出来，使之模块化
 */
// 引入数据库的文件，在数据库中操作
const db = require('../db/index');

exports.regUser = (req, res) => {
    // 验证输入的用户名或者密码是否合法
    const userInfo = req.body;
    if (!userInfo.username || !userInfo.password) {
        return res.send({status: 1, message: '用户名或密码不合法！'})
    }

    // sql查询语句
    const sql = 'select * from ev_user where username = ?';
    db.query(sql, userInfo.username, (err, result) => {
        // 如果错误
        if (err) {
            return res.send({status: 1,message: err.message})
        }

        // 查找到数据，但是用户名已经存在，提示用户更换其他的用户名
        if (result.length > 0) {
            return res.send({status: 1, message: '用户名已存在，清更换其他的用户名'})
        }
        res.send('注册成功')
    })
    // res.send('reguser ok')
};

exports.createBase = (req, res) => {
    let sql = 'create database my_db_01';
    db.query(sql, (err, result) => {
        if (err) {
            return new Error('创建数据库失败')
        }
        res.send('数据库创建成功')
    })
    
}

exports.login = (req, res) => {
    res.send('login ok')
}