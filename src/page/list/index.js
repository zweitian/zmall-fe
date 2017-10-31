/*
* @Author: ztian
* @Date:   2017-10-29 15:41:44
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-31 15:40:58
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入user服务层
var _product        = require('service/product-service');
//引入购物车列表html渲染模版对象
var templateIndex   = require('./index.string');
//引入分页组件类,用于new一个新的分页组件
var Pagination      = require('util/pagination/index.js');
//页面逻辑对象
var page = {
    data: {
      listParam :{
        categoryId  : _mm.getUrlParam('categoryId') || '',
        keyword     : _mm.getUrlParam('keyword')    || '',
        pageNum     : _mm.getUrlParam('pageNum')    || 1 , //默认请求页数为1
        pageSize    : _mm.getUrlParam('pageSize')   || 15,//默认请求商品数量为10
        orderBy     : _mm.getUrlParam('orderBy')    || 'default',
      }
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
       this.loadList();
    },
    //给排序按钮添加点击事件
    bindEvent: function(){
      var _this =this;
      $('.sort-item').click(function(){
          var $this = $(this);
          //点击默认排序按钮
          if($this.data('type') === 'default'){
              //默认排序已是点击状态,直接return
              if($this.hasClass('active')){
                return;
              }else{
                $this.addClass('active').siblings().removeClass('active desc asc');
                //改变商品排序属性
                _this.data.listParam.orderBy = 'default';
                //改变分页属性
                _this.data.listParam.pageNum = 1;
              }
          }
          //点击价格排序按钮
          else if($this.data('type') === 'price'){
             $this.addClass('active').siblings().removeClass('active desc asc');
            //判断价格是升序还是降序
            if($this.hasClass('desc')){
              //由降序改为升序
              $this.removeClass('desc').addClass('asc');
              //改变商品排序属性
              _this.data.listParam.orderBy = 'price_asc';
              //改变分页属性
              _this.data.listParam.pageNum = 1;
            }else{
              //由升序改为降序
               $this.removeClass('asc').addClass('desc');
               //改变商品排序属性
              _this.data.listParam.orderBy = 'price_desc';
              //改变分页属性
              _this.data.listParam.pageNum = 1;
            }
          }
          //重新读取商品列表信息
          _this.loadList();
      });
    },
    loadList: function(){
            var _this = this,
            listParam = this.data.listParam,
            listHtml  = '',
            $pListCon = $('.p-list-con');
            //加载loading的div
            $pListCon.html('<div class="loading"></div>');
            //去除listParam中无用请求参数
            listParam.categoryId ? (delete listParam.keyword):(delete listParam.categoryId);
            //请求服务器商品列表
            _product.getProductList(listParam,function(res){
            //根据服务端返回数据渲染购物车html模版
            listHtml = _mm.renderHtml(templateIndex,{
              list : res.list
            });
            //渲染后的html模版商品容器中
            $pListCon.html(listHtml);
            //封装分页信息,并使用分页信息渲染分页组件
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
              _mm.errorTips(errMsg);
          });
    },
    loadPagination:function(pageInfo){
        var _this = this;
        //pagination是否已经初始化
        this.pagination ? '':(this.pagination = new Pagination());
        //使用pagination对象渲染分页组件
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage : function(pageNum){
              //点击页面按钮时会触发onSelectPage的回调
              _this.data.listParam.pageNum = pageNum;
              _this.loadList();
            } 
        }));
    }
} 
$(function(){
  page.init();
})