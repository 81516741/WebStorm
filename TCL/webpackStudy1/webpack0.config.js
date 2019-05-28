const path = require('path');//commonjs写法
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main:'./src/script/main.js',
        a:'./src/script/a.js',
        b:'./src/script/b.js',
        c:'./src/script/c.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: "js/[name]-  [chunkhash].js"
        filename: "js/[name].js",
        // publicPath: "http://ld.com"//上线时，配置js的地址前缀
    },
    mode: "development",
    plugins: [
        new htmlWebpackPlugin({
            filename:'a.html',
            template:"index.html",
            inject:false,//js注入位置
            title:'webpack is a',
            excludeChunks:['b','c']
        }),
        new htmlWebpackPlugin({
            filename:'b.html',
            template:"index1.html",
            inject:"body",//js注入位置
            title:'webpack is b',
            chunks:['main',"b"]
        }),
        new htmlWebpackPlugin({
            filename:'c.html',
            template:"index2.html",
            inject:"body",//js注入位置
            title:'webpack is c',
            chunks:["c"]
        })
        // 例子1
        // new htmlWebpackPlugin({
        //     // filename:'index-[hash].html',
        //     template:"index.html",
        //     // inject:"head",//js注入位置
        //     title:'webpack is very nice',
        //     data:new Date(),
        //     minify:{
        //         removeComment:true,
        //         // collapseWhitespace:true
        //     }
        // })
    ]
}


// module.exports = {
//     entry: ['./src/script/main.js','./src/script/a.js'],
//     output: {
//         path: path.resolve(__dirname, 'dist/js'),
//         filename: "bundle.js"
//     },
//     mode: "development"
// }