/*
* @Author: ztian
* @Date:   2017-11-02 13:13:47
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 15:54:23
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入带侧边导航条
var navSide =require('page/common/nav-side/index.js');
//引入工具类
var _mm =require('util/mm.js');
//引入user服务层
var _order =require('service/order-service');
//引入html渲染模版对象
var templateIndex =require('./index.string');
//页面逻辑对象
var page = {
    data:{
        orderNo : _mm.getUrlParam('orderNo') || ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
       //初始化左侧菜单
       navSide.init({
        name : 'order-list'
       });
       this.loadDetail();
    },
    loadDetail: function(){
        var _this           = this,
            orderNo         = this.data.orderNo,
            detailHtml      = '',
            $detailCon = $('.content');
            //加载loading的div
            $detailCon.html('<div class="loading"></div>');
            //从服务器获取订单详细信息
            _order.getOrderDetail(orderNo,function(res){
                _this.dataFilter(res);
                //根据获取的信息渲染html模版
                detailHtml = _mm.renderHtml(templateIndex,res);
                //渲染好的模版加入订单列表容器中
                $detailCon.html(detailHtml);
            },function(errMsg){
                //请求服务器数据失败
                 $detailCon.html('<p class="err-tip">'+ errMsg +'</p>');
            });
    },
    bindEvent :function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确定要取消该订单吗?')){
                var orderNo = _this.data.orderNo;
                _order.cancelOrder(orderNo,function(res){
                    _mm.successTips('订单取消成功');
                    //重新刷新页面
                    window.location.reload();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        }) 
    },
    dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
} 
$(function(){
  page.init();
})