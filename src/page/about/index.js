/*
* @Author: ztian
* @Date:   2017-11-02 18:00:34
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 18:02:08
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入带侧边导航条
var navSide =require('page/common/nav-side/index.js');
//页面逻辑对象
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
       //初始化左侧菜单
       navSide.init({
        name : 'about'
       });
    }
} 
$(function(){
  page.init();
})