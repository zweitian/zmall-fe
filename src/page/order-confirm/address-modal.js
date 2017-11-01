/*
* @Author: ztian
* @Date:   2017-11-01 15:52:03
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-01 20:33:54
*/
'use strict'
//引入工具类
var _mm                     = require('util/mm.js');
//引入address服务层
var _address                = require('service/address-service');
//引入操作城市信息工具类
var _cities                 =require('util/cities/index.js');
//引入地址列表html渲染模版对象
var templateAddressModal    = require('./address-modal.string');
//页面逻辑对象
var addressModal = {
    //显示地址模态框
    show: function(option){
        //缓存option数据
        //option{isUpdate:xxx,onSuccess:funtion,data:需回显数据}
        this.option         = option,
        this.option.data    = option.data || {},
        this.$modalWrap     = $('.modal-wrap');
        //渲染modal模态框
        this.loadModal();
        //渲染完modal模态框后绑定事件
        this.bindEvent();
    },
    //隐藏地址模态框
    hide : function(option){
        this.$modalWrap.empty();
    },
    bindEvent: function(){
        var _this = this;
        //省份与城市的二级联动事件绑定
        this.$modalWrap.find('#receiver-province').change(function(){
            var provinceName= $(this).val();
            //读取省份对应城市到select框
            _this.loadCities(provinceName);
        });
        //保存收货地址事件绑定
        this.$modalWrap.find('.address-btn').click(function(){
            //获取验证后的收货人信息
            var result = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;
            //新增收货地址
            if(result.status && !isUpdate){
                _address.save(result.receiverInfo,function(res){
                    _mm.successTips('地址添加成功');
                    //隐藏函数模态框
                    _this.hide();
                    //调用回调函数
                    typeof _this.option.onSuccess === 'function'&&
                           _this.option.onSuccess(res); 
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
            //更新收货地址
            else if(result.status && isUpdate){
                _address.update(result.receiverInfo,function(res){
                        _mm.successTips('地址更新成功');
                        //隐藏函数模态框
                        _this.hide();
                        //调用回调函数
                        typeof _this.option.onSuccess === 'function'&&
                        _this.option.onSuccess(res); 
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
            //收货人信息校验出错,打印出错信息
            else{
                _mm.errorTips(result.errMsg);
            }           
        });
        //阻止container向modal容器派发click事件
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
        //点击或modal容器区域或X图标关闭模态框
        this.$modalWrap.find('.close').click(function(){
           _this.hide();
        });
    },
    loadModal: function(){
        var addressModalHtml = _mm.renderHtml(templateAddressModal,this.option);
        this.$modalWrap.html(addressModalHtml);
        //加载省份
        this.loadProvinces();
    },
    //加载省份到select框
    loadProvinces: function(){
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        //往province的select框填充option数据
        $provinceSelect.html(this.getSelectOption(provinces));
        //若是更新操作,并且data中有proinve的值,回填省份选择
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            //根据省份名称加载省份对应城市到select框
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //根据省份名称加载省份对应城市到select框
    loadCities: function(provinceName){
        var cities      = _cities.getCities(provinceName),
            $citySelect = this.$modalWrap.find('#receiver-city');
        //往province的select框填充option数据
        $citySelect.html(this.getSelectOption(cities));
        //若是更新操作,并且data中有City的值,回填城市选择
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    //获取select框option选项,输入:array,输出:HTML
    getSelectOption: function(optionArray){
        var html = '<option value="">请选择</option>';
        for(var i = 0,length = optionArray.length;i<length;i++){
            html += '<option value="'+ optionArray[i] +'">' + optionArray[i] + '</option>'
        }
        return html;
    },
    //从表单获取收货地址信息,并验证收货地址信息,返回验证对象
    getReceiverInfo : function(){
        var receiverInfo = {},
            result       = {
                status:false
            };
        //获取表单收货地址信息
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val()); 
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val()); 
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val(); 
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val(); 
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val()); 
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());

        //若是更新,获取收货地址id放入receiver对象中
        if(this.option.isUpdate){
            receiverInfo.id =  $.trim(this.$modalWrap.find('#receiver-id').val());
        }
        //校验receiveInfo表单结果
         //验证失败取非表示true
        if(!_mm.validate(receiverInfo.receiverName,'require')){
            result.errMsg = '请输入收货人姓名';
            return result;
        }
        if(!_mm.validate(receiverInfo.receiverProvince,'require')){
            result.errMsg = '请选择收货人省份';
            return result;
        }
        if(!_mm.validate(receiverInfo.receiverCity,'require')){
            result.errMsg = '请选择收货人城市';
            return result;
        }
        if(!_mm.validate(receiverInfo.receiverAddress,'require')){
            result.errMsg = '请输入收货的详细地址';
            return result;
        }
        if(!_mm.validate(receiverInfo.receiverPhone,'phone')){
            result.errMsg = '请输入正确的手机号';
            return result;
        }
        
        //上诉校验都通过，返回正确结果
        result.status        = true;
        result.receiverInfo  = receiverInfo;
        return result; 
    }
} 
module.exports = addressModal;