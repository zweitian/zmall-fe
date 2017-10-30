/*
* @Author: ztian
* @Date:   2017-10-30 20:41:28
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-30 20:46:50
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入cart服务层
var _cart           = require('service/cart-service');
//引入购物车列表html渲染模版对象
var templateIndex   = require('./index.string');
//页面逻辑对象
var page = {
    data: {
        productId : _mm.getUrlParam('productId') || ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadCart();
    },
    //给排序按钮添加点击事件
    bindEvent: function(){
        var _this =this;
    },
    //渲染商品详细信息的html模版,并放入page-wrap容器中
    loadCart: function(){
        var html      = '',
          _this     = this,
          $pageWrap = $('.page-wrap');
          //加载读取图标
          $pageWrap.html('<div class="loading"></div>');
    },
    //以,分割data中的subImages,且data为引用传递
    filter :function(data){
      data.subImages = data.subImages.split(',');
    }
} 
$(function(){
  page.init();
})