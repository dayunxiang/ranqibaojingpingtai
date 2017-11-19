
<!-- 我想换个方法做 没成功 -->

<style lang="scss">
@font-face {
    font-family: "Ionicons";
    src: url('../../iconfont/mapIconfont.eot?t=1502947190921');
    /* IE9*/
    src:url('../../iconfont/mapIconfont.eot?t=1502947190921#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('../../iconfont/mapIconfont.woff?t=1502947190921') format('woff'),
    /* chrome, firefox */
    url('../../iconfont/mapIconfont.ttf?t=1502947190921') format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url(  '../../iconfont/mapIconfont.svg?t=1502947190921#iconfont') format('svg');
    /* iOS 4.1- */
}



.icon-dingwei:before {
    content: "\e62f";
}
.icon-imsi:before {
    content: "\e702";
}
.icon-tanhao:before {
    content: "\e67f";
}
.icon-device:before {
    content: "\e602";
}
.icon-dianhua:before {
    content: "\e60";
}
.icon-guanbi:before {
    content: "\e635";
}
.icon-user:before {
    content: "\e838";
}
.icon-imsi-c:before {
    content: "\e839";
}
.map {
    height: 100%;
    width: 100%;
    #map {
        height: 100%;
        width: 100%;
    }
    .BMap_Marker {
        & > div {
            width: 100%;
            height: 100%;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    .BMap_pop {
        div {
            border: 0!important;
        }
        & > div:nth-of-type(8) {
            display: none;
        }
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        .BMap_bottom {
            overflow: visible!important;
            &:after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                position: absolute;
                top: 24px;
                bottom: 0;
                left: 274px;
                right: 0;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                border-top: 20px solid #fff;
            }
        }
        .BMap_bubble_content {
            width: 100%!important;
            height: 100%!important;
        }

        .deviceInfor {
            position: absolute;
            top: 20px;
            bottom: 20px;
            left: 20px;
            right: 20px;
            .deviceUserInfor {

                & > p {
                    font-size: 16px;
                    line-height: 28px;
                    i {
                        display: inline-block;
                        width: 28px;
                        height: 28px;
                        float: left;
                        position: relative;
                        color: #3b6ceb;
                        &:before {
                            display: block;
                            position: absolute;
                            width: 18px;
                            height: 20px;
                            font-size: 20px;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                        }
                    }
                    b {
                        font-weight: normal;
                        display: inline-block;
                        width: 80px;
                        text-align: justify;
                        text-align-last: justify;
                    }
                    span {
                        color: #3b6ceb;
                    }
                }

            }

            .deviceAlarmInfor {
                margin-top: 20px;
                #alarmCount{
                  display: inline-block;
                  margin-left: 10px;
                  font-size: 14px;
                  line-height: 26px;
                  &>b{
                    margin:0 4px;
                  }
                }
                & > h3 {

                  #alarmDetial{
                    font-weight: normal;
                    cursor:pointer;
                    font-size: 14px;
                    line-height: 24px;
                    float:right;
                    &:hover{
                      color:#3b6ceb;
                    }
                  }

                    b {
                        font-weight: normal;
                    }
                    i {
                        display: inline-block;
                        width: 28px;
                        height: 28px;
                        float: left;
                        position: relative;
                        color: #f44f60;
                        &:before {
                            display: block;
                            position: absolute;
                            width: 18px;
                            height: 26px;
                            font-size: 20px;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                        }
                    }
                    font-size: 16px;
                }
                .alarmTableWrap {
                    width: 100%;
                    height: 180px;
                    overflow-y: auto;
                    border-top: 1px solid #333!important;
                    border-bottom: 1px solid #333!important;
                }
                .alarmTable {
                    width: 100%;
                    border: 0!important;
                    border-collapse:collapse;
                    tr {
                       &:hover{
                         background: #517aff;
                         color:#fff;
                       }
                       &+tr{
                         border-top: 1px solid #333;
                         border-bottom: 1px solid #333;

                       }

                        td {
                            line-height: 36px;
                            font-size: 14px;
                            text-align: center;
                            &.time {

                                width: 140px;
                                text-align: center;
                                vertical-align:middle;
                            }
                            &.tel {
                                text-align: center;
                                width: 296px;
                            }
                        }
                    }
                }
            }
        }
    }

    .BMap_pop.active {
        div {
            background: #f54358!important;
            color: #fff;
        }
        .BMap_bottom {
            &:after {

                border-top: 20px solid #f54358;
            }
        }

        .deviceInfor {

            .deviceUserInfor {

                & > p {
                    i {
                        color: #fff;
                    }
                    span {
                        color: #fff;
                    }
                }

            }
            .deviceAlarmInfor {
              #alarmCount{

              }
                & > h3 {

                #alarmDetial{

                }

                    i {
                        color: #fff;
                    }
                }
                .alarmTableWrap {
                    width: 100%;
                    height: 200px;
                    overflow-y: auto;
                    border-top: 1px solid #fff!important;
                    border-bottom: 1px solid #fff!important;
                }
                .alarmTable {
                    tr {
                        border-top: 1px solid #fff;
                        border-bottom: 1px solid #fff;
                        &:hover{
                          background: #f44f60;
                          color:#fff;
                        }
                    }
                }
            }
        }
    }
    .alarmsList {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 1000;
        padding: 17px 0;
        background: rgba(40,40,40,.8);
        // border:1px solid #333;
        .closeWrap {
            position: relative;
            float: right;
            height: 48px;
            width: 30px;
            .closeList {
                position: absolute;
                z-index: 100000;
                right: 10px;
                color: #fff;
                cursor: pointer;
            }
        }
        .list {
            position: absolute;
            left: 0;
            right: 30px;
            overflow: auto;
            & > ul {
                white-space: nowrap;
                height: 48px;
                & > li {
                    display: inline-block;
                    padding: 5px;
                    margin: 0 8px;
                    cursor: pointer;
                    border: 1px solid #333;
                    background: #fff;
                    color: #333;

                    &.warning {
                        position: relative;
                        &:after {
                            animation: insetShadow 1s linear infinite;
                            animation-direction: alternate;
                            content: '';
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            box-shadow: inset 0 0 70px 50px red;

                        }

                    }
                    &.caution {
                        position: relative;
                        &:after {

                            content: '';
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: rgba(247,192,0,0.4);

                        }

                    }
                    &.notice {
                        position: relative;
                        &:after {

                            content: '';
                            display: block;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: rgba(90,90,90,0.7);

                        }

                    }
                    &.normal {
                        position: relative;
                        &:after {
                            opacity: 0;
                        }

                    }
                }
            }
        }

    }
    //去掉百度地图左下角标志
    .BMap_cpyCtrl {
        display: none;
    }
    .anchorBL {
        display: none;
    }
}
@keyframes insetShadow {
    0% {
        opacity: 0;
    }
    25% {
        opacity: 0.21;
    }
    50% {
        opacity: 0.48;
    }
    75% {
        opacity: 0.7;
    }
    100% {
        opacity: 0.8;
    }
}
.ivu-notice {
    top: 90px!important;
    bottom: 0;
    overflow: hidden;
}
</style>
<template lang="html">
  <div class="map">
      <div class="alarmsList" v-show="listShows&&listShow">
        <div class="closeWrap">
          <i class="ivu-icon icon-guanbi closeList" @click="closeList"></i>
        </div>
        <div class="list">
          <ul>
            <li v-for="items in areaPointData" @click="clickOpenInfo(items)" :class="items.value[2].isWarn">
              <!-- <p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>{{items.mesData.name}}</span></p> -->
              <p><i class="ivu-icon icon-device"></i><b>设 备 名 </b>：<span>{{items.value[2].nickname}}</span></p>
              <p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>{{items.value[2].addressDetail}}</span></p>
            </li>
          </ul>
        </div>
      </div>

      <div id="map" style="width:100%;height:100%;"></div>
      <audio id="siren" loop="loop">
        <source src="./src/img/119.wav">
        <source src="./src/img/119.mp3">
          Your browser does not support the audio element.
      </audio>

  </div>
