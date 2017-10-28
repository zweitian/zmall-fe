/*
* @Author: ztian
* @Date:   2017-10-25 00:22:45
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 12:29:22
*/
'use strict'
require('./index.css');
//引用通用工具类
var _mm     = require('util/mm.js');
//引入用户模块服务层
var _user   = require('service/user-service.js');
//引入购物车模块服务层
var _cart   = require('service/cart-service.js');
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    //绑定事件
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出登录点击事件
        $('.js-logout').click(function(){
            //logout需传入两个函数 成功推出登录执行第一个函数,失败则执行第二个函数
            _user.logout(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });

    },
    //读取登录用户信息
    loadUserInfo : function(){
        //用户已登录,返回User对象
        _user.getUserInfo(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        },function(errMsg){
            //用户未登录 do noting
        });
    },
    //读取购物车信息
    loadCartCount : function(){
        _cart.getCartCount(function(res){
           $('.nav cart-count').text(res||0);
        },function(errMsg){
            //读取失败默认赋值为0
            $('.nav cart-count').text(0);
        });
    }
}
module.exports = nav.init();