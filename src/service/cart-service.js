/*
* @Author: ztian
* @Date:   2017-10-26 13:49:58
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-26 13:56:18
*/
'use strict';
var _mm = require('util/mm.js');
var _cart = {
    //用户登出
    getCartCount : function(resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_produt_count.do'),
            success : resolve,
            error   : reject
        });
    }
};
modules.exporst = _cart;