</template>

<script>
export default {
  name: 'map',
  data() {
    return {
      //南京范围内的行政区域
      njAreaData:[],
      //地图中的数据点
      pointData: [],
      //多个点重合列表显示
      areaPointData: [],
      //百度地图信息窗口显示
      listShow: true,
      bMap:null,
      opts: {
        width: 640, // 信息窗口宽度
        height: 420, // 信息窗口高度
        enableMessage: true //设置允许信息窗发送短息
      },
      //echarts option属性
      option: {
        tooltip: {
          trigger: 'item',
          confine: true, //超出隐藏
          position: function(point, params, dom, rect, size) {
            var top = document.querySelector('.BMap_mask').style.top;
            var left = document.querySelector('.BMap_mask').style.left;
            top = top.substring(0, top.length - 2);
            left = left.substring(0, left.length - 2);
            return [point[0] + 20 - left, point[1] + 20 - top];
          },
          formatter: (params)=>{
            // console.log(params.value[2])

            this.njAreaData.map((items) => {
              let address = ''
              if(params.value[2].aid==items.id){
                address+='江苏省 南京市 '+items.county;
                for(let j=0;j<items.street.length;j++){
                  if(params.value[2].sid==items.street[j].id){
                    address+=' '+items.street[j].street;
                    params.value[2].addressDetail=''
                    params.value[2].addressDetail=address+' '+params.value[2].address
                    // resolve()
                  }
                }
              }
            })
            let str = ''
            str += '<div style="color:#fff;">' +
              '<p>' + params.value[2].nickname + '</p>' +
              '<p>'+params.value[2].addressDetail+'</p>'+
              '</div>'
            return str
          }
        },
        bmap: { // 加载 bmap 组件
          center: [118.798811,32.037492], // 百度地图中心经纬度
          zoom: 15, // 百度地图缩放
          roam: true, // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          mapStyle: { // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
            styleJson: [{
                "featureType": "railway",
                "elementType": "geometry.stroke",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": {
                  "visibility": "off"
                }
              },
              {
                "featureType": "label",
                "elementType": "all",
                "stylers": {}
              }
            ]
          }
        },
        series: [

          {
            type: 'scatter', // 使用百度地图坐标系
            coordinateSystem: 'bmap', // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [],
            symbol: 'image://./src/img/marker1.png',
            symbolSize: function(val) {
              return [22, 24];
            }
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: [],
            symbol:'image://./src/img/marker2.png',
            scale:100,
            symbolSize: function (val) {
                return [22,24];
            },
            zlevel: 1
          }

        ]
      }
    }
  },
  computed: {
    listShows() {
      // console.log(this.areaPointData)
      return this.areaPointData.length > 1 ? true : false
    }
  },
  mounted() {
  },
  methods: {
    initBMap() {
      var myChart = echarts.init(document.getElementById('map'));
      this.myChart=myChart

      this.axios('device/listAllDevice?pageIndex=1&pageSize=10000')
        .then(res => {
          let data = res.data.data;
          let echartsArr = [];
          data.map((item) => {
            let obj = {
              name: item.id,
              value: [item.x, item.y, item]
            }
            echartsArr.push(obj)
          })

          this.option.series[0].data=echartsArr
          // this.pointData=this.option.series[0].data
          // this.option.series[0].data=this.option.series[0].data

          myChart.setOption(this.option);
          var bMap = myChart.getModel().getComponent('bmap').getBMap();
          this.bMap=bMap
          myChart.resize()
          this.watchPoint(bMap,myChart)
          myChart.resize()
          myChart.on('click', (params) => {
            // console.log(params)
            // params.data.symbol='image://./src/img/marker2.png'
            this.option.series[0].data.map((item)=>{
              if(params.data.name==item.name){
                new Promise((resolve) => {
                  this.geoUtils(bMap, item); //
                  resolve()
                }).then(() => {
                  this.openInfo(bMap, item); //打开弹框
                })
              }
            })

            myChart.resize()
          })
        })
        .catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '请求设备时服务出错'
          });
        })

    },
    watchPoint(bMap,myChart) { //每个点的间歇监听
      let warning=[]//报警的
      let notice=[]//离线的
      let normal=[]//在线的
      let aa=(message)=>{
        // console.log(message)
        let data=message;

        for(let key in data){
        // console.log(key+'__'+data[key])
          this.option.series[0].data.map((item)=>{
              if(key==item.value[2].id){
                if(data[key]=='1'){//报警
                  // console.log(item);
                  if(item.value[2].isWarn!='warning'){
                    warning.push(item);
                  }
                  this.$set(item.value[2],'isWarn','warning')
                  this.$set(item,'symbol','image://./src/img/marker2.png');
                  this.$set(item,'z',10000)
                  // this.option.series[1].data.push(item);

                }else if(data[key]=='0'){//离线
                  this.$set(item.value[2],'isWarn','notice')
                  this.$set(item,'symbol','image://./src/img/marker4.png');
                  this.$set(item,'z',5000)
                }else if(data[key]=='2'){//上线'
                  this.$set(item.value[2],'isWarn','normal')
                  this.$set(item,'symbol','image://./src/img/marker1.png');
                }
              }else{

              }
            })
            this.$set(this.option.series[1],'data',warning)
            myChart.setOption({
              series: [
                {
                  type: 'scatter',
                  data: this.option.series[0].data,
                },
                {
                    type: 'effectScatter',
                    data: this.option.series[1].data,
                }

              ]
            });
            // console.log(this.option.series[1].data)
        }

      }

      aa({3407:1})
      setTimeout(()=>{
        aa({283:0})
      },100)
      setTimeout(()=>{
        aa({383:1})
      },115)
      setTimeout(()=>{
        aa({1134:0})
      },126)
      setTimeout(()=>{
        aa({521:1})
      },140)

      setTimeout(()=>{
        // aa({2082:1})
      },178)

      setTimeout(()=>{
        aa({909:1})
      },200)
      setTimeout(()=>{
        aa({844:0})
      },250)
      setTimeout(()=>{
        aa({2080:1})
      },300)
      var sss=setInterval(()=>{
        aa({3407:1})
        setTimeout(()=>{
          aa({283:0})
        },100)
        setTimeout(()=>{
          aa({383:1})
        },115)
        setTimeout(()=>{
          aa({1134:0})
        },126)
        setTimeout(()=>{
          aa({521:1})
        },140)

        setTimeout(()=>{
          // aa({2082:1})
        },178)

        setTimeout(()=>{
          aa({909:1})
        },200)
        setTimeout(()=>{
          aa({844:0})
        },250)
        setTimeout(()=>{
          aa({2080:1})
        },300)
      },40000)
    },
    //点重合范围判定
    geoUtils(bMap, params) {
      //首先清空区域数据
      this.areaPointData=[]

      //多边形区域
      let poly=[
        [params.value[0] - 0.00006, parseFloat(params.value[1]) + 0.00005],
        [parseFloat(params.value[0]) + 0.00006, parseFloat(params.value[1]) + 0.00005],
        [parseFloat(params.value[0]) + 0.00006, params.value[1] - 0.00005],
        [params.value[0] - 0.00006, params.value[1] - 0.00005]
      ];
      for (let i = 0; i < this.option.series[0].data.length; i++) {
         //每个点
        let p=[this.option.series[0].data[i].value[0],this.option.series[0].data[i].value[1]]
        //判断此点是否在设定区域内
        let result =rayCasting(p, poly);
        this.njAreaData.map((items) => {
          let address = ''
          if(this.option.series[0].data[i].value[2].aid==items.id){
            address+='江苏省 南京市 '+items.county;
            for(let j=0;j<items.street.length;j++){
              if(this.option.series[0].data[i].value[2].sid==items.street[j].id){
                address+=' '+items.street[j].street;
                this.option.series[0].data[i].value[2].addressDetail=''
                this.option.series[0].data[i].value[2].addressDetail=address+' '+this.option.series[0].data[i].value[2].address

              }
            }
          }
        })
        if (result == true) {
          this.areaPointData.push(this.option.series[0].data[i]);
          console.log("点在范围nei");

          this.listShow = true;
        } else {
          // console.log("点在范围外");
        }
      }



      function rayCasting(p, poly) {
        var px = p[0],
          py = p[1],
          flag = false
        for (var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
          var sx = poly[i][0],
            sy = poly[i][1],
            tx = poly[j][0],
            ty = poly[j][1]
            // console.log(sx)
          // 点与多边形顶点重合
          if ((sx === px && sy === py) || (tx === px && ty === py)) {
            return true
          }
          // 判断线段两端点是否在射线两侧
          if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
            // 线段上与射线 Y 坐标相同的点的 X 坐标
            var x = sx + (py - sy) * (tx - sx) / (ty - sy)
            // 点在多边形的边上
            if (x === px) {
              return true
            }
            // 射线穿过多边形的边界
            if (x > px) {
              flag = !flag
            }
          }
        }
        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag ? true : false
      }
      // console.log(this.areaPointData)
    },
    openInfo(bMap, params, onOff) {
      console.log(params)
      let content = '';
      let seccon = '';
      // console.log(marker)

      new Promise((reslove) => {
        let alarmsArr = [];
        let alarmMes = {
          alarmNum: 0,
          seccon: ''
        };
        this.axios('alarm/queryAlarmRecords?did=' + params.value[2].id + '&pageNumber=1&pageSize=10000')
          .then(function(res) {
            // console.log(res)
            let data = res.data
            if (data.resultFlag) {
              alarmsArr = data.data.rows;
              alarmMes.alarmNum = data.data.total;
              if (alarmsArr < 1) {
                alarmMes.seccon += '<tr>' +
                  '<td class="time" style="text-align:center;">' + "暂无记录" + '</td>'
                '</tr>';
                reslove(alarmMes);
              } else {

                alarmsArr.forEach(function(item, index) {
                  // if (marker.mesData.id == item.dId) {
                  // ++alarmMes.alarmNum;
                  // alarmsArr.push(item)
                  if (item.date) {
                    alarmMes.seccon += '<tr>' +
                      '<td class="time">' + item.date.slice(0, item.date.indexOf('.')) + '</td>' +
                      '<td class="tel">推送' + item.alarmTel.replace(/,/g, '  ') + '</td>' +
                      '</tr>';

                  } else {
                    alarmMes.seccon += '<tr>' +
                      '<td class="time">' + '无' + '</td>' +
                      '<td class="tel">推送' + item.alarmTel.replace(/,/g, '  ') + '</td>' +
                      '</tr>';
                  }

                  // }
                })
                reslove(alarmMes);
              }
            }
            // console.log(data)


          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '查询报警记录时服务出错',
            });
          })


      }).then((alarmMes) => {
        let fircon = '<div class="deviceInfor">' +
          '<div class="deviceUserInfor">' +
          '<p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>' + params.value[2].nickname + '</span></p>' +
          // '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + marker.mesData.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + params.value[2].arlarmTels + '</span></p>' +
          '<p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>' + params.value[2].imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + params.value[2].address + '</span></p>' +
          '</div>' +
          '<div class="deviceAlarmInfor">' +
          '<h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b><span id="alarmDetial">详情 >></span></h3>' +
          '<div class="alarmTableWrap">' +
          '<table class="alarmTable">';
        let thrcon = '</table>' +
          '<div>' +
          '</div>' +
          '</div>' +
          '<p><span id="alarmCount">共计报警<b>' + alarmMes.alarmNum + '</b>次</span></p>';

        content += fircon + alarmMes.seccon + thrcon;
        if (this.areaPointData.length <= 1 || onOff) { //只有一个点  直接弹框显示出来  onOff指的是是否列表触发
          let point = new BMap.Point(params.value[0], params.value[1]); //你确定弹窗位置
          let infoWindow = new BMap.InfoWindow(content, this.opts); //弹窗信息
          bMap.openInfoWindow(infoWindow, point);
          this.infoWindowOpen(infoWindow, params);
          this.infoWindowClose(infoWindow, params);

        }

      })
    },
    //手动点击列表弹出信息框
    clickOpenInfo(params) {
      this.openInfo(this.bMap, params, true)
    },

    closeList() {
      this.listShow = false;
    },
    infoWindowOpen(infoWindow, params) {

      infoWindow.addEventListener("open", function(type, target, point) { // MDZZ弹框打开时触发的函数(坑爹啊  页面加载第一次生成调取 之后就没用了 也不知道是不是别的原因)
        let bMapPop = document.getElementsByClassName('BMap_pop')[0];
        document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
          if(e.target && e.target.id=='alarmDetial') {
            this.$router.push({
              name: 'deviceLog',
              params: {
                id: params.value[2].id
              }
            })
          }
        }.bind(this),false);
        if (params.value[2].isWarn=='warning') {
          this.addClass(bMapPop, 'active');
        } else {
          this.removeClass(bMapPop, 'active');
        }
        this.infoWindowOpen = (infoWindow, params) => {
          document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
            if(e.target && e.target.id=='alarmDetial') {
              this.$router.push({
                name: 'deviceLog',
                params: {
                  id: params.value[2].id
                }
              })
            }
          }.bind(this),false);
          if (params.value[2].isWarn=='warning') {
            this.addClass(bMapPop, 'active');
          } else {
            this.removeClass(bMapPop, 'active');
          }
        }
      }.bind(this));

    },
    infoWindowClose(infoWindow, params) {
      infoWindow.addEventListener("close", function(type) {

        if(params.value[2].isWarn=='notice'){
          this.$set(params.value[2],'isWarn','notice')
          this.$set(params,'symbol','image://./src/img/marker4.png');
          this.$set(params,'z',5000);
          this.myChart.resize()
        }else if(params.value[2].isWarn=='warning'){
          this.$set(params.value[2],'isWarn','caution')
          this.$set(params,'symbol','image://./src/img/marker3.png');
          this.$set(params,'z',2000);

          for(var i=0; i<this.option.series[1].data.length; i++) {
            if(this.option.series[1].data[i].name == params.name) {
              this.option.series[1].data.splice(i, 1);
              break;
            }
          }
          console.log(this.option.series)
          this.myChart.resize()
        }else if(params.value[2].isWarn=='caution'){
          this.$set(params.value[2],'isWarn','caution')
          this.$set(params,'symbol','image://./src/img/marker3.png');
          this.$set(params,'z',2000);
          this.myChart.resize()
        }else{
          this.$set(params.value[2],'isWarn','normal')
          this.$set(params,'symbol','image://./src/img/marker1.png');
          this.myChart.resize()

        }
        console.log(params)
        this.myChart.setOption({
          series: [
            {
              type: 'scatter',
              data: this.option.series[0].data
            },
            {
                type: 'effectScatter',
                data: this.option.series[1].data
            }

          ]
        });
      }.bind(this))
      // this.myChart.resize()

    },
    addClass(obj, cls) {
      let obj_class = obj.className; //获取 class 内容.
      let blank = (obj_class != '') ? ' ' : ''; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
      let added = obj_class + blank + cls; //组合原来的 class 和需要添加的 class.
      let classArr = added.split(' ');
      //class去重 不重复添加    解决：多个报警点切换  class添加多个  会出现报警样式不变的情况bug   ps:或者更改移除class 查找有没有多个  全部移除
      let newClassArr = [];
      for (let i = 0; i < classArr.length; i++) {
        if (newClassArr.indexOf(classArr[i]) == -1) {
          newClassArr.push(classArr[i])
        }
      }
      obj.className = newClassArr.join(' '); //替换原来的 class.
    },
    removeClass(obj, cls) {
      let obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' ') //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
      let removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
      obj.className = removed; //替换原来的 class.
    }
  },
  created() {
    new Promise((resolve) => {
      this.axios.get('region/countyAndStreet',{params:{id:830}})
        .then(res => {
          let data=res.data
          if(data.resultFlag){
            resolve(data.data)
          }else{
            this.$Notice.error({
              title: '错误',
              desc: '获取区域数据时出错',
            });
          }
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '获取区域数据时服务出错',
          });
        })
    }).then((data) => {
      this.njAreaData = data;
      this.initBMap()
    })
  }
}
</script>
