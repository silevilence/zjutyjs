// ==UserScript==
// @name         zjutyjs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  improve the selectCourse pages
// @author       Silevilence
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js
// @match        http://yjs.zjut.edu.cn/tasks/selectCourse-tree.asp
// @match        http://yjs.zjut.edu.cn/tasks/selectCourse-master.asp
// @match        http://yjs.zjut.edu.cn/tasks/selectCourse.asp
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    // 提取课程号和班级号的正则
    const regId = /selectCourse-detail-noLearn.asp\?kcbh=(\d+)&bjdm=(\d+)/;

    // 删除课程的表格
    let links_del = $('form[action="selectCourse-tree-DelItem.asp"] table tbody tr td a');
    links_del.each(function () {
    let href = $(this).attr('href');
    let ids = regId.exec(href);
    let courseId = ids[1];
                       // noinspection SpellCheckingInspection
                       $(this).parent().prev().prev().html(`<input type="checkbox" name="ckbdel" value="${courseId}">`);
                       });

                       // 增加课程的表格
                       let links_add = $('form[action="selectCourse-master-AddItem.asp"] table tbody tr td a');
                       links_add.each(function () {
                       let href = $(this).attr('href');
                       let ids = regId.exec(href);
                       let courseId = ids[1],
                  classId =  ids[2];
                  // noinspection SpellCheckingInspection
                  $(this).parent().prev().prev().html(`<input type="checkbox" name="cboke" value="${courseId}${classId}">`);
});


/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
