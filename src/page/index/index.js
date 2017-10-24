/*
* @Author: ztian
* @Date:   2017-10-24 11:18:24
* @Last Modified by:   ztian
* @Last Modified time: 2017-10-24 22:46:17
*/
'use strict'
console.log('hello index');
require('./index.css');
var _mm=require('util/mm.js');
var html = '<div>{{info}}</div>';
var data={
    info:'info'
};
console.log(_mm.renderHtml(html,data));