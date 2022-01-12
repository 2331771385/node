/**
 * 因为udp是面向无连接的，所以支持一对一
 * 一对多，多对多，多对一的传播方式
 */
const dgram = require('dgram');
const borderService = dgram.createSocket('udp4');
borderService.bind(8003, function () {
    borderService.setBroadcast(true); // 开启广播
    borderService.setTTL(3)
})
borderService.on('listening', function () {
    console.log('服务器监听开始');
})
borderService.on('message', function (msg, info) {
    console.log(msg.toString());
    console.log(info.address);
})
const buf = Buffer.from('你好呀')
setInterval(() => {
    borderService.send(buf, 0, buf.length, 8004, 'localhost', function (error, byte) {
        if (error) {
            console.log(error);
        }
        console.log(`发送 ${byte} 个字节数据`);
    })
}, 3000)