/*
* @Author: ztian
* @Date:   2017-11-01 22:30:32
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-02 00:12:52
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
//引入分页组件类,用于new一个新的分页组件
var Pagination      = require('util/pagination/index.js');
//引入html渲染模版对象
var templateIndex =require('./index.string');
//页面逻辑对象
var page = {
    data:{
        listParam :{
            pageNum   :  1 , //默认请求页数为1
            pageSize  : 10//默认请求商品数量为10
        }
    },
    init: function(){
        this.onLoad();
        this.loadOrderList();
    },
    onLoad: function(){
       //初始化左侧菜单
       navSide.init({
        name : 'order-list'
       });
    },
    loadOrderList: function(){
            var _this           = this,
                listParam       = this.data.listParam,
                orderListHtml   = '',
                $orderListCon = $('.order-list-con');
                //加载loading的div
                $orderListCon.html('<div class="loading"></div>');
                _order.getOrderList(listParam,function(res){
                    //从服务器获取订单列表信息,渲染html模版
                    var orderListHtml = '';
                    orderListHtml = _mm.renderHtml(templateIndex,res);
                    //渲染好的模版加入订单列表容器中
                    $orderListCon.html(orderListHtml);
                    //渲染分页组件
                    _this.loadPagination({
                            hasPreviousPage : res.hasPreviousPage,
                            prePage         : res.prePage,
                            hasNextPage     : res.hasNextPage,
                            nextPage        : res.nextPage,
                            pageNum         : res.pageNum,
                            pages           : res.pages
                    });
                },function(errMsg){
                    //请求服务器数据失败
                     $orderListCon.html('<p class="err-tip">获取订单列表失败,请重新刷新页面</p>');
                });
    },
    loadPagination : function(pageInfo){
        var _this = this;
        //pagination是否已经初始化
        this.pagination ? '':(this.pagination = new Pagination());
        //使用pagination对象渲染分页组件,container为用于加载分页插件的容器,Onselectpage中pageNum为当前选中页
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
              //点击页面按钮时会触发onSelectPage的回调
              _this.data.listParam.pageNum = pageNum;
              _this.loadOrderList();
            } 
        }));
    }
} 
$(function(){
  page.init();
})