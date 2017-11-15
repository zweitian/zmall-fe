/*
* @Author: ztian
* @Date:   2017-11-02 16:38:13
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-15 21:06:48
*/
'use strict';
var _mm = require('util/mm.js');
var _payment = {
    //订单下单接口 返回订单对应的二维码
    pay : function(paymentInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/orders/payment'),
            method  : 'POST',
            data    : paymentInfo,
            success : resolve,
            error   : reject
        });
    },
    //查询订单支付状态,支付成功返回ture paymentInfo{ orderNo:xxx }
    getPaymentStatus: function(paymentInfo,resolve,reject){
           var orderNo=paymentInfo.orderNo||"";
          _mm.request({
            url     : _mm.getServerUrl('/orders/'+orderNo+'/status'),
            method  : 'GET',
            data    : paymentInfo,
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _payment;