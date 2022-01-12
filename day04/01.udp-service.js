/**
 * udp又称为用户数据包协议，与tcp一样都属于传输层协议
 * 在udp中，一个套接字可以与多个udp服务器建立连接
 * nodejs中的dgram模块提供了udp数据包的socket实现
 * 可以方面的创建udp服务器以及udp客户端
 * 
 * 1.创建udp服务器
 */
// 引入nodejs中的dgram模块，里面封装了udp数据包的socket实现
const dgram = require('dgram');

// 创建udp服务器，参数是udp的类型，有：udp4,udp6等
const service = dgram.createSocket('udp4');

// 当udp套接字在客户端通过send发送数据的时候，开始监听，
// 第一个参数：客户端传过来的字符串或者buffer数据
// 第二个参数是远程的地址
service.on('message', function (bufMsg, info) {
    console.log(bufMsg.toString());
    console.log('port:' + info.port + ';adress:' + info.address);
    // 向端口号8004发现消息
    service.send('你好', 0, bufMsg.length, 8004, info.address, function () {
        // service.on('close')
    })
})

// udp套接字开始侦听的时候开始监听这个函数
service.on('listening', function () {
    console.log('服务器端开始侦听');
})
// 绑定端口，监听端口号8003的所有消息
service.bind(8003);