webpackJsonp([7],{812:function(e,a,n){n(835);var t=n(299)(n(827),n(851),null,null);t.options.__file="D:\\Project\\ranqibaojingpingtai\\src\\views\\map\\Map.vue",t.esModule&&Object.keys(t.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),t.options.functional&&console.error("[vue-loader] Map.vue: functional components are not supported with templates, they should use render functions."),e.exports=t.exports},827:function(e,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{bMap:null,njAreaData:[],markerData:[],areaMarkerData:[],listShow:!0,audioOnOff:0,goEasy:null,opts:{width:640,height:420,enableMessage:!0}}},watch:{audioOnOff:function(e){e>=1?document.getElementById("siren").play():document.getElementById("siren").pause()}},methods:{bMapInit:function(){var e=new BMap.Map("map",{enableMapClick:!1});this.bMap=e,e.centerAndZoom(new BMap.Point(118.823513,32.020812),14),e.addControl(new BMap.MapTypeControl),e.setCurrentCity("南京"),e.enableScrollWheelZoom(!0),e.setMapStyle({styleJson:[{featureType:"railway",elementType:"geometry.stroke",stylers:{visibility:"off"}},{featureType:"label",elementType:"all",stylers:{}}]}),this.makePoint(e)},makePoint:function(e){var a=this;e.clearOverlays(),this.axios("device/listAllDevice?pageIndex=1&pageSize=100000").then(function(n){n.data.data.forEach(function(n,t){"4.9E-324"!=n.x&&"4.9E-324"!=n.y&&n.x>73.255024&&n.x<135.437887&&n.y>2.820272&&n.y<53.829599||(n.x=a.randomNumBoth(118.726818,118.887794),n.y=a.randomNumBoth(31.98072,32.082593)),a.njAreaData.map(function(e){var a="";if(n.aid==e.id){a+="江苏省 南京市 "+e.county;for(var t=0;t<e.street.length;t++)n.sid==e.street[t].id&&(a+=" "+e.street[t].street,n.address=a+" "+n.address)}});var i=new BMap.Point(n.x,n.y),s=new BMap.Icon("./img/marker1.png",new BMap.Size(25,27)),o=new BMap.Marker(i,{icon:s});o.setTitle(n.address),e.addOverlay(o),o.mesData=n,a.$set(o,"isWarn","normal"),a.markerData.push(o),a.addClickHandler(e,o)}),a.watchPoint(e)}).catch(function(e){a.$Notice.error({title:"错误",desc:"请求设备时服务出错"})})},watchPoint:function(e){var a=this;this.goEasy=new GoEasy({appkey:"BC-7d00ae382f2f42cd904b263af6a76ff0"}),this.goEasy.subscribe({channel:"gasalarm",onMessage:function(e){var n=JSON.parse(e.content);console.log(n);for(var t in n)!function(e){a.markerData.map(function(t){if(e==t.mesData.id)if("1"==n[e]){"warning"!=t.isWarn&&(console.log("是报警加1"),a.audioOnOff=a.audioOnOff+1),t.isWarn="warning",t.setZIndex(1e4),t.setAnimation(BMAP_ANIMATION_BOUNCE),document.getElementById("siren").play();var i=new BMap.Icon("./img/marker2.png",new BMap.Size(25,27),{});t.setIcon(i)}else if("0"==n[e]){t.isWarn="notice",t.setZIndex(5e3);var s=new BMap.Icon("./img/marker4.png",new BMap.Size(25,27),{});t.setIcon(s)}else if("2"==n[e]){t.isWarn="normal";var o=new BMap.Icon("./img/marker1.png",new BMap.Size(25,27),{});t.setIcon(o)}})}(t)},onSuccess:function(){console.log("监听开启")},onFailed:function(e){console.log("监听失败, 错误编码："+e.code+" 错误信息："+e.content)}})},addClickHandler:function(e,a){a.addEventListener("click",function(n){var t=this;a.setAnimation(null),new Promise(function(n){t.geoUtils(e,a),n()}).then(function(){t.openInfo(e,a)})}.bind(this))},clickOpenInfo:function(e){e.setAnimation(null),this.openInfo(this.bMap,e,!0)},geoUtils:function(e,a){this.areaMarkerData=[];var n=[],t=new BMap.Point(a.point.lng-6e-5,a.point.lat+6e-5),i=new BMap.Point(a.point.lng+7e-5,a.point.lat+6e-5),s=new BMap.Point(a.point.lng+7e-5,a.point.lat-7e-5),o=new BMap.Point(a.point.lng-6e-5,a.point.lat-7e-5);n.push(t),n.push(i),n.push(s),n.push(o);for(var r=new BMap.Polygon(n),c=0;c<this.markerData.length;c++){var l=new BMap.Point(this.markerData[c].point.lng,this.markerData[c].point.lat);1==BMapLib.GeoUtils.isPointInPolygon(l,r)&&(this.areaMarkerData.push(this.markerData[c]),this.listShow=!0)}},openInfo:function(e,a,n){var t=this,i="";new Promise(function(e){var n=[],i={alarmNum:0,seccon:""};t.axios("alarm/queryAlarmRecords?did="+a.mesData.id+"&pageNumber=1&pageSize=10000").then(function(t){var s=t.data;s.resultFlag&&(n=s.data.rows,i.alarmNum=s.data.total,n<1?(i.seccon+='<tr><td class="time" style="text-align:center;">暂无记录</td>',e(i)):(n.forEach(function(e,n){a.mesData.id==e.dId&&(e.date?i.seccon+='<tr><td class="time">'+e.date.slice(0,e.date.indexOf("."))+'</td><td class="tel">推送'+e.alarmTel.replace(/,/g,"  ")+"</td></tr>":i.seccon+='<tr><td class="time">无</td><td class="tel">推送'+e.alarmTel.replace(/,/g,"  ")+"</td></tr>")}),e(i)))}).catch(function(e){t.$Notice.error({title:"错误",desc:"查询报警记录时服务出错"})})}).then(function(s){var o='<div class="deviceInfor"><div class="deviceUserInfor"><p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>'+a.mesData.nickname+'</span></p><p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>'+a.mesData.arlarmTels+'</span></p><p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>'+a.mesData.imsi+'</span></p><p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>'+a.mesData.address+'</span></p></div><div class="deviceAlarmInfor"><h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b><span id="alarmDetial">详情 >></span></h3><div class="alarmTableWrap"><table class="alarmTable">',r='</table><div></div></div><p><span id="alarmCount">共计报警<b>'+s.alarmNum+"</b>次</span></p>";if(i+=o+s.seccon+r,t.areaMarkerData.length<=1||n){var c=new BMap.Point(a.point.lng,a.point.lat),l=new BMap.InfoWindow(i,t.opts);e.openInfoWindow(l,c),t.infoWindowOpen(l,a),t.infoWindowClose(l,a)}})},infoWindowOpen:function(e,a){e.addEventListener("open",function(e,n,t){var i=this;"warning"==a.isWarn&&(this.audioOnOff=this.audioOnOff-1),a.setAnimation(null);var s=document.getElementsByClassName("BMap_pop")[0];document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e){e.target&&"alarmDetial"==e.target.id&&this.$router.push({name:"deviceLog",params:{id:a.mesData.id}})}.bind(this),!1),"warning"==a.isWarn?this.addClass(s,"active"):this.removeClass(s,"active"),this.infoWindowOpen=function(e,a){document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e){e.target&&"alarmDetial"==e.target.id&&this.$router.push({name:"deviceLog",params:{id:a.mesData.id}})}.bind(i),!1),"warning"==a.isWarn&&(i.audioOnOff=i.audioOnOff-1),a.setAnimation(null),"warning"==a.isWarn?i.addClass(s,"active"):i.removeClass(s,"active")}}.bind(this)),document.getElementById("alarmDetial")&&document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e){e.target&&"alarmDetial"==e.target.id&&this.$router.push({name:"deviceLog",params:{id:a.mesData.id}})}.bind(this),!1)},infoWindowClose:function(e,a){e.addEventListener("close",function(e){if("notice"==a.isWarn){var n=new BMap.Icon("./img/marker4.png",new BMap.Size(25,27),{});a.setIcon(n)}else if("warning"==a.isWarn){a.isWarn="caution";var t=new BMap.Icon("./img/marker3.png",new BMap.Size(25,27),{});a.setIcon(t)}else if("caution"==a.isWarn){a.isWarn="caution";var i=new BMap.Icon("./img/marker3.png",new BMap.Size(25,27),{});a.setIcon(i)}else{a.isWarn="normal";var s=new BMap.Icon("./img/marker1.png",new BMap.Size(25,27),{});a.setIcon(s)}}.bind(this))},closeList:function(){this.listShow=!1},addClass:function(e,a){for(var n=e.className,t=""!=n?" ":"",i=n+t+a,s=i.split(" "),o=[],r=0;r<s.length;r++)-1==o.indexOf(s[r])&&o.push(s[r]);e.className=o.join(" ")},removeClass:function(e,a){var n=" "+e.className+" ";n=n.replace(/(\s+)/gi," ");var t=n.replace(" "+a+" "," ");t=t.replace(/(^\s+)|(\s+$)/g,""),e.className=t},randomNumBoth:function(e,a){var n=a-e;return e+Math.random()*n}},created:function(){var e=this;new Promise(function(a){e.axios.get("region/countyAndStreet",{params:{id:830}}).then(function(n){var t=n.data;t.resultFlag?a(t.data):e.$Notice.error({title:"错误",desc:"获取区域数据时出错"})}).catch(function(a){e.$Notice.error({title:"错误",desc:"获取区域数据时服务出错"})})}).then(function(a){e.njAreaData=a,e.bMapInit()})},computed:{listShows:function(){return this.areaMarkerData.length>1}},mounted:function(){},beforeDestroy:function(){this.audioOnOff=0},destroyed:function(){this.goEasy&&this.goEasy.unsubscribe({channel:"gasalarm",onSuccess:function(){console.log("取消监听成功。")},onFailed:function(e){console.log("取消监听失败，错误编码："+e.code+" 错误信息："+e.content)}})}}},835:function(e,a){},851:function(e,a,n){e.exports={render:function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"map"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.listShows&&e.listShow,expression:"listShows&&listShow"}],staticClass:"alarmsList"},[n("div",{staticClass:"closeWrap"},[n("i",{staticClass:"ivu-icon icon-guanbi closeList",on:{click:e.closeList}})]),e._v(" "),n("div",{staticClass:"list"},[n("ul",e._l(e.areaMarkerData,function(a){return n("li",{class:a.isWarn,on:{click:function(n){e.clickOpenInfo(a)}}},[n("p",[n("i",{staticClass:"ivu-icon icon-device"}),n("b",[e._v("设 备 名 ")]),e._v("："),n("span",[e._v(e._s(a.mesData.nickname))])]),e._v(" "),n("p",[n("i",{staticClass:"ivu-icon icon-dingwei"}),n("b",[e._v("地 址")]),e._v("："),n("span",[e._v(e._s(a.mesData.address))])])])}))])]),e._v(" "),n("div",{attrs:{id:"map"}}),e._v(" "),e._m(0)])},staticRenderFns:[function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("audio",{attrs:{id:"siren",loop:"loop"}},[n("source",{attrs:{src:"./source/119.wav"}}),e._v(" "),n("source",{attrs:{src:"./source/119.mp3"}}),e._v("\n      Your browser does not support the audio element.\n  ")])}]},e.exports.render._withStripped=!0}});