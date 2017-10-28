/*
* @Author: ztian
* @Date:   2017-10-26 19:48:46
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-28 11:29:36
*/
'use strict'
require('./index.css');
//引用通用工具类
var _mm             = require('util/mm.js');
//左侧导航条渲染模版
var temlateIndex    = require('./index.string');
var navSide = {
    option : {
        name    : '' ,/*需要active的元素*/
        navList : [
            {name : 'user-center', desc :'个人中心', href : './user-center.html'},
            {name : 'order-list', desc :'我的订单', href : './order-list.html'},
            {name : 'pass-update', desc :'修改密码', href : './.pass-update.html'},
            {name : 'about', desc :'关于ZMALL', href : './about.html'}
        ]
    },
    init : function(option){
        //合并参数选项与默认选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染左侧导航菜单
    renderNav : function(){
        //根据传入option的name设置active数据
        for(var i = 0,iLength = this.option.navList.length; i< iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        };
        //渲染ul-side.html中的list数据
        var navHtml = _mm.renderHtml(temlateIndex,{
            navList : this.option.navList
        });
        //把html放入容器
        $('.nav-side').html(navHtml);
    }
}
module.exports = navSide;