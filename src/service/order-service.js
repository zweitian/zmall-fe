/*
* @Author: ztian
* @Date:   2017-10-31 20:55:32
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 15:55:16
*/
'use strict';
var _mm = require('util/mm.js');
var _order = {
    //商品添加入购物车
    getProductList : function(resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    //创建订单
    createOrder : function(orderInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : orderInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取订单列表
    getOrderList: function(listParam,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : listParam,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取订单详细信息
    getOrderDetail : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : {
                orderNo : orderNo
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //取消订单
    cancelOrder : function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : {
                orderNo : orderNo
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _order;