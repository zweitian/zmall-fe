/*
* @Author: ztian
* @Date:   2017-10-30 14:17:35
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-30 20:07:43
*/
'use strict'
require('./index.css');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入product服务层
var _product        = require('service/product-service');
//引入cart服务层
var _cart           = require('service/cart-service');
//引入购物车列表html渲染模版对象
var templateIndex   = require('./index.string');
//页面逻辑对象
var page = {
    data: {
        productId : _mm.getUrlParam('productId') || ''
    },
    init: function(){
          this.onLoad();
          this.bindEvent();
    },
    onLoad: function(){
      //没有productId 跳转到商城首页
      if(!this.data.productId){
          _mm.goHome();
          return;
      }
      this.loadDetail();
    },
    //给排序按钮添加点击事件
    bindEvent: function(){
      var _this =this;
      //切换主图片事件代理
      $(document).on('mouseenter','.p-img-item',function(){
          var imgUrl = $(this).find('.p-img').attr('src');
          $('.main-img').attr('src',imgUrl);
      });
      //点击商品数量事件
      $(document).on('click','.p-count-btn',function(){
          var type      = $(this).hasClass('plus') ? 'plus' :'minus',
              $pCount   = $('.p-count'),
              currCount = parseInt($pCount.val()),
              minCount  = 1,
              maxCount  = _this.data.detailInfo.stock || 1;
          //改变商品数量input框的值
          if(type === 'plus'){
              $pCount.val(currCount < maxCount?currCount+1:maxCount);
          }
          else if(type === 'minus'){
              $pCount.val(currCount > minCount?currCount-1:minCount);
          }
      });
      //商品加入购物车
       $(document).on('click','.cart-add',function(){
          //请求服务端把商品加入购物车
         _cart.addToCart({
              productId : _this.data.productId,
              count     : $('.p-count').val()
         },function(res){
              window.location.href = "./result.html?type=cart-add";
         },function(errMsg){
            _mm.errorTips(errMsg);
         })
      });
    },
    //渲染商品详细信息的html模版,并放入page-wrap容器中
    loadDetail: function(){
      var html      = '',
          _this     = this,
          $pageWrap = $('.page-wrap');
          //加载读取图标
          $pageWrap.html('<div class="loading"></div>')
          //请求服务端商品详细数据
          _product.getProductDetail(this.data.productId,function(res){
                //缓存从服务端获取的商品详细信息
                _this.data.detailInfo = res;
                //以,分割data中的subImages
                _this.filter(res);
                //使用分割后的数据渲染html模版
                html = _mm.renderHtml(templateIndex,res);
                //渲染后的html模版加入pageWrap容器中
                $pageWrap.html(html);
          },function(errMsg){
                $pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
          })
    },
    //以,分割data中的subImages,且data为引用传递
    filter :function(data){
      data.subImages = data.subImages.split(',');
    }
} 
$(function(){
  page.init();
})