/*
* @Author: ztian
* @Date:   2017-10-26 21:23:47
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-26 21:55:01
*/
'use stirct';
//引入result.html的css
require('./index.css');
//引入简单头部导航条
require('page/common/nav-simple/index.js');
//引入工具类
var _mm = require('util/mm.js');

$(function(){
    var type    = _mm.getUrlParam('type') || 'default';
    //根据type找到对应的操作提示语元素
    $resultcon  =$('.' + type + '-success');
    //显示对应的操作提示语
    $resultcon.show();
});