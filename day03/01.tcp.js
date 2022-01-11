/**
 * 学习nodejs的第三天
 * 今天学习的任务：
 * 1.node构建tcp服务
 *  构建tcp服务器端
 *  构建tcp客户端
 * 因为tcp构建服务需要依赖于net模块，所以在开始构建服务器之前，需要对net模块进行引入
 * 
 */

// 引入net模块
var net = require('net');

// 创建net服务器
net.createServer(function (socket) {
    // 在一段使用write方法的时候，在另一端就会触发data事件
    socket.on('data', function (data) {
        console.log('hello!');
    })

    // 服务器关闭的时候触发这个方法
    socket.on('close', function () {
        console.log('service disConnect!');
    })
    socket.on('end', function () {
        console.log('send data end!');
    })

    // 当服务器发生异常的时候，触发！侦听一个使用中的端口的时候，就会监听这个函数
    socket.on('error', function () {
        console.log('service error!');
    })
    socket.write('to client send data!')
}).listen(8003, function () {
    console.log('service connected!');
})