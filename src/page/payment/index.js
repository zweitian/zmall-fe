/*
* @Author: ztian
* @Date:   2017-11-02 16:07:25
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 17:27:44
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入支付服务层
var _payment        = require('service/payment-service.js');
//引入购物车列表html渲染模版对象
var templateIndex   = require('./index.string');
//页面逻辑对象
var page = {
    data: {
        orderNo : _mm.getUrlParam('orderNo') || ''
    },
    init: function(){
          this.onLoad();
          this.bindEvent();
    },
    onLoad: function(){
      this.loadPaymentInfo();
    },
    //给排序按钮添加点击事件
    bindEvent: function(){
      var _this =this;
      //切换主图片事件代理
      $(document).on('mouseenter','.p-img-item',function(){
          var imgUrl = $(this).find('.p-img').attr('src');
          $('.main-img').attr('src',imgUrl);
      });
    },
    //渲染商品详细信息的html模版,并放入page-wrap容器中
    loadPaymentInfo: function(){
      var paymentInfoHtml   = '',
          _this             = this,
          orderNo           = this.data.orderNo,
          $pageWrap         = $('.page-wrap');
          //加载读取图标
          $pageWrap.html('<div class="loading"></div>')
          //请求服务端商品详细数据
          _payment.pay({
                    orderNo : orderNo
                },function(res){
                //使用分割后的数据渲染html模版
                paymentInfoHtml = _mm.renderHtml(templateIndex,res);
                //渲染后的html模版加入pageWrap容器中
                $pageWrap.html(paymentInfoHtml);
                //调用监听器监听订单支付状态改变,支付成功跳转页面
                _this.listenOrderStatus();
          },function(errMsg){
                $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
          })
    },
    listenOrderStatus:function(){
        var _this       = this,
            orderNo     = this.data.orderNo;
            //设置每3秒查询订单状态的定时器,订单状态改变后跳转到结果页面
            this.paymentTimer = window.setInterval(function(){
                //调用查询订单状态服务层
                _payment.getPaymentStatus(
                    {
                        orderNo : orderNo
                    },function(res){
                        if(res === true){
                            window.location.href = './result.html?type=payment&orderNo='+ orderNo;
                        }
                    },function(errMsg){

                    })
            },4000);
    }
} 
$(function(){
  page.init();
})