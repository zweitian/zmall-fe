/*
* @Author: ztian
* @Date:   2017-10-26 11:46:34
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-26 17:11:24
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
     checkLogin : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
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
    }
};
module.exports = _user;