/*
* @Author: ztian
* @Date:   2017-10-29 15:44:35
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-30 17:13:32
*/
'use strict';
var _mm = require('util/mm.js');
var _product = {
      //用户注册
    getProductList : function(paramInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : paramInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取商品详细信息
    getProductDetail :function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId :productId
            },
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _product;