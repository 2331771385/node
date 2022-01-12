/**
 * 创建udp客户端，用于向udp服务器端发送消息
 * 
 */
// 引入nodejs中的dgram模块，里面封装了udp数据包的socket实现
const dgram = require('dgram');

// 创建udp的客户端
const client = dgram.createSocket('udp4');

// 创建buffer数据
const buf = Buffer.from('深入浅出node.js');
// 接受8004端口号中所有的消息
client.bind(8004);
client.send(buf, 0, buf.length, 8003, 'localhost', function (params) {
    // client.on('close')
});
client.on('message', function (msg, info) {
    console.log(msg.toString());
    console.log(info);
})
