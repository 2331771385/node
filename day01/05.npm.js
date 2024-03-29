/**
 * 另一个模块就是node中的npm与包
 * 1.npm是包管理容器，项目中需要的包就需要通过npm进行安装
 * 2.包管理文件package.json是一个json文件，里面存放了包的基本信息
 * 3.是一个个的键值对，包的基本信息包含：包名，版本号，下载的地址
 * 4.当我们在文件中引入自定义的模块的时候，有一个查找规则
 * 当引入的模块找到的是目录的时候，首先检查该目录下方是否有package.json文件
 * 如果当前目录下没有该文件，就检查当前文件的父目录是否有package.json文件
 * 如果父目录还没有，就接着向上进行查找，直到找到或者到达顶层的目录为止
 * 如果找到package.json文件，就查找里面的main属性，对应的属性值就是模块的入口文件
 * 如果没有main属性值或者没有package.json文件，就查看目录下是否有index.js文件，如果有，就将这个文件作为模块的入口文件
 * 如果以上都没有，就直接报错
 */

// 安装包
// npm install 包名

// 安装指定版本的包
// npm install 包名@版本

// 卸载指定的包
// npm uninstall 包名