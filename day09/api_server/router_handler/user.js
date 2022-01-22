/**
 * 将路由函数抽离出来，使之模块化
 */
// 引入数据库的文件，在数据库中操作
const db = require('../db/index');
// 用于进行密码的加密
const bcrypt = require('bcryptjs');

exports.regUser = (req, res) => {
    // 验证输入的用户名或者密码是否合法
    const userInfo = req.body;
    if (!userInfo.username || !userInfo.password) {
        return res.cc('用户名或密码不合法！')
        // return res.send({status: 1, message: '用户名或密码不合法！'})
    }

    // sql查询语句
    const sql = 'select * from ev_user where username = ?';
    db.query(sql, userInfo.username, (err, result) => {
        // 如果错误
        if (err) {
            return res.cc(err.message)
            // return res.send({status: 1,message: err.message})
        }

        // 查找到数据，但是用户名已经存在，提示用户更换其他的用户名
        if (result.length > 0) {
            return res.cc('用户名已存在，请更换其他的用户名')
            // return res.send({status: 1, message: '用户名已存在，请更换其他的用户名'})
        }

        // 调用bcrypt的方法hashSync对密码进行加密
        // 第二个参数能提高加密的准确性,任意一个数
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);

        // 插入新的用户
        // 使用？进行占位符操作
        const sql = 'insert into ev_user set ?';
        // 使用db.query()执行sql语句
        db.query(sql, {username: userInfo.username, password: userInfo.password}, (err, result) => {
            // 判断插入新用户是否成功，如果不成功，返回失败的信息
            if (err) {
                return res.cc(err.message);
                // return res.send({status: 1, message: err.message});
            }
            // 判断数据库中是否有新插入的数据
            if (result.affectedRows !== 1) {
                return res.cc('数据插入失败，请稍后再试')
                // return res.send({status: 1, message: '数据插入失败，请稍后再试'})
            }

            // 插入成功
            res.cc('数据插入成功！', 0)
            // res.send({status: 0, message: '数据插入成功！'})
        })
    })
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

// 登录操作
exports.login = (req, res) => {
    let userInfo = req.body;
    const sql = 'select * from ev_user where username = ?'
    db.query(sql, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('该用户不存在')
        }

        // 判断用户输入的密码是否正确，因为数据库中的密码是加密的，所以需要使用bcrypt.compareSync()对密码进行解密
        // 两个参数，第一个是用户输入的密码，第二个是数据库中存储的密码，顺序不能变
        const isPassword = bcrypt.compareSync(userInfo.password, result[0].password);
        if (!isPassword) {
            return res.cc('密码错误')
        }

        // 用户名和密码正确时候，就要生成token字符串
    })
    res.send('login ok')
}