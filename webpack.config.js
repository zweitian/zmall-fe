/*
* @Author: ztian
* @Date:   2017-10-24 11:19:12
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-16 19:17:41
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
            favicon     : './favicon.ico',//网站的favicon
            title       : title,
            inject      : true,//引入js文件位于body标签最下面
            hash        : true,
            chunks      : ['common',name]//引入common模块js和name模块的js
    }
 }
 //webpack config
 var config = {
     entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'about'             : ['./src/page/about/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        'cart'              : ['./src/page/cart/index.js'],
        'payment'           : ['./src/page/payment/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result'            : ['./src/page/result/index.js']
     },
     output: {
         path       : __dirname + '/dist/',
         //WEBPACK_ENV === 'online' ? '//s.happymmall.com/admin-fe/dist/' : '/dist/'
         publicPath :  WEBPACK_ENV === 'dev' ? '/dist/' : '//s.zwtzmall.cn/zmall-fe/dist/',
         filename   : 'js/[name].js'
     },
     //jquery全局变量设置
     externals: {
        jquery: 'window.jQuery'
    },
    module: {
        loaders: [
            //读取html的loader
            { 
                test: /\.string$/, 
                loader: 'html-loader',
                query:{
                    minimize : true,
                    removeAttributeQuotes :false //不删除属性上的""
                }
            },
            //读取css的loader
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //图片、字体文件loader   //   publicPath/resource/[name].ext
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
        new ExtractTextPlugin("css/[name].css"),  //   publicPath/css/[name].css
        //js文件与js文件引用的css文件打包进模版html中
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于ZMALL')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('payment','订单支付页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
 };
 //开发环境为dev webpack-dev-server打包入common模块中
 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
 
 module.exports = config;
