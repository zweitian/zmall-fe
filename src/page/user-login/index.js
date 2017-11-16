/*
* @Author: ztian
* @Date:   2017-10-24 11:28:35
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-16 15:33:36
*/
'use strict'
//引入result.html的css
require('./index.css');
//引入简单头部导航条
require('page/common/nav-simple/index.js');
//引入工具类
var _mm = require('util/mm.js');
//引入user服务层
var _user = require('service/user-service');
//操作表单错误信息对象
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
//页面逻辑对象
var page = {
    init: function(){
        this.bindEvent();
    },
    /*绑定事件*/
    bindEvent :function(){
        //var _this = this;
        /*登录按钮绑定事件*/
        $('#submit').click(function(){
            _this.submit();
        });
        /*如若按下回车，也进行提交*/
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    /*提交表单*/
    submit :function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);

        //验证成功，提交表单给服务端
        if(validateResult.status){
            _user.login(formData,function(res){
                //服务端登录成功,若是由别的页面进来的，返回原来的页面，没有则返回首页
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                //服务器端出错
                formError.show(errMsg);
            });
        }
        //验证失败，提示错误信息
        else{
            formError.show(validateResult.msg);
        }
    },
    //表单自动验证
    formValidate: function(formData){
        var result = {
            status : false,
            msg : ''
        };
        //验证失败取非表示true
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //上诉校验都通过，返回正确结果
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    } 
}
//初始化页面
$(function(){
    page.init()
});