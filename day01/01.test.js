/**
 * 学习node中模块的定义，
 * 在nodejs中，有三类模块机制：
 * 1.nodejs内置模块（fs,http等）
 * 2.自定义模块（用户自己编写的js代码）
 * 3.第三方模块（在使用第三方模块的时候，首先需要先进行包的下载，然后在node_modules中存放着下载三维包）
 * 
 * npm包的安装与卸载
 * npm包的发布
 * 
 * 
 * 
 * 
 * 1.在node中的模块，提供了一个require()方法，方法里面可以传递一个字符串作为模块的标识符
 * 标识符有三种：
 * (1)require('fs');这是nodejs提供的内置模块，也称为核心模块
 * (2)require('./index');这是自定义的模块，参数是文件所在的路径
 * (3)require('moment');这是第三方模块，在引入第三方模块之前需要先对模块包进行下载
 * 而通过require引入的方法或者变量都是通过module.exports导出的。
 * 在node中每一个文件都是一个模块，都有一个module参数，里面都有一个exports方法，
 * 文件导出的变量或者方法都是在module.exports导出的。
 * 通过require导入的模块都采用缓存的策略，也就是说，如果通过require导入多次相同的模块，那么不管引入多少次，只会执行一次
 * 也就是说在每次执行引入的文件时，首先查看缓存中是否有，如果缓存中有，就立即执行（缓存中会省略掉编译阶段）
 * 如果缓存中没有，那么就会检查内置的核心模块。
 */
// const user = require('./02.require');
// user.sayName(); // 执行引入的模块的时候，就会执行这个模块的方法
// console.log(module);

// 对应的第二个问题
// 对于同一个模块，不管引入多少次，都只会执行一次，从第二次到最后一次，都是从缓存中加载的
var a = require('./02.require');
var a = require('./02.require');
var a = require('./02.require');

console.log(a);