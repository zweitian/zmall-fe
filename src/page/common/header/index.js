/*
* @Author: ztian
* @Date:   2017-10-26 14:33:15
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-29 15:56:09
*/
'use strict'
require('./index.css');
//引用通用工具类
var _mm     = require('util/mm.js');
//通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.onload();
    },
    onload : function(){
        //搜索关键字回填
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    //绑定事件
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮,做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车,做搜索提交,绑定input框的keyup事件
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){//keyCode 13代表回车
                _this.searchSubmit();
            }
        });
    },
    //若搜索框有keyword,跳转页面,否则跳转到商城首页
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _mm.goHome();
        }
    }
};
header.init();
