/*
* @Author: ztian
* @Date:   2017-10-26 11:46:34
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 17:43:44
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
      //用户注册,添加user表资源
    register : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //用户登录,往session资源添加用户信息
    login : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/session/user'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //用户登出，删除session中用户信息
    logout : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/session/user'),
            method  : 'POST',
            data    : {
                _method  : 'DELETE'
            },
            success : resolve,
            error   : reject
        });
    },
    //检测用户名是否以存在
    checkUsername : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/validation'),
            method  : 'GET',
            data    : {
                type    : 'username',
                str     : username
            },
            success : resolve,
            error   : reject
        });
    },
    //重置密码-根据用户名获取用户提示问题
    getQuestion : function(username,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/'+username+'/question'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //重置密码-根据userinfo新增并获取forget-token userInfo{username,quetion,answer}
    checkAnswer : function(userInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/password/forget-token'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //重置密码-根据获取的forget-token 重置密码()
    resetPassword : function(userInfo,resolve,reject){
        userInfo._method="PUT";//请求方式为PUT
        _mm.request({
            url     : _mm.getServerUrl('/user/password/forget-token'),
            data    : userInfo,
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取用户信息,若用户未登录不会进行强制登录,用于nav.html中用户名回填
    getUserInfo : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/session/user'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //获取用户详细信息,若用户未登录会进行强制登录
    getUserInformation : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //登录状态下更新用户信息
    updateUserInfo :function(userInfo,resolve,reject){
         userInfo._method="PUT";//请求方式为PUT
         _mm.request({
            url     : _mm.getServerUrl('/user/information'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登录状态下更新用户密码 passInfo{passwordOld:xxx,passwordNew:xxx}
    updatePassword :function(passInfo,resolve,reject){
            passInfo._method="PUT";//请求方式为PUT
             _mm.request({
            url     : _mm.getServerUrl('/user/password'),
            data    : passInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _user;