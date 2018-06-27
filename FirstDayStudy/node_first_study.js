/**
 * Created by lingda on 2018/5/12.
 */

var  nhao = '你好'

console.log(nhao)


var fs = require('fs')
fs.readFile('/Users/lingda/Desktop/a.txt',function (error,data) {
    console.log(data.toString())

})