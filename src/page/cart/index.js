/*
* @Author: ztian
* @Date:   2017-10-30 20:41:28
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-31 20:22:22
*/
'use strict'
require('./index.css');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入头部导航条(登录 注册)
var _nav             =require('page/common/nav/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入cart服务层
var _cart           = require('service/cart-service');
//引入购物车列表html渲染模版对象
var templateIndex   = require('./index.string');
//页面逻辑对象
var page = {
    data: {

    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadCart();
    },
    bindEvent: function(){
        var _this =this;
        //购物车中商品选中,取消选中按钮绑定
        $(document).on('click','.cart-selected',function(){
            var $this       = $(this),
                productId   = $this.parents('.cart-table').data('product-id');
                //购物车商品状态变为选中状态
                if($this.is(':checked')){
                    _cart.selectProduct(productId,function(res){
                        //重新渲染购物车
                        _this.renderCart(res);
                    },function(errMsg){
                        _this.showCartError(errMsg);
                    })
                }
                //购物车商品取消选中
                else{
                    _cart.unselectProduct(productId,function(res){
                        //重新渲染购物车
                        _this.renderCart(res);
                    },function(errMsg){
                        _this.showCartError(errMsg);
                    })
                }               
                
        });
        //购物车中商品全选,取消全选按钮绑定
        $(document).on('click','.cart-selected-all',function(){
            var $this       = $(this);
                //购物车商品状态变为选中状态
                if($this.is(':checked')){
                    _cart.selectAllProduct(function(res){
                        //重新渲染购物车
                        _this.renderCart(res);
                    },function(errMsg){
                        _this.showCartError(errMsg);
                    })
                }
                //购物车商品取消选中
                else{
                    _cart.unselectAllProduct(function(res){
                        //重新渲染购物车
                        _this.renderCart(res);
                    },function(errMsg){
                        _this.showCartError(errMsg);
                    })
                }               
                
        });
        //添加/减少购物车商品数量
         $(document).on('click','.count-btn',function(){
            var $this       = $(this),
                productId   = $this.parents('.cart-table').data('product-id'),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            //点击增加按钮
            if(type === 'plus'){
                if(currCount>=maxCount){
                    _mm.errorTips('商品数量已到达上限');
                    $pCount.val(maxCount);
                    return;
                }
                newCount = currCount+1;
            }
            else{
                if(currCount<=minCount){
                    return;
                }
                newCount = currCount-1;
            }
            //请求服务端更新购物车商品数量
            _cart.updateCartProduct({
                productId   : productId,
                count       : newCount
            },function(res){
                //重新渲染购物车
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError(errMsg);
            });
        });
        //单个商品删除按钮
        $(document).on('click','.cart-delete',function(){
            //获取需要删除的商品的id
            if(window.confirm('确定从购物车移除该商品吗?')){
                //获取要移除的商品id
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);      
            }
        });
        //删除选中商品
        $(document).on('click','.cart-delete-selected',function(){
            if(window.confirm('确定移除选择商品吗?')){
                var arrProductIds=[],
                    $productsSelected=$('.cart-selected:checked');//已被勾选商品
                    for(var i=0,iLength=$productsSelected.length; i<iLength ; i++){
                        arrProductIds.push(
                            //已被勾选商品id
                            $($productsSelected[i]).parents('.cart-table').data('product-id')
                        );
                    }
                    //勾选商品id为不为空
                    if(arrProductIds.length){
                        //进行购物车商品移除
                        _this.deleteCartProduct(arrProductIds.join(','));      
                    }else{
                        _mm.errorTips('请先选择需要移除的商品');
                    }
            }
        });
         //提交购物车选择商品到订单确认页
        $(document).on('click','.submit-con .btn-submit',function(){
            if(_this.data.cartInfo.cartTotalPrice>0){
                window.location.href = './comfirm.html';
            }else{
                _mm.errorTips('请选择需要结算的商品');
            }
        });
    },
    //读取购物车列表,渲染后放入page-wrap容器中
    loadCart: function(){
        var _this     = this,
            $pageWrap =$('.page-wrap');
            $pageWrap.html('<div class="loading"></div>');
        _cart.getCartList(function(res){
            //根据从服务器返回数据渲染购物车
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError(errMsg);
        })
    },
    //根据productIds删除购物车商品,id间以,分割
    deleteCartProduct :function(productIds){
        var _this=this;
        _cart.deleteCartProduct(productIds,function(res){
            //根据从服务器获取删除商品后的数据渲染购物车
            _this.renderCart(res);
        },function(errMsg){
            _this.showCartError(errMsg);
        });
    },
    //渲染购物车
    renderCart:function(data){
        //data加入判断购物车noEmpty判断字段
        this.filter(data);
        //缓存购物车数据
        this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex , data);
        //渲染后的html模版加入页面容器中
        $('.page-wrap').html(cartHtml);
        //通知导航条重新读取购物车数量
        _nav.loadCartCount();
    },
    //处理服务端数据
    filter :function(data){
        //判断购物车是否不为空,把值存放data的noEmpty中
        data.noEmpty = !!data.cartProductVoList.length;
    },
    //购物车容器错误信息显示
    showCartError: function(errMsg){
        $('.page-wrap').html('<p class="err-tip">'+errMsg+'</p>');
    }
} 
$(function(){
  page.init();
})