/*
* @Author: ztian
* @Date:   2017-10-26 13:49:58
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-30 20:19:00
*/
'use strict';
var _mm = require('util/mm.js');
var _cart = {
    //查询购物车商品数量
    getCartCount : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    //商品添加入购物车
    addToCart : function(productInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            method  : 'POST',
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _cart;