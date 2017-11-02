/*
* @Author: ztian
* @Date:   2017-11-02 16:38:13
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 17:04:41
*/
'use strict';
var _mm = require('util/mm.js');
var _payment = {
    //支付订单
    pay : function(paymentInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            method  : 'POST',
            data    : paymentInfo,
            success : resolve,
            error   : reject
        });
    },
    //查询订单支付状态,支付成功返回ture paymentInfo{ orderNo:xxx }
    getPaymentStatus: function(paymentInfo,resolve,reject){
          _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            method  : 'POST',
            data    : paymentInfo,
            success : resolve,
            error   : reject
        });
    }
};
module.exports = _payment;