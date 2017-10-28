/*
* @Author: ztian
* @Date:   2017-10-28 00:28:44
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 12:35:45
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
        //渲染左侧页面
        this.onLoad();
        //绑定事件
        this.bindEvent();
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
    },
    bindEvent :function(){
      var _this = this;
      //因为.btn-submit是动态加载的,因此需使用冒泡绑定事件
      $(document).on('click','.btn-submit',function(){
          var userinfo = {
            email     : $.trim($('#email').val()),
            phone     : $.trim($('#phone').val()),
            question  : $.trim($('#question').val()),
            answer    : $.trim($('#answer').val())
          };
          var validateRsult = _this.formValidate(userinfo);
          //表单数据验证成功
          if(validateRsult.status){
            _user.updateUserInfo(userinfo,function(res,msg){
                //显示更新成功信息
                _mm.successTips(msg);
                //跳转页面
                window.location.href = './user-center.html';
            },function(errMsg){
                _mm.errorTips(validateRsult.msg);
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
//读取元素完成后进行页面初始化 
$(function(){
  page.init();
})