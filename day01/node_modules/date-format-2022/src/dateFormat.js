/**
 * 这是时间格式化的封装函数
 * 获取当前时间，调用函数分别获取当前的年份，月份，日期，时分秒,最后对结果进行返回
 * 对于月份，日期，时分秒进行补零操作
 * 最后将这个函数暴露出来
 */
function dateFormat(dateStr) {
    let date = new Date(dateStr);

    let y = date.getFullYear(); // 获取指定的年份
    let m = padZero(date.getMonth() + 1); // 因为得到的是0-11月，所以需要进行+1
    let d = padZero(date.getDate()); // 获取日期

    // 获取时分秒
    let hh = padZero(date.getHours());
    let mm = padZero(date.getMinutes());
    let ss = padZero(date.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}


// 进行补零的操作
function padZero(n) {
    return n < 9 ? '0' + n : n;
}

module.exports = {
    dateFormat
}