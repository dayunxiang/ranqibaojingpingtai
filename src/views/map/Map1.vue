
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
            <li v-for="items in areaPointData" @click="clickOpenInfo(items)" :class="items.isWarn">
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
            // console.log(params.data.value[2])

            this.njAreaData.map((items) => {
              let address = ''
              if(params.data.value[2].aid==items.id){
                address+='江苏省 南京市 '+items.county;
                for(let j=0;j<items.street.length;j++){
                  if(params.data.value[2].sid==items.street[j].id){
                    address+=' '+items.street[j].street;
                    params.data.value[2].addressDetail=''
                    params.data.value[2].addressDetail=address+' '+params.data.value[2].address
                    // resolve()
                  }
                }
              }
            })
            let str = ''
            str += '<div style="color:#fff;">' +
              '<p>' + params.data.value[2].nickname + '</p>' +
              '<p>'+params.data.value[2].addressDetail+'</p>'+
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
        series: [{
            type: 'scatter', // 使用百度地图坐标系
            coordinateSystem: 'bmap', // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [],
            symbol: 'image://./src/img/marker1.png',
            symbolSize: function(val) {
              return [22, 24];
            }
          }
          // ,{
          //     type: 'effectScatter',// 使用百度地图坐标系
          //     coordinateSystem: 'bmap',// 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
          //     data: [],
          //     symbol:'image://./src/img/marker2.png',
          //     scale:100,
          //     symbolSize: function (val) {
          //         return [22,24];
          //     }
          // }
        ]
      }
    }
  },
  computed: {
    listShows() {
      return this.areaPointData.length > 1 ? true : false
    }
  },
  mounted() {
    //地图及echarts初始化
    // this.initBMap()
    // setTimeout(()=>{
    // this.axios('device/listAllDevice?pageIndex=1&pageSize=100000')
    //   .then(res => {
    //     let data = res.data.data;
    //     let echartsArr=[];
    //     data.map((item)=>{
    //       let obj={
    //         name:item.nickname,
    //         value:[item.x,item.y,item]
    //       }
    //       echartsArr.push(obj)
    //     })
    //     console.log(data)
    //     this.option.series[0].data=echartsArr
    //     console.log(this.option.series[0].data)
    //     var myChart = echarts.init(document.getElementById('map'));
    //     myChart.setOption(this.option,true);
    //     // myChart.resize()
    //     myChart.on('click', function (params) {
    //         this.devicePopupData=params
    //         console.log(this.option.series)
    //         params.data.symbol='image://./src/img/marker2.png'
    //         // //canvas分层
    //         // // params.data.zlevel=10;
    //         // //图标的z-index值
    //         params.data.z=1000;
    //         // // console.log(params)
    //         // // this.option.series[0].markPoint.data.push(params.name)
    //         //
    //         //
    //         //
    //         // //开启动画
    //         // params.data.animation=true;
    //         // this.option.series[1].data.push(params.data)
    //         // console.log(params.data)
    //         myChart.resize()
    //         // myChart.setOption(this.option);
    //         this.clickPopup()
    //     }.bind(this));
    //     console.log(this)
    //     var bmap = myChart.getModel().getComponent('bmap').getBMap();
    //   })
    //   .catch((e) => {
    //     this.$Notice.error({
    //       title: '错误',
    //       desc: '请求设备时服务出错'
    //     });
    //   })



    // bmap.addControl(new BMap.MapTypeControl());//{enableMapClick:false}
    // },100)



  },
  methods: {
    initBMap() {
      var myChart = echarts.init(document.getElementById('map'));
      this.myChart=myChart
      this.axios('device/listAllDevice?pageIndex=1&pageSize=100000')
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
          myChart.setOption(this.option, true);
          var bMap = myChart.getModel().getComponent('bmap').getBMap();
          this.bMap=bMap
          this.watchPoint(bMap,myChart)
          myChart.on('click', (params) => {
            console.log(params)
            new Promise((resolve) => {
              this.geoUtils(bMap, params); //
              resolve()
            }).then(() => {
              this.openInfo(bMap, params); //打开弹框
            })
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


      console.log(this.pointData)
      let aa=(message)=>{
        // console.log(message)
        let data=message;
        for(let key in data){
      //     // console.log(key+'__'+data[key])
          this.option.series[0].data.map((item)=>{
              if(key==item.name){
                if(data[key]=='1'){//报警
                  console.log('报警')
                  // console.log(item)
                  // item.symbol='image://./src/img/marker2.png';
                  this.$set(item, 'symbol', "image://./src/img/marker2.png");
                  item.z=1000;
                  console.log(item)
                  // myChart.resize()
                  // myChart.setOption({
                  //   series: [{
                  //       data: this.option.series[0].data
                  //     }
                  //   ]
                  // })
                  // this.option.series[0].data = this.pointData
                  // this.devicePopupData=params
                  // console.log(this.option.series)
                  // params.data.symbol='image://./src/img/marker2.png'
                  // //canvas分层
                  // // params.data.zlevel=10;
                  // //图标的z-index值

                  // // console.log(params)
                  // // this.option.series[0].markPoint.data.push(params.name)
                  //
                  //
                  //
                  // //开启动画
                  // params.data.animation=true;
                  // this.option.series[1].data.push(params.data)
                  // console.log(params.data)

                  // myChart.setOption(this.option,true);
                  // this.clickPopup()


                  // if(item.isWarn!='warning'){
                  //   console.log('是报警加1')
                  //   this.audioOnOff=this.audioOnOff+1
                  // }

                  // item.isWarn = 'warning'; //是否报警
                  // item.setZIndex(10000);
                  // item.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

                  // document.getElementById('siren').play()
                  // let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(25, 27), {}); //更改图片（红）
                  // console.log(item.setIcon)

                  // item.setIcon(myIcon);
                }else if(data[key]=='0'){//离线
                  // console.log('离线')
                  // item.isWarn = 'notice';
                  // item.setZIndex(5000);
                  // let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {}); //更改图片（灰）
                  // // console.log(item)
                  // item.setIcon(myIcon);
                }else if(data[key]=='2'){//上线'
                  // console.log('上线')
                  // item.isWarn = 'normal';
                  // let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {}); //更改图片（蓝）
                  // // console.log(item)
                  // item.setIcon(myIcon);
                }
              }else{

                // let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {}); //更改图片（红）
                // item.setIcon(myIcon);
              }
            })
            // myChart.resize()
        }

      }


      var sss=setInterval(()=>{
        aa({3407:1})
        setTimeout(()=>{
          aa({1723:0})
        },100)
        setTimeout(()=>{
          aa({1470:1})
        },115)
        setTimeout(()=>{
          aa({448:0})
        },126)
        setTimeout(()=>{
          aa({521:1})
        },140)

        setTimeout(()=>{
          aa({274:0})
        },178)

        setTimeout(()=>{
          aa({909:1})
        },200)
        setTimeout(()=>{
          aa({819:0})
        },250)
        setTimeout(()=>{
          aa({333:1})
        },300)
      },10000)


      this.goEasy = new GoEasy({
          //  appkey: 'BC-c9708db6dee74beb87244e4a1ce1554b'
           appkey:'BC-7d00ae382f2f42cd904b263af6a76ff0'
      });
      // this.goEasy.publish({
      //     channel: 'demo_channel',
      //     message: 'Hello world!'
      // });
      // console.log('监听开启')
// console.log(this.pointData)
      // this.goEasy.subscribe({
      //     channel: 'gasalarm',
      //     onMessage:(message)=>{
      //       // console.log(message)
      //       let data=JSON.parse(message.content);
      //       console.log(data)
      //       for(let key in data){
      //         // console.log(key+'__'+data[key])
      //         // console.log(this.pointData)
      //         this.pointData.map((item)=>{
      //         //     if(key==item.mesData.id){
      //         //       if(data[key]=='1'){//报警
      //         //         if(item.isWarn!='warning'){
      //         //           console.log('是报警加1')
      //         //           this.audioOnOff=this.audioOnOff+1
      //         //         }
      //         //
      //         //         item.isWarn = 'warning'; //是否报警
      //         //         item.setZIndex(10000);
      //         //         item.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      //         //
      //         //         document.getElementById('siren').play()
      //         //         let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(25, 27), {}); //更改图片（红）
      //         //         // console.log(item.setIcon)
      //         //
      //         //         item.setIcon(myIcon);
      //         //       }else if(data[key]=='0'){//离线
      //         //         // console.log('离线')
      //         //         item.isWarn = 'notice';
      //         //         item.setZIndex(5000);
      //         //         let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {}); //更改图片（灰）
      //         //         // console.log(item)
      //         //         item.setIcon(myIcon);
      //         //       }else if(data[key]=='2'){//上线'
      //         //         // console.log('上线')
      //         //         item.isWarn = 'normal';
      //         //         let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {}); //更改图片（蓝）
      //         //         // console.log(item)
      //         //         item.setIcon(myIcon);
      //         //       }
      //         //     }else{
      //         //
      //         //       // let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {}); //更改图片（红）
      //         //       // item.setIcon(myIcon);
      //         //     }
      //           })
      //
      //       }
      //
      //
      //     },
      //     onSuccess: function () {
      //       console.log("监听开启");
      //     },
      //     onFailed: function (error) {
      //       console.log("监听失败, 错误编码：" + error.code + " 错误信息：" + error.content)
      //     }
      //
      // });

    },
    //点重合范围判定
    geoUtils(bMap, params) {
      //首先清空区域数据
      this.areaPointData=[]
      //多边形区域
      let poly=[
        [params.data.value[0] - 0.00006, parseFloat(params.data.value[1]) + 0.00005],
        [parseFloat(params.data.value[0]) + 0.00006, parseFloat(params.data.value[1]) + 0.00005],
        [parseFloat(params.data.value[0]) + 0.00006, params.data.value[1] - 0.00005],
        [params.data.value[0] - 0.00006, params.data.value[1] - 0.00005]
      ];
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
      for (let i = 0; i < this.pointData.length; i++) {
        // console.log(this.pointData[i])
        // let pt = new BMap.Point(this.pointData[i].value[0], this.pointData[i].value[1]); //每个点
        let p=[this.pointData[i].value[0],this.pointData[i].value[1]]
        // console.log(pt)
        // let result = BMapLib.GeoUtils.isPointInPolygon(pt, ply); //判断此点是否在设定区域内
        let result =rayCasting(p, poly);
        this.njAreaData.map((items) => {
          let address = ''
          if(this.pointData[i].value[2].aid==items.id){
            address+='江苏省 南京市 '+items.county;
            for(let j=0;j<items.street.length;j++){
              if(this.pointData[i].value[2].sid==items.street[j].id){
                address+=' '+items.street[j].street;
                this.pointData[i].value[2].addressDetail=''
                this.pointData[i].value[2].addressDetail=address+' '+this.pointData[i].value[2].address
                // resolve()
              }
            }
          }
        })
        // console.log(result)
        if (result == true) {
          this.areaPointData.push(this.pointData[i]);
          console.log("点在范围nei");

          this.listShow = true;
        } else {
          // console.log("点在范围外");
        }
      }
      // console.log(this.areaPointData)
    },
    openInfo(bMap, params, onOff) {
      let content = '';
      let seccon = '';
      // console.log(marker)

      new Promise((reslove) => {
        let alarmsArr = [];
        let alarmMes = {
          alarmNum: 0,
          seccon: ''
        };
        this.axios('alarm/queryAlarmRecords?did=' + params.data.value[2].id + '&pageNumber=1&pageSize=10000')
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
        // console.log(this)
        // console.log(marker.mesData)
        // console.log(marker.mesData)
        let fircon = '<div class="deviceInfor">' +
          '<div class="deviceUserInfor">' +
          '<p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>' + params.data.value[2].nickname + '</span></p>' +
          // '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + marker.mesData.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + params.data.value[2].arlarmTels + '</span></p>' +

          '<p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>' + params.data.value[2].imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + params.data.value[2].address + '</span></p>' +
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
          let point = new BMap.Point(params.data.value[0], params.data.value[1]); //你确定弹窗位置
          let infoWindow = new BMap.InfoWindow(content, this.opts); //弹窗信息
          bMap.openInfoWindow(infoWindow, point);
          // console.log(bMap.openInfoWindow())
          this.infoWindowOpen(infoWindow, params);
          // this.infoWindowClose(infoWindow, marker);
        }

      })
    },
    clickOpenInfo(params) {
      let data={
        data:params
      }
      // marker.isWarn = 'normal';
      // marker.setAnimation(null);
      // marker.infoCreateTime = new Date().getTime();
      this.openInfo(this.bMap, data, true)

      // this.watchPoint(this.bMap, marker)
    },
    closeList() {
      this.listShow = false;
    },
    infoWindowOpen(infoWindow, params) {
      infoWindow.addEventListener("open", function(type, target, point) { // MDZZ弹框打开时触发的函数(坑爹啊  页面加载第一次生成调取 之后就没用了 也不知道是不是别的原因)
        // console.log(marker.isWarn)
        // if(marker.isWarn=='warning'){
        //   // console.log('是报警减1')
        //   this.audioOnOff=this.audioOnOff-1
        // }
        // marker.setAnimation(null);
        // marker.infoCreateTime = new Date().getTime();
        let bMapPop = document.getElementsByClassName('BMap_pop')[0];
        // document.getElementById('alarmDetial').onclick=()=>{
        //   // console.log(marker);
        //   this.$router.push({
        //     name: 'deviceLog',
        //     params: {
        //       id: marker.mesData.id
        //     }
        //   })
        // }
        // document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
        //   // var nodename = e.target.nodeName.toLocaleLowerCase();
        //   if(e.target && e.target.id=='alarmDetial') {
        //     this.$router.push({
        //       name: 'deviceLog',
        //       params: {
        //         id: params.data.value[2].id
        //       }
        //     })
        //   }
        // }.bind(this),false);
        // document.querySelector('.alarmDetial').addEventListener('click',function(){
        //   this.$router.push({
        //     name: 'deviceLog',
        //     params: {
        //       id: marker.mesData.id
        //     }
        //   })
        // }.bind(this));


        // if (marker.isWarn=='warning') {
        //   // console.log('baojingle')
        //   this.addClass(bMapPop, 'active');
        // } else {
        //   this.removeClass(bMapPop, 'active');
        // }
        // this.infoWindowOpen = (infoWindow, marker) => { //第一次调完上面那货 我就直接让这玩意直接得一个新函数
        //   document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
        //     // var nodename = e.target.nodeName.toLocaleLowerCase();
        //     if(e.target && e.target.id=='alarmDetial') {
        //       this.$router.push({
        //         name: 'deviceLog',
        //         params: {
        //           id: params.data.value[2].id
        //         }
        //       })
        //     }
        //   }.bind(this),false);

        // if(marker.isWarn=='warning'){
        //   // console.log('是报警减1')
        //   this.audioOnOff=this.audioOnOff-1
        // }
        // marker.setAnimation(null);
        // // marker.infoCreateTime = new Date().getTime();
        // if (marker.isWarn=='warning') {
        //   // console.log('baojingle')
        //   this.addClass(bMapPop, 'active');
        // } else {
        //   this.removeClass(bMapPop, 'active');
        // }
        // }
      }.bind(this))
      // if(document.getElementById('alarmDetial')){
      //   document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
      //
      //   if(e.target && e.target.id=='alarmDetial') {
      //     this.$router.push({
      //       name: 'deviceLog',
      //       params: {
      //         id: params.data.value[2].id
      //       }
      //     })
      //   }
      // }.bind(this),false);
      // }

    },
    // infoWindowClose(infoWindow, marker) {
    //   infoWindow.addEventListener("close", function(type) { //弹框关闭时触发的函数 （这东西倒是每次都调 气不气）
    //
    //     if(marker.isWarn=='notice'){
    //       let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {});
    //       marker.setIcon(myIcon);
    //     }else if(marker.isWarn=='warning'){
    //       // document.getElementById('siren').pause()
    //       marker.isWarn = 'caution';
    //       let myIcon = new BMap.Icon("./img/marker3.png", new BMap.Size(25, 27), {});
    //       marker.setIcon(myIcon);
    //     }else if(marker.isWarn=='caution'){
    //       // document.getElementById('siren').pause()
    //       marker.isWarn = 'caution';
    //       let myIcon = new BMap.Icon("./img/marker3.png", new BMap.Size(25, 27), {});
    //       marker.setIcon(myIcon);
    //     }else{
    //       marker.isWarn = 'normal';
    //       let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {});
    //       marker.setIcon(myIcon);
    //     }
    //
    //   }.bind(this))
    // },

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
