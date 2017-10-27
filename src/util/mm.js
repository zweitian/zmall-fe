/*
* @Author: ztian
* @Date:   2017-10-20 11:18:01
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-27 13:04:33
*/
'use strict';
var Hogan = require('hogan');
var conf = {
    serverHost : ''
};
var _mm={
    request : function(param){
        var _this=this;
        $.ajax({
            type        : param.method    || 'get',
            url         : param.url       || '',
            dataType    : param.dataType  || 'json',
            data        : param.data      || '',
            success     : function(res){
                if(0 === res.status){
                    //若param.success为一个函数，则调用此函数
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //状态为10没有登录，强制登录
                else if(10 == res.status){
                    _this.doLogin();
                }
                //状态1 请求服务器数据出错
                else if (1 == res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            //ajax请求失败
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取请求url参数
    getUrlParam : function(name){
        //匹配请求url?后的参数 ？test=name  匹配出name
        var reg     = new RegExp('(&|^)' + name + '=([^&]*)(&|$)');
        //获取请求参数并去除？号，
        var result  = window.location.search.substring(1).match(reg);
        //获取正则表达式的第二组分组并返回
        return result ? decodeURIComponent(result[2]) : null;
    },
    //使用hogan渲染html模版  data为key-value对象，使用{{}}替换模版中的值
    renderHtml : function(htmlTemplate,data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    validate : function(value,type){
        //jquery去除字符串空格，并且把非字符串类型转成字符串类型
        var value=$.trim(value);
        //非空校验
        if('require' === type){
            return !!value;//两次取反,强转为布尔类型,字符串非空返回true,字符串空返回false
        }
        //手机号校验
        if('phone' === type){
            return /(13|14|15|18)[0-9]{9}/.test(value);//以1开头
        }
        //邮箱校验
        if('email' === type){
            return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value);
        }
    },
    //操作成功提示
    successTips : function(msg){
        alert(msg || '操作成功! ');
    },
    //操作失败提示
    errorTips : function(msg){
        alert(msg || '操作失败! ');
    },
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome  : function(){
        window.location.href = './index.html';
    }
}
module.exports=_mm;