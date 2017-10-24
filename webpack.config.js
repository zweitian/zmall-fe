/*
* @Author: ztian
* @Date:   2017-10-24 11:19:12
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-24 16:03:40
*/
var webpack                = require('webpack');
var ExtractTextPlugin      = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin      = require('html-webpack-plugin');
 //返回HtmlWebpackPlugin所需html配置
function getHtmlConfig(name){
    return {
            template    : './src/view/'+ name +'.html',//文件模版地址
            filename    : 'view/'+ name +'.html',//输出文件地址
            inject      : true,//引入js文件位于body标签最下面
            hash        : true,
            chunks      : ['common',name]//引入common模块js和name模块的js
    }
}
var config = {
    //js入口文件，使用webpack自带js-loader，使用对象数组输入多个需要被转义的js文件
    entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/login.js']
    },
    //目标文件
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    //外部依赖
     externals: {
        //可以模块化的形式引入全局的jquery
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            //读取css的loader
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },//从右左执行，先执行css-loader再执行style-loader
            //图片、字体文件loader
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    plugins:[
        //公共模块提取插件 所有文件中都被引用到的模块与common模块会被打包成base.js的公共js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        //js文件与js文件引用的css文件打包进模版html中
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
module.exports = config;
