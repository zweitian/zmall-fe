/*
* @Author: ztian
* @Date:   2017-10-31 20:55:32
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 20:33:23
*/
'use strict';
var _mm = require('util/mm.js');
var _order = {
    //订单确认页获取订单商品的接口
    getProductList : function(resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/orders/cart-product'),
            method  : "GET",
            success : resolve,
            error   : reject
        });
    },
    //创建订单的接口
    createOrder : function(orderInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/orders'),
            data    : orderInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户订单列表的接口
    getOrderList: function(listParam,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/orders'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //获取订单详细信息的接口
    getOrderDetail : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/orders/'+orderNo),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },
    //取消订单的接口
    cancelOrder : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/orders/canel-server'),
            data    : {
                _method :'PUT',
                orderNo : orderNo
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _order;