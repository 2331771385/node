/**
 * 使用类封装nodejs中的events对象
 */
class Event {
    // 构造函数
    constructor() {
        // 声明一个对象，用于封装绑定的事件名称，是一个键值对，键名是事件的名称，键值是回调函数
        this.events = {};
    }

    // 绑定事件接受两个参数，一个是事件名称，另一个是回调函数
    on(type, listener) {
        // 判断对象中是否该名称的事件
        if (this.events[type]) {
            // 如果存在，直接将回调函数放入对应的队列中
            this.events[type].push(listener);
        } else {
            // 如果不存在，直接将回调函数赋值给该事件
            this.events[type] = [listener];
        }
    }

    // 触发对应的事件
    emit(type, ...reset) {
        // 查看对象中是否存在改事件名
        if (this.events[type]) {
            // 如果存在，就遍历对应的数组，
            this.events[type].forEach(listener => {
                // 然后使用apply方法改变this指向，并将参数进行传递
                listener.apply(this, reset);
            })
        }
    }

    // 删除指定名称的事件名称,type是对应的事件，listener对应该数组里面的监听函数
    removeListener(type, listener) {
        if (this.events[type]) {
            this.events[type].filter(listeners => {
                listeners != listener
            })
        }
    }

    // 指定的事件名称只触发一次
    once(type, listener) {
        const wrap = (...reset) => {
            listener.apply(this, reset); // 执行函数，并且赋值
            this.removeListener(type, listener); // 将对应的监听函数删除掉，这样就能保证只触发一次
        }
        this.on(type, wrap);
    }
}