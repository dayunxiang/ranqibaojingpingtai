webpackJsonp([4],{803:function(e,t,r){r(830);var a=r(298)(r(817),r(846),null,null);a.options.__file="E:\\project\\ranqibaojingpingtai\\src\\views\\dataCount\\StreetAlarmLog.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] StreetAlarmLog.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},811:function(e,t,r){"use strict";var a=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return a.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},812:function(e,t,r){"use strict";var a=Object.prototype.hasOwnProperty,n=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){for(var t;e.length;){var r=e.pop();if(t=r.obj[r.prop],Array.isArray(t)){for(var a=[],n=0;n<t.length;++n)void 0!==t[n]&&a.push(t[n]);r.obj[r.prop]=a}}return t};t.arrayToObject=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},a=0;a<e.length;++a)void 0!==e[a]&&(r[a]=e[a]);return r},t.merge=function(e,r,n){if(!r)return e;if("object"!=typeof r){if(Array.isArray(e))e.push(r);else{if("object"!=typeof e)return[e,r];(n.plainObjects||n.allowPrototypes||!a.call(Object.prototype,r))&&(e[r]=!0)}return e}if("object"!=typeof e)return[e].concat(r);var o=e;return Array.isArray(e)&&!Array.isArray(r)&&(o=t.arrayToObject(e,n)),Array.isArray(e)&&Array.isArray(r)?(r.forEach(function(r,o){a.call(e,o)?e[o]&&"object"==typeof e[o]?e[o]=t.merge(e[o],r,n):e.push(r):e[o]=r}),e):Object.keys(r).reduce(function(e,o){var i=r[o];return a.call(e,o)?e[o]=t.merge(e[o],i,n):e[o]=i,e},o)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,r){return e[r]=t[r],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),r="",a=0;a<t.length;++a){var o=t.charCodeAt(a);45===o||46===o||95===o||126===o||o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122?r+=t.charAt(a):o<128?r+=n[o]:o<2048?r+=n[192|o>>6]+n[128|63&o]:o<55296||o>=57344?r+=n[224|o>>12]+n[128|o>>6&63]+n[128|63&o]:(a+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(a)),r+=n[240|o>>18]+n[128|o>>12&63]+n[128|o>>6&63]+n[128|63&o])}return r},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],a=0;a<t.length;++a)for(var n=t[a],i=n.obj[n.prop],c=Object.keys(i),s=0;s<c.length;++s){var l=c[s],u=i[l];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:l}),r.push(u))}return o(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},813:function(e,t,r){"use strict";var a=r(815),n=r(814),o=r(811);e.exports={formats:o,parse:n,stringify:a}},814:function(e,t,r){"use strict";var a=r(812),n=Object.prototype.hasOwnProperty,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:a.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var r={},a=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,c=a.split(t.delimiter,i),s=0;s<c.length;++s){var l,u,d=c[s],f=d.indexOf("]="),p=-1===f?d.indexOf("="):f+1;-1===p?(l=t.decoder(d,o.decoder),u=t.strictNullHandling?null:""):(l=t.decoder(d.slice(0,p),o.decoder),u=t.decoder(d.slice(p+1),o.decoder)),n.call(r,l)?r[l]=[].concat(r[l]).concat(u):r[l]=u}return r},c=function(e,t,r){for(var a=t,n=e.length-1;n>=0;--n){var o,i=e[n];if("[]"===i)o=[],o=o.concat(a);else{o=r.plainObjects?Object.create(null):{};var c="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(c,10);!isNaN(s)&&i!==c&&String(s)===c&&s>=0&&r.parseArrays&&s<=r.arrayLimit?(o=[],o[s]=a):o[c]=a}a=o}return a},s=function(e,t,r){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=o.exec(a),l=s?a.slice(0,s.index):a,u=[];if(l){if(!r.plainObjects&&n.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}for(var d=0;null!==(s=i.exec(a))&&d<r.depth;){if(d+=1,!r.plainObjects&&n.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+a.slice(s.index)+"]"),c(u,t,r)}};e.exports=function(e,t){var r=t?a.assign({},t):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||a.isRegExp(r.delimiter)?r.delimiter:o.delimiter,r.depth="number"==typeof r.depth?r.depth:o.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:o.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:o.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:o.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:o.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:o.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:o.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:o.strictNullHandling,""===e||null===e||void 0===e)return r.plainObjects?Object.create(null):{};for(var n="string"==typeof e?i(e,r):e,c=r.plainObjects?Object.create(null):{},l=Object.keys(n),u=0;u<l.length;++u){var d=l[u],f=s(d,n[d],r);c=a.merge(c,f,r)}return a.compact(c)}},815:function(e,t,r){"use strict";var a=r(812),n=r(811),o={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,c={delimiter:"&",encode:!0,encoder:a.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},s=function e(t,r,n,o,i,s,l,u,d,f,p,g){var y=t;if("function"==typeof l)y=l(r,y);else if(y instanceof Date)y=f(y);else if(null===y){if(o)return s&&!g?s(r,c.encoder):r;y=""}if("string"==typeof y||"number"==typeof y||"boolean"==typeof y||a.isBuffer(y)){if(s){return[p(g?r:s(r,c.encoder))+"="+p(s(y,c.encoder))]}return[p(r)+"="+p(String(y))]}var m=[];if(void 0===y)return m;var v;if(Array.isArray(l))v=l;else{var h=Object.keys(y);v=u?h.sort(u):h}for(var b=0;b<v.length;++b){var j=v[b];i&&null===y[j]||(m=Array.isArray(y)?m.concat(e(y[j],n(r,j),n,o,i,s,l,u,d,f,p,g)):m.concat(e(y[j],r+(d?"."+j:"["+j+"]"),n,o,i,s,l,u,d,f,p,g)))}return m};e.exports=function(e,t){var r=e,i=t?a.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var l=void 0===i.delimiter?c.delimiter:i.delimiter,u="boolean"==typeof i.strictNullHandling?i.strictNullHandling:c.strictNullHandling,d="boolean"==typeof i.skipNulls?i.skipNulls:c.skipNulls,f="boolean"==typeof i.encode?i.encode:c.encode,p="function"==typeof i.encoder?i.encoder:c.encoder,g="function"==typeof i.sort?i.sort:null,y=void 0!==i.allowDots&&i.allowDots,m="function"==typeof i.serializeDate?i.serializeDate:c.serializeDate,v="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:c.encodeValuesOnly;if(void 0===i.format)i.format=n.default;else if(!Object.prototype.hasOwnProperty.call(n.formatters,i.format))throw new TypeError("Unknown format option provided.");var h,b,j=n.formatters[i.format];"function"==typeof i.filter?(b=i.filter,r=b("",r)):Array.isArray(i.filter)&&(b=i.filter,h=b);var w=[];if("object"!=typeof r||null===r)return"";var O;O=i.arrayFormat in o?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var A=o[O];h||(h=Object.keys(r)),g&&h.sort(g);for(var N=0;N<h.length;++N){var x=h[N];d&&null===r[x]||(w=w.concat(s(r[x],x,A,u,d,f?p:null,b,g,y,m,j,v)))}var L=w.join(l),D=!0===i.addQueryPrefix?"?":"";return L.length>0?D+L:""}},817:function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0});var n=r(813);r.n(n);t.default={name:"alarmLog",data:function(){var e;return e={pageNumber:1,pageSize:10,column:[{type:"index",title:"序号",width:80,align:"center"},{title:"设备名",key:"nickname",align:"center"},{title:"值",key:"ch4",align:"center"},{title:"时间",key:"date",align:"center",render:function(e,t){if(t.row.date)return t.row.date.substr(0,t.row.date.indexOf("."))}},{title:"手机号",key:"alarmTel",width:210,align:"center",render:function(e,t){for(var r=t.row.alarmTel.split(","),a=[],n=0;n<r.length;n++)a.push(e("span",{style:{margin:"3px"}},r[n])),(n+1)%2==0&&a.push(e("br"));return a}},{title:"地址",key:"address",align:"center"}],njAreaData:[],addressVal:"",streetVal:"",total:0},a(e,"pageNumber",1),a(e,"pageSize",10),a(e,"tableData",[]),a(e,"deviceList",[]),e},watch:{njAreaData:function(e){this.getAddressVal()},deviceList:function(e){this.changePageNumber(1)}},mounted:function(){},methods:{getAddressVal:function(){var e=this;this.njAreaData.map(function(t){if(t.id==e.$route.params.aid)for(var r=0;r<t.street.length;r++)t.street[r].id==e.$route.params.sid&&(e.streetVal=t.street[r].street)})},changePageNumber:function(e){var t=this;this.pageNumber=e||1;var r=[];this.axios({method:"get",url:"device/alarms",params:{sid:this.$route.params.sid,pageSize:this.pageSize,pageNumber:this.pageNumber}}).then(function(e){if(console.log(0==e.data.resultFlag),!1!==e.data.resultFlag){r=e.data.rows,t.total=e.data.total,t.tableData=[];for(var a=0;a<r.length;a++)!function(e){new Promise(function(a){for(var n=0;n<t.deviceList.length;n++)t.deviceList[n].id==r[e].dId&&(r[e].nickname=t.deviceList[n].nickname,r[e].aid=t.deviceList[n].aid,r[e].sid=t.deviceList[n].sid,r[e].imsi=t.deviceList[n].imsi,r[e].address=t.deviceList[n].address,a(r[e]))}).then(function(e){t.njAreaData.map(function(r){var a="";if(e.aid==r.id){a+="江苏省 南京市 "+r.county;for(var n=0;n<r.street.length;n++)e.sid==r.street[n].id&&(a+=" "+r.street[n].street,e.address=a+" "+e.address,t.tableData.push(e))}})})}(a)}}).catch(function(e){t.$Notice.error({title:"错误",desc:"获取街道报警数据时出错"})})},changePageSize:function(e){this.pageSize=e,this.changePageNumber()},getAreaDevice:function(){var e=this;this.axios.get("device/devices?aid="+this.$route.params.aid+"&pageNumber=1&pageSize=3000").then(function(t){e.deviceList=t.data.rows}).catch(function(t){e.$Notice.error({title:"错误",desc:"获取设备数据时出错"})})}},computed:{},created:function(){var e=this;new Promise(function(t){e.axios.get("region/countyAndStreet",{params:{id:830}}).then(function(r){var a=r.data;a.resultFlag?t(a.data):e.$Notice.error({title:"错误",desc:"获取区域数据时出错"})}).catch(function(t){e.$Notice.error({title:"错误",desc:"获取区域数据时服务出错"})})}).then(function(t){e.njAreaData=t,e.getAreaDevice()})}}},830:function(e,t){},846:function(e,t,r){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"alarmLog_wrap"},[r("Row",[r("Col",{staticClass:"breadcrumb",attrs:{span:"18"}},[r("Breadcrumb",[r("Breadcrumb-item",{attrs:{href:"/dataCount"}},[e._v("数据统计")]),e._v(" "),r("Breadcrumb-item",[e._v(e._s(e.streetVal))])],1)],1)],1),e._v(" "),r("Row",{staticClass:"alarmLog"},[r("Col",{staticClass:"deviceCon",attrs:{span:"18"}},[r("Table",{attrs:{border:"",columns:e.column,data:e.tableData}}),e._v(" "),r("Page",{attrs:{total:e.total,placement:"top","page-size":e.pageSize,"show-total":"","show-sizer":""},on:{"on-change":e.changePageNumber,"on-page-size-change":e.changePageSize}})],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});