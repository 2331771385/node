/**
 * 本章节学习node的时间循环机制
 * nodejs是一个单线程、多进程的语言，基于事件驱动、非阻塞I/O操作的模型
 * nodejs中每一个api都是异步的，并作为独立线程运行，可以使用回调函数调用
 * nodejs中基本上所有的事件机制都是基于设计模式中的观察者模式实现的
 * 
 * 
 * 
 * nodejs的事件驱动机制
 * 自己理解：因为nodejs是基于单线程的，开始执行代码的时候，就会创建一个while循环，
 * 代码自上而下的运行，每一个异步事件都是一个观察者。
 * node开启一个进程的时候，会创建一个循环，每一个循环就是一个tick周期，
 * 每一个tick周期都会自上而下的检查事件队列中是否有待执行的异步任务。
 * 如果没有，就结束进程
 * 如果有，就取出事件进行执行
 * 
 * nodejs中所有的操作都是基于events模块的
 * 通过events.on():绑定触发的事件
 * 通过events.emit()触发绑定的事件
 */



const events = require('events');

// 创建events事件
const eventsEmitter = new events();
 
// 事件监听部分
eventsEmitter.on('open', function () {
    console.log('打开文件');
});

// 读取内容的事件监听
eventsEmitter.on('data', function (dataStr) {
    console.log(dataStr);
});

// 失败的监听函数
eventsEmitter.on('error', function () {
    console.log('文件获取失败');
});

// 同步代码
console.log('程序正在执行');   // 1：这是同步代码，会先执行

// 事件触发函数
eventsEmitter.emit('open'); // 2：调用绑定的open函数，此时就会执行，然后将回调函数放入事件队列中，接着执行下面的代码
eventsEmitter.emit('data', '我是事件驱动部分的代码！') // 3:和上一行代码一样