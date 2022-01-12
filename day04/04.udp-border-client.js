/**
 * udp广播的客户端
 */
const dgram = require('dgram');
const borderCient = dgram.createSocket('udp4');
borderCient.bind(8004);
borderCient.on('message', function (msg, info) {
    console.log(msg.toString());
    console.log(info);
})