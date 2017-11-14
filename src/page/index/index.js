/*
* @Author: ztian
* @Date:   2017-10-24 11:18:24
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-29 13:52:28
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入banner轮播图
require('util/slider/index.js');
//工具类引入
var _mm             =require('util/mm.js');
//轮播图模版引入
var templateBanner  =require('./banner.string');
$(function(){
    //渲染轮播图
    var bannerHtml  =_mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var $slider     = $('.banner').unslider({
        dots:true
    });
    //前一张,后一张按钮事件绑定
    $('.banner-con .banner-arrow').click(function(){
        //根据是否有prev判断是上一张还是下一张
        var forward = $(this).hasClass('prev') ? 'prev':'next';
        //绑定unslider的上一张,下一张的方法
        $slider.data('unslider')[forward]();
    });
});