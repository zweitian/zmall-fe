/*
* @Author: ztian
* @Date:   2017-10-29 22:59:02
* @Last Modified by:   ztian
* @Last Modified time: 2017-11-01 23:43:47
*/
'use strict';
require('./index.css');
//分页html模版
var templatePagination  = require('./index.string');
var _mm                 = require('util/mm.js');
//定义分页组件类
var Pagination = function(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null//回调
    };
    //对p-item进行事件点击代理,会回调onSelectPage函数,onSelectPage由用户设置传入
    $(document).on('click' , '.pg-item' , function(){
        var $this=$(this);
        if($this.hasClass('disabled') || $this.hasClass('active')){
            return ;
        } 
        //onSelectPage为一个函数时,以当前点击页作为参数调用onSelectPage函数
        typeof _this.option.onSelectPage === 'function' ?
         _this.option.onSelectPage($this.data('value')): null ;
    })
}
//根据用户设置渲染分页
Pagination.prototype.render = function(userOption){
    //用户设置和与默认设置合并,并且不会影响默认配置
    this.option = $.extend({},this.defaultOption,userOption);
    if(!(this.option.container instanceof jQuery)){
        return ;
    }
    //判断是否只有一页
    if(this.option.pages <= 1){
        return ;
    }
    //往分页容器放入分页内容
    this.option.container.html(this.getPaginationHtml());
}
//返回渲染完后的html数据 |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        pageArray   = [],
        option      = this.option,
        //根据page设置的范围(pageRange)确定分页开始值和结束值
        start       = (option.pageNum-option.pageRange<1 ? 1 :option.pageNum-option.pageRange),
        end         = (option.pageNum+option.pageRange>option.pages ? option.pages :option.pageNum+option.pageRange);
    //pageArray数组放入上一页对象
    pageArray.push({
        name        :'上一页',
        value       :this.option.prePage,
        disabled    :!this.option.hasPreviousPage//根据是否有上一页来判断是否可用
    });
    //pageArray数组放入每一页对象
    for(var i = start;i <= end;i++){
        pageArray.push({
                name    : i,
                value   : i,
                active  : i===option.pageNum//判断是否为选中页
        });
    }
    //pageArray数组放入下一页对象
    pageArray.push({
        name        :'下一页',
        value       :this.option.nextPage,
        disabled    :!this.option.hasNextPage//根据是否有上一页来判断是否可用
    });
    html = _mm.renderHtml(templatePagination,{
        pageArray       :pageArray,
        pageNum         :option.pageNum,
        pages           :option.pages
    })
    return html;
}

module.exports = Pagination;