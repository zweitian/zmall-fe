/*
* @Author: ztian
* @Date:   2017-10-31 23:58:49
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-01 20:49:06
*/
'use strict';
var _mm = require('util/mm.js');
var _address = {
    //商品添加入购物车
    getAddressList : function(resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            success : resolve,
            error   : reject
        });
    },
    save : function(receiverInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            method  : 'POST',
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    //根据收货地址id查询具体收货地址
    getShippingById : function(shippingId,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            method  : 'POST',
            data    : {
                shippingId :shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    update : function(receiverInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            method  : 'POST',
            data    : receiverInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress : function(shippingId,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            method  : 'POST',
            data    : {
                shippingId :shippingId
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _address;