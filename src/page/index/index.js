/*
* @Author: ztian
* @Date:   2017-10-24 11:18:24
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-26 21:07:44
*/
'use strict'
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入带侧边导航条的内容面板
var navSide=require('page/common/nav-side/index.js');
//设置order-list为选中状态
navSide.init({name:'pass-update'});