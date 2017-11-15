/*
* @Author: ztian
* @Date:   2017-10-29 15:44:35
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 18:03:21
*/
'use strict';
var _mm = require('util/mm.js');
var _product = {
      //获取产品列表接口 paramInfo{categoryId,keyword,pageNum,pageSize,orderBy}
    getProductList : function(paramInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/products/search'),
            method  : "GET",
            data    : paramInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取商品详细信息接口
    getProductDetail :function(productId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/products/'+productId),
            method  : "GET",
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _product;