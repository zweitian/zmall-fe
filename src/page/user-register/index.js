/*
* @Author: ztian
* @Date:   2017-10-27 14:53:36
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-16 15:33:43
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
        var _this = this;
        //username失去焦点验证用户名是否已存在
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //若用户名为空，不做验证
            if(!username){
                return;
            }
            //调用user_service验证用户名是否已存在
            _user.checkUsername(username,function(res){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            })
        });
        /*注册绑定事件*/
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
    submit:function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        };
        //验证表单数据
        var validateResult = this.formValidate(formData);

        //表单验证数据验证成功，提交表单给服务端
        if(validateResult.status){
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
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
        //验证用户名
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        //验证密码
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length<6){
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致，请重新确认密码';
            return result;
        }
        //验证手机号
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        //验证邮箱
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        //验证密码提示问题
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //验证密码提示问题答案
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //上诉校验都通过，返回sttuss为true的结果
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    } 
}
//初始化页面
$(function(){
    page.init();
});