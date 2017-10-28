/*
* @Author: ztian
* @Date:   2017-10-28 00:16:39
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 11:34:49
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入带侧边导航条
var navSide =require('page/common/nav-side/index.js');
//引入工具类
var _mm =require('util/mm.js');
//引入user服务层
var _user =require('service/user-service');
//引入html渲染模版对象
var templateIndex =require('./index.string');
//页面逻辑对象
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad: function(){
       //初始化左侧菜单
       navSide.init({
        name : 'user-center'
       });
       this.loadUserInfo();
    },
    loadUserInfo :function(){
      _user.getUserInfo(function(res){
        //使用服务端传过来的user对象渲染html模版
        var userHtml = _mm.renderHtml(templateIndex,res);
        //渲染后的html模版放入panel标签
        $('.panel-body').html(userHtml);
      }, function(errMsg){
        _mm.errorTips(errMsg);
      });
    }
} 
$(function(){
  page.init();
})