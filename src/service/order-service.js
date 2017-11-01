/*
* @Author: ztian
* @Date:   2017-10-31 20:55:32
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-01 14:01:40
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
    }
};
module.exports = _order;