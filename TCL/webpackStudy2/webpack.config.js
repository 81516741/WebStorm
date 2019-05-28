/*
* 【速度优化】
* 1.webpack4.0
* 2.多线程/多实例-并行压缩
* HappyPack,thread-loader,parallel-webpack
* 3.分包
* html-webpack-external-plugin,进一步分包，预编译资源模块DLLPlugin
* 4.缓存
* HardSourceWebpackPlugin
* 5.搜小构建目标
* exclude,include
*
* 【体积优化】
* 1.Scope Hoisting  必须ES6语法，CJS的方式不支持
* plugins:[
        new webpack.optimize.ModuleConcatenationPlugin()
        ]
* 减少函数声明代码
* 2.Tree-shaking  必须ES6语法，CJS的方式不支持
* 在.babelrc里面 modules:false既可
* 3.公共资源分离
* SplitChunksPlugin
* 4.图片压缩
* image-webpack-loader
* 5.动态Polyfill
* polyfill service
* */

const path = require('path');//commonjs写法
var htmlWebpackPlugin = require('html-webpack-plugin')
//用来分析每个loader和插件的耗时时间的
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const  smp = new SpeedMeasurePlugin();
//体积分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpackConfig = /*smp.wrap(*/{
    mode: "development",
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                loader: "babel-loader",
                include:path.resolve(__dirname,"src")
            },
            {
                test:/\.html$/,
                loader: "html-loader"
            },
            {
                test:/\.ejs$/,
                loader: "ejs-loader"
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name:'assert/[name]-[hash:5].[ext]',
                            limit:8000
                        }
                    },
                    'image-webpack-loader'//可以压缩图片
                ]
            },
            {
                test:/\.css$/,
                use: [
                    "style-loader",
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 5 versions'] })
                            ]
                        }
                    }
                    ],
                 include:path.resolve(__dirname,"src")
            },
            {
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',//如果用了less-loader 这里不用加 importLoaders 的options
                    {
                        loader: 'postcss-loader',//这个功能很强大，这里用来处理flex 加-webkit-box -ms-flexbox
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 5 versions'] })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('autoprefixer')({ browsers: ['last 5 versions'] })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename:'index66.html',
            template:"index.html",
            inject:'body'
        })
        // new BundleAnalyzerPlugin()
    ]
}/*)*/;

module.exports = webpackConfig;

