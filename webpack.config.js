/*
* @Author: ztian
* @Date:   2017-10-24 11:19:12
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-26 21:21:10
*/
var webpack                = require('webpack');
 var ExtractTextPlugin      = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin      = require('html-webpack-plugin');
 //获取webpack-dev-server环境变量
 var WEBPACK_ENV            = process.env.WEBPACK_ENV || 'dev';
 console.log(WEBPACK_ENV);
 //返回HtmlWebpackPlugin所需html配置
 function getHtmlConfig(name,title){
    return {
            template    : './src/view/'+ name +'.html',//文件模版地址
            filename    : 'view/'+ name +'.html',//输出文件地址
            title       : title,
            inject      : true,//引入js文件位于body标签最下面
            hash        : true,
            chunks      : ['common',name]//引入common模块js和name模块的js
    }
 }
 //webpack config
 var config = {
     entry: {
        'common'    : ['./src/page/common/index.js'],
        'index'     : ['./src/page/index/index.js'],
        'login'     : ['./src/page/login/index.js'],
        'result'    : ['./src/page/result/index.js']
     },
     output: {
         path: './dist',
         publicPath : '/dist',
         filename: 'js/[name].js'
     },
     //jquery全局变量设置
     externals: {
        jquery: 'window.jQuery'
    },
    module: {
        loaders: [
            //读取html的loader
            { test: /\.string$/, loader: 'html-loader'},
            //读取css的loader
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //图片、字体文件loader
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    //配置路径别名
    resolve: {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image',
        }
    },
    plugins:[
        //公共模块提取插件 所有文件中都被引用到的模块与common模块会被打包成base.js的公共js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //css单独打包插件
        new ExtractTextPlugin("css/[name].css"),
        //js文件与js文件引用的css文件打包进模版html中
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
 };
 //开发环境为dev webpack-dev-server打包入common模块中
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
 
 module.exports = config;
