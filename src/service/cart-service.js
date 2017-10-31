/*
* @Author: ztian
* @Date:   2017-10-26 13:49:58
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-31 18:08:11
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
    },
    //获取购物车列表
    getCartList : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    //选择购物车中单项商品
    selectProduct : function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    :{
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    },
    //取消选择购物车中单项商品
    unselectProduct : function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    :{
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    },
    //选择购物车中所有商品
    selectAllProduct : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    //取消选择购物车中所有商品
    unselectAllProduct : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    //更新购物车中商品数量  productInfo:{count:xxx,productId:xxx}
    updateCartProduct :function(productInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //根据productIds删除购物车中的商品  productId间以,分割
    deleteCartProduct :function(productIds,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            method  : 'POST',
            data    : {
                productIds : productIds
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _cart;