/*
* @Author: ztian
* @Date:   2017-10-26 11:46:34
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 17:55:09
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
      //用户注册
    register : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //用户登录
    login : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //用户登出
    logout : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检测用户名是否以存在
    checkUsername : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            data    : {
                type    : 'username',
                str     : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //根据用户名获取用户提示密码
    getQuestion : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //检测密码提示问题答案,userInfo有username,quetion,answer
    checkAnswer : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //根据userInfo重置密码,userInfo有username,question,passwordNew
    resetPassword : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户信息,若用户未登录不会进行强制登录,用于nav.html中用户名回填
    getUserInfo : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户详细信息,若用户未登录会进行强制登录
    getUserInformation : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //更新用户信息
    updateUserInfo :function(userInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //更新用户信息 passInfo{passwordOld:xxx,passwordNew:xxx}
    updatePassword :function(passInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : passInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _user;