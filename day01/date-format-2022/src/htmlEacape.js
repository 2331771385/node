/**
 * 封装函数对HTML中特殊字符进行转换
 */
function htmlEacape(htmlStr) {
    return htmlStr.replace(/<|>|"|&/g, (match) => {
        switch (match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'  
            case '&':
                return '&amp;'
        }
    })
}

/**
 * 封装函数还原HTML中特殊的字符
 */
function htmlUnEacape(htmlStr) {
    return htmlStr.replace(/&lt;|&gt;|&quot;|&amp;/g, (match) => {
        switch (match) {
            case '&lt;':
                return '<';
            case '&gt;':
                return '>';
            case '&quot;':
                return '"';
            case '&amp;':
                return '&';
        }
    })
}

module.exports = {
    htmlEacape,
    htmlUnEacape
}