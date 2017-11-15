/*
* @Author: ztian
* @Date:   2017-10-31 23:58:49
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 20:47:40
*/
'use strict';
var _mm = require('util/mm.js');
var _address = {
    //获取登录用户收货地址列表的接口
    getAddressList : function(resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shippings'),
            method  : "GET",
            success : resolve,
            error   : reject
        });
    },
    //新增用户收货地址接口
    save : function(receiverInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shippings'),
            method  : 'POST',
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //根据收货地址id查询收货地址具体信息的接口
    getShippingById : function(shippingId,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shippings/'+shippingId),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //更新收货地址接口
    update : function(receiverInfo,resolve,reject){
           receiverInfo._method="PUT";
          _mm.request({
            url     : _mm.getServerUrl('/shippings'),
            method  : 'POST',
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //删除用户收货地址的接口
    deleteAddress : function(shippingId,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shippings'),
            method  : 'POST',
            data    : {
                _method     : "DELETE",
                shippingId  : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _address;