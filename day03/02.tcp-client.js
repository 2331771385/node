/**
 * 这个文件创建tcp的客户端进行如服务器端的会话
 * 用于测试上一个文件创建的服务器
 * 一个tcp服务器可以连接多个客户端
 * 每一个连接都是一个可读可写的stream对象
 * stream对象可以用于服务器端与客户端的通信
 * 可以通过data事件从一端读取另一端发送的数据
 * 也可以通过write事件从一端向另一端写数据
 * 
 * 
 * 客户端连接中的一些事件
 * 1.data：当一段调用write()方法向另一端写数据的时候，
 *         在另一端可以使用data()方法进行接受
 * 2.end:当连接中有一端发送了FIN报文的时候，就会触发该事件
 * 3.connect：当客户端与服务器端建立连接成功之后，就出发这个函数
 * 4.drain：当任意一端调用了write(),在当前端就会触发该事件
 * 5.error: 当异常发生的时候，就出发该函数
 * 6.close：连接完成关闭的时候，触发这个函数
 * 7.timeout：设置建立连接的时间，超过这个时间如果还没有建立连接，就触发这个函数
 */
// 引入net模块，用于创建客户端的会话
var net = require('net');

// 创建tcp客户端的连接
var client = net.connect({port: 8003}, function () {
    console.log('client connected!');
    client.write('world!\n')
});
client.on('data', function (data) {
    console.log(data.toString());
})
client.on('end', function () {
    console.log('send data end!');
})
client.on('error', function () {
    console.log('client error!');
})
client.on('close', function () {
    console.log('client disConnect!');
})