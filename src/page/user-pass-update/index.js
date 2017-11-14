/*
* @Author: ztian
* @Date:   2017-10-28 14:01:31
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 14:57:14
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
//页面逻辑对象
var page = {
    init: function(){
        //渲染左侧页面
        this.onLoad();
        //绑定时间
        this.bindEvent();
    },
    onLoad: function(){
       //初始化左侧菜单
       navSide.init({
        name : 'user-pass-update'
       });
    },
    bindEvent :function(){
      var _this = this;
      //因为.btn-submit是动态加载的,因此需使用冒泡绑定事件
      $(document).on('click','.btn-submit',function(){
          var passinfo = {
            passwordOld     : $.trim($('#password-old').val()),
            passwordNew     : $.trim($('#password-new').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
          };
          var validateRsult = _this.formValidate(passinfo);
          //表单数据验证成功
          if(validateRsult.status){
            _user.updatePassword({
                passwordOld : passinfo.passwordOld,
                passwordNew : passinfo.passwordNew
            },function(res,msg){
                //显示更新成功信息
                _mm.successTips(msg);
                //更新密码成功后--退出登录,并跳转到用户登录页面
                _user.logout();
                window.location.href = './user-login.html';
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
          }
          else{
            _mm.errorTips(validateRsult.msg);
          }
      })
    },
    //表单验证
    formValidate: function(formData){
        var result = {
            status : false,
            msg : ''
        };
        //校验旧密码
        if(!_mm.validate(formData.passwordOld,'password')){
            result.msg = '请输入旧密码';
            return result;
        }
        //校验新密码
        if(!_mm.validate(formData.passwordNew,'password')){
            result.msg = '请输入不少于6位的新密码';
            return result;
        }
        //两次输入密码
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
        }
        //上诉校验都通过，返回sttuss为true的结果
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    } 
}
//读取元素完成后进行页面初始化 
$(function(){
  page.init();
})