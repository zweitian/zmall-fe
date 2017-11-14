/*
* @Author: ztian
* @Date:   2017-10-27 18:36:13
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 11:29:25
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
    data:{
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
    },
    init: function(){
        this.onload();
    },
    onload: function(){
        //显示第一步读取用户名的div
        this.loadStepUserame();
        //调用绑定事件
        this.bindEvent();
    },
    /*绑定事件*/
    bindEvent: function(){
        var _this = this;
        //1.输入用户名后的下一步点击,获取用户对应的问题
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username,function(res){
                    //用户名和密码保存到page对象的data中
                    _this.data.username = username;
                    _this.data.question = res;
                    //初始化找回密码的第二个div
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('用户名不能为空，请输入用户名');
            }
        });
        //2.输入问题答案后下一步的点击
        $('#submit-answer').click(function(){
            var answer = $.trim($('#answer').val());
            if(answer){
                _user.checkAnswer(
                    {
                        username    : _this.data.username,
                        question    : _this.data.question,
                        answer      : answer
                    },function(res){//答案正确,服务器返回forget_token
                        //forget_token保存到page对象的data中
                        _this.data.token = res;
                        _this.data.answer = answer;
                        _this.loadStepPassword();
                },function(errMsg){//答案错误,服务器发货errMsg
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('用户提示问题答案不能为空');
            }
        });
        //3.输入新密码后的下一步
          $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            if(password && password.length >=6){
                _user.resetPassword(
                    {
                        username    : _this.data.username,
                        forgetToken : _this.data.token,
                        passwordNew : password
                    },function(data,msg){//重置密码成功,跳转到结果页
                       window.location.href = './result.html?type=pass-reset';
                },function(errMsg){//重置密码失败,输出错误信息
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    //读取第一步div
    loadStepUserame  : function(){
        $('.step-username').show();
    },
    //读取第二步div
    loadStepQuestion : function(){
        formError.hide();//隐藏错误信息
        $('.step-username').hide().//隐藏第一步div
            siblings('.step-question').show().//显示第二步div
            find('.question').text(this.data.question);//问题设置如第二步span标签中
    },
    //读取第三步div
    loadStepPassword : function(){
        formError.hide();//隐藏错误信息
        $('.step-question').hide().//隐藏第二步div
        siblings('.step-password').show();//显示第三步提交新密码的div
    }
}
//初始化页面
$(function(){
    page.init();
});