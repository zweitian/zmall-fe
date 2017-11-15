/*
* @Author: ztian
* @Date:   2017-10-26 13:49:58
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 20:42:14
*/
'use strict';
var _mm = require('util/mm.js');
var _cart = {
    //查询购物车商品数量的接口
    getCartCount : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/count'),
            method  : "GET",
            success : resolve,
            error   : reject
        });
    },
    //商品添加入购物车的接口
    addToCart : function(productInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/cart'),
            method  : 'POST',
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取购物车商品列表
    getCartList : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart'),
            method  : "GET",
            success : resolve,
            error   : reject
        });
    },
    //选择购物车中单项商品
    selectProduct : function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/selection/'+productId),
            method  : 'POST',
            data    :{
                _method :'PUT'
            },
            success : resolve,
            error   : reject
        });
    },
    //取消选择购物车中单项商品
    unselectProduct : function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/deselection/'+productId),
            method  : 'POST',
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
            url     : _mm.getServerUrl('/cart/selection/all'),
            method  : 'POST',
            data    :{
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    },
    //取消选择购物车中所有商品
    unselectAllProduct : function(resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/cart/deselection/all'),
            method  : 'POST',
            data    :{
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    },
    //更新购物车中商品数量的接口  productInfo:{count:xxx,productId:xxx}
    updateCartProduct :function(productInfo,resolve,reject){
        productInfo._method="PUT";
         _mm.request({
            url     : _mm.getServerUrl('/cart/count'),
            method  : 'POST',
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //根据productIds删除购物车中的商品的接口  productId间以,分割
    deleteCartProduct :function(productIds,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart'),
            method  : 'POST',
            data    : {
                _method     : "DELETE",
                productIds  : productIds
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _cart;