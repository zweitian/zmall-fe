/*
* @Author: ztian
* @Date:   2017-10-31 20:43:45
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-01 21:26:31
*/
'use strict'
require('./index.css');
//引入头部搜索条(input框,搜索按钮)
require('page/common/header/index.js');
//引入头部导航条(登录 注册)
require('page/common/nav/index.js');
//引入工具类
var _mm             = require('util/mm.js');
//引入order服务层
var _order          = require('service/order-service.js');
//引入address服务层
var _address        = require('service/address-service.js');
//引入addressModal工具类
var addressModal    = require('./address-modal.js');
//引入地址列表html渲染模版对象
var templateAddress = require('./address-list.string');
//引入商品列表html渲染模版对象
var templateProduct = require('./product-list.string');
//页面逻辑对象
var page = {
    data: {
        //记录处于选中状态的收货地址的id
        selectedAddressId : null
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        this.loadArrdessList();
        this.loadProductList();
    },
    bindEvent: function(){
        var _this =this;
          //地址栏地址选中
        $(document).on('click','.address-item',function(){
            $(this).addClass('active').
                    siblings('.address-item').removeClass('active');
            //记录地址选择id
            _this.data.selectedAddressId =$(this).data('id');
        });
        //提交订单
        $(document).on('click','.order-submit',function(){
            var shippingId = _this.data.selectedAddressId;
           if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                },function(res){
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
           }else{
                _mm.errorTips('请选择地址后再提交');
           }
        });
        //添加地址事件绑定,调用addressModal组件显示添加地址模态框,添加地址成功调用onSuccess方法
        $(document).on('click','.address-add',function(){
            addressModal.show({
                isUpdate:false,
                onSuccess : function(){
                    _this.loadArrdessList();
                }
            });
        });
        //编辑地址事件绑定
        $(document).on('click','.address-opera .address-update',function(e){
            //阻止编辑事件向上冒泡,触发地址栏地址选中事件
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            //请求服务端获取地址详细信息
            _address.getShippingById(shippingId,function(res){
                  addressModal.show({
                        isUpdate    : true,
                        data        : res,
                        onSuccess   : function(){
                            _this.loadArrdessList();
                        }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        });
        //删除地址
        $(document).on('click','.address-opera .address-delete',function(e){
             //阻止删除事件向上冒泡,触发地址栏地址选中事件
            e.stopPropagation(e);
            if(window.confirm('确定要删除该收货地址吗?')){
                //获取收货地址项id
                 var shippingId = $(this).parents('.address-item').data('id');
                 //删除的地址正好是active的地址,删除选中地址id缓存
                 if(shippingId === _this.data.selectedAddressId){
                    _this.data.selectedAddressId =null;
                 }
                _address.deleteAddress(shippingId,function(res){
                      //删除成功后重新读取地址列表
                      _this.loadArrdessList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        });
    },
    //从服务端获取地址列表数据,渲染后放入address-con容器中
    loadArrdessList: function(){
        var _this       = this,
            $addressCon = $('.address-con');
        //先加载loading的div
        $addressCon.html('<div class="loading"></div>');
        //请求服务端地址列表数据
        _address.getAddressList(function(res){
            //服务端返回的地址地址列表加上active过滤
            _this.addressActiveFilter(res);
            //根据从服务器返回数据渲地址列表
            var AddressHtml = _mm.renderHtml(templateAddress,res);
            $addressCon.html(AddressHtml);
        },function(errMsg){
            $addressCon.html('<p class="err-tip">读取地址列表失败,请刷新页面重新读取</p>');
        })
    },
    //从服务端获取地址商品清单数据,渲染后放入product-con容器中
    loadProductList: function(){
        var _this       = this,
            $productCon = $('.product-con');
        //请求服务端商品列表数据
        _order.getProductList(function(res){
            //根据从服务器返回数据渲商品清单列表
            var ProductHtml = _mm.renderHtml(templateProduct,res);
            $productCon.html(ProductHtml);
        },function(errMsg){
            $productCon.html('<p class="err-tip">读取商品清单失败,请刷新页面重新读取</p>');
        })
    },
    //给服务端地址列表数据加入isAcitve标记
    addressActiveFilter : function(data){
        //selectedAddressId在地址项被选中时赋值,详见事件绑定中的地址栏选中绑定
        if(this.data.selectedAddressId){
            for (var i = 0,length = data.list.length; i < length; i++) {
                if(data.list[i].id === this.data.selectedAddressId){
                    data.list[i].isActive = true;
                    break;
                }
            }
        }
    }
} 
$(function(){
  page.init();
})