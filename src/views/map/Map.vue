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
          <li v-for="items in areaMarkerData" @click="clickOpenInfo(items)" :class="items.isWarn">
            <!-- <p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>{{items.mesData.name}}</span></p> -->
            <p><i class="ivu-icon icon-device"></i><b>设 备 名 </b>：<span>{{items.mesData.nickname}}</span></p>
            <p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>{{items.mesData.address}}</span></p>
          </li>
        </ul>
      </div>
    </div>
    <div id="map"></div>
    <audio id="siren" loop="loop">
      <source src="./source/119.wav">
      <source src="./source/119.mp3">
        Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bMap: null,
      njAreaData: [],
      markerData: [], //点列表
      areaMarkerData: [], //范围点数据（解决点过多 无法全部点击 使用列表显示）
      listShow: true,
      audioOnOff:0,
      goEasy:null,
      opts: {
        width: 640, // 信息窗口宽度
        height: 420, // 信息窗口高度
        enableMessage: true //设置允许信息窗发送短息
      }
    }
  },
  watch:{
    audioOnOff(newAudioOnOff){
      // console.log('报警个数%o',newAudioOnOff)
      if(newAudioOnOff>=1){
        document.getElementById('siren').play()
      }else{
        document.getElementById('siren').pause()
      }
    }
  },
  methods: {
    bMapInit() { //地图初始化
      var map = new BMap.Map("map", {
        enableMapClick: false
      }); // 创建Map实例
      this.bMap = map
      map.centerAndZoom(new BMap.Point(118.823513, 32.020812), 14); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
      map.setCurrentCity("南京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.setMapStyle({ //设置地图样式
        styleJson: [{
            "featureType": "railway",
            "elementType": "geometry.stroke",
            "stylers": {
              "visibility": "off"
            }
          },
          // {   //景点信息去除
          //   "featureType": "poi",
          //   "elementType": "labels",
          //   "stylers": {
          //     "visibility": "off"
          //   }
          // },
          {
            "featureType": "label",
            "elementType": "all",
            "stylers": {}
          }
        ]
      });
      this.makePoint(map);
    },
    makePoint(map) { //生成点
      map.clearOverlays(); //清除地图覆盖物

      this.axios('device/listAllDevice?pageIndex=1&pageSize=100000')
        .then(res => {

          let data = res.data.data;
          // console.log(data)

          data.forEach((item, index) => { //循环所有设备补全信息
            if(item.x=='4.9E-324'||item.y=='4.9E-324'||!(item.x>73.255024&&item.x<135.437887)||!(item.y>2.820272&&item.y<53.829599)){
              item.x=this.randomNumBoth(118.726818,118.887794);
              item.y=this.randomNumBoth(31.98072,32.082593);
            }
            new Promise(resolve=>{
              this.axios('device/belong?dId=' + item.id) //获取设备用户信息接口
              .then(resp => {
                if(resp.data.resultFlag==false){
                  resolve()
                }else{

                  // console.log(resp)
                  item.name = resp.data.belong.name;
                  item.tel = resp.data.belong.tel;

                  this.njAreaData.map((items) => {
                    let address = ''
                    if(item.aid==items.id){
                      address+='江苏省 南京市 '+items.county;
                      for(let j=0;j<items.street.length;j++){
                        if(item.sid==items.street[j].id){
                          address+=' '+items.street[j].street;
                          item.address=address+' '+item.address
                          resolve()
                        }
                      }
                    }
                  })

                }
              }).catch((e) => {
                this.$Notice.error({
                  title: '错误',
                  desc: '获取用户信息时服务出错',
                });
              })
            }).then(()=>{
              let pt = new BMap.Point(item.x, item.y); //点经纬度
              let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27)); //点图片
              let marker = new BMap.Marker(pt, {
                icon: myIcon
              }); // 生成点


              marker.setTitle(item.address);
              // console.log(marker)
              map.addOverlay(marker);
              marker.mesData = item
              this.$set(marker, 'isWarn', 'normal');
              this.markerData.push(marker)
              // console.log(item.id)
              this.addClickHandler(map, marker);
            })
          })
          setTimeout(()=>{
            this.watchPoint(map);
          },2000)
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '请求设备时服务出错'
          });
        })



    },
    watchPoint(map) { //每个点的间歇监听



      // let aa=(message)=>{
      //   // console.log(message)
      //   let data=message;
      //   for(let key in data){
      // //     // console.log(key+'__'+data[key])
      //     this.markerData.map((item)=>{
      //         if(key==item.mesData.id){
      //           if(data[key]=='1'){//报警
      //             if(item.isWarn!='warning'){
      //               console.log('是报警加1')
      //               this.audioOnOff=this.audioOnOff+1
      //             }
      //
      //             item.isWarn = 'warning'; //是否报警
      //             item.setZIndex(10000);
      //             item.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      //
      //             document.getElementById('siren').play()
      //             let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(25, 27), {}); //更改图片（红）
      //             // console.log(item.setIcon)
      //
      //             item.setIcon(myIcon);
      //           }else if(data[key]=='0'){//离线
      //             // console.log('离线')
      //             item.isWarn = 'notice';
      //             item.setZIndex(5000);
      //             let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {}); //更改图片（灰）
      //             // console.log(item)
      //             item.setIcon(myIcon);
      //           }else if(data[key]=='2'){//上线'
      //             // console.log('上线')
      //             item.isWarn = 'normal';
      //             let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {}); //更改图片（蓝）
      //             // console.log(item)
      //             item.setIcon(myIcon);
      //           }
      //         }else{
      //
      //           // let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {}); //更改图片（红）
      //           // item.setIcon(myIcon);
      //         }
      //       })
      //
      //   }
      //
      // }


      // var sss=setInterval(()=>{
      //   aa({276:1})
      //   setTimeout(()=>{
      //     aa({283:0})
      //   },100)
      //   setTimeout(()=>{
      //     aa({383:1})
      //   },115)
      //   setTimeout(()=>{
      //     aa({448:0})
      //   },126)
      //   setTimeout(()=>{
      //     aa({521:1})
      //   },140)
      //
      //   setTimeout(()=>{
      //     aa({274:0})
      //   },178)
      //
      //   setTimeout(()=>{
      //     aa({909:1})
      //   },200)
      //   setTimeout(()=>{
      //     aa({819:0})
      //   },250)
      //   setTimeout(()=>{
      //     aa({333:1})
      //   },300)
      // },40000)


      this.goEasy = new GoEasy({
           appkey: 'BC-c9708db6dee74beb87244e4a1ce1554b'
      });
      // this.goEasy.publish({
      //     channel: 'demo_channel',
      //     message: 'Hello world!'
      // });
      // console.log('监听开启')

      this.goEasy.subscribe({
          channel: 'gasalarm',
          onMessage:(message)=>{
            // console.log(message)
            let data=JSON.parse(message.content);
            console.log(data)
            for(let key in data){
              // console.log(key+'__'+data[key])
              this.markerData.map((item)=>{
                  if(key==item.mesData.id){
                    if(data[key]=='1'){//报警
                      if(item.isWarn!='warning'){
                        console.log('是报警加1')
                        this.audioOnOff=this.audioOnOff+1
                      }

                      item.isWarn = 'warning'; //是否报警
                      item.setZIndex(10000);
                      item.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

                      document.getElementById('siren').play()
                      let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(25, 27), {}); //更改图片（红）
                      // console.log(item.setIcon)

                      item.setIcon(myIcon);
                    }else if(data[key]=='0'){//离线
                      // console.log('离线')
                      item.isWarn = 'notice';
                      item.setZIndex(5000);
                      let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {}); //更改图片（灰）
                      // console.log(item)
                      item.setIcon(myIcon);
                    }else if(data[key]=='2'){//上线'
                      // console.log('上线')
                      item.isWarn = 'normal';
                      let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {}); //更改图片（蓝）
                      // console.log(item)
                      item.setIcon(myIcon);
                    }
                  }else{

                    // let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {}); //更改图片（红）
                    // item.setIcon(myIcon);
                  }
                })

            }


          },
          onSuccess: function () {
            console.log("监听开启");
          },
          onFailed: function (error) {
            console.log("监听失败, 错误编码：" + error.code + " 错误信息：" + error.content)
          }

      });

    },
    addClickHandler(map, marker) { //给点添加点击事件 触发弹窗
      marker.addEventListener("click", function(e) { //当点击坐标点时
        marker.setAnimation(null); //点停止跳动


        new Promise((resolve) => {
          this.geoUtils(map, marker); //
          resolve()
        }).then(() => {
          this.openInfo(map, marker); //打开弹框
        })

      }.bind(this))
    },
    clickOpenInfo(marker) {
      // marker.isWarn = 'normal';
      marker.setAnimation(null);
      // marker.infoCreateTime = new Date().getTime();
      this.openInfo(this.bMap, marker, true)

      // this.watchPoint(this.bMap, marker)
    },
    geoUtils(map, marker) { //百度地图geoUtils  用来确定坐标点是否在设定区域内
      this.areaMarkerData = []; //先清空区域数据
      let pts = [];                                   //X                    //Y
      let pt1 = new BMap.Point(marker.point.lng - 0.00006, marker.point.lat + 0.00006); //上左
      let pt2 = new BMap.Point(marker.point.lng + 0.00007, marker.point.lat + 0.00006); //上右
      let pt3 = new BMap.Point(marker.point.lng + 0.00007, marker.point.lat - 0.00007); //下右
      let pt4 = new BMap.Point(marker.point.lng - 0.00006, marker.point.lat - 0.00007); //下左
      pts.push(pt1);
      pts.push(pt2);
      pts.push(pt3);
      pts.push(pt4);
      let ply = new BMap.Polygon(pts); //矩形区域
      // var result = BMapLib.GeoUtils.isPointInPolygon(pt, ply);
      for (let i = 0; i < this.markerData.length; i++) {
        let pt = new BMap.Point(this.markerData[i].point.lng, this.markerData[i].point.lat); //每个点
        let result = BMapLib.GeoUtils.isPointInPolygon(pt, ply); //判断此点是否在设定区域内
        if (result == true) {
          this.areaMarkerData.push(this.markerData[i]);
          this.listShow = true;
        } else {
          // console.log("点在范围外");
        }
      }
      //map.addOverlay(ply);//显示测定范围矩形
    },
    openInfo(map, marker, onOff) {
      let content = '';
      let seccon = '';
      // console.log(marker)

      new Promise((reslove) => {
        let alarmsArr = [];
        let alarmMes={
          alarmNum:0,
          seccon:''
        };
        this.axios('alarm/queryAlarmRecords?did='+ marker.mesData.id +'&pageNumber=1&pageSize=10000')
        .then(function(res) {
          // console.log(res)
          let data = res.data
          if(data.resultFlag){
            alarmsArr=data.data.rows;
            alarmMes.alarmNum=data.data.total;
            if (alarmsArr < 1) {
              alarmMes.seccon += '<tr>' +
                '<td class="time" style="text-align:center;">' + "暂无记录" + '</td>'
              '</tr>';
              reslove(alarmMes);
            } else {

              alarmsArr.forEach(function(item, index) {
                if (marker.mesData.id == item.dId) {
                  // ++alarmMes.alarmNum;
                  // alarmsArr.push(item)
                  if(item.date){
                    alarmMes.seccon += '<tr>' +
                      '<td class="time">' + item.date.slice(0, item.date.indexOf('.')) + '</td>' +
                      '<td class="tel">推送' + item.alarmTel.replace(/,/g, '  ') + '</td>' +
                      '</tr>';

                  }else{
                    alarmMes.seccon += '<tr>' +
                      '<td class="time">' + '无' + '</td>' +
                      '<td class="tel">推送' + item.alarmTel.replace(/,/g, '  ') + '</td>' +
                      '</tr>';
                  }

                }
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
          '<p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>' + marker.mesData.nickname + '</span></p>' +
          // '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + marker.mesData.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + marker.mesData.tel + '</span></p>' +

          '<p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>' + marker.mesData.imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + marker.mesData.address + '</span></p>' +
          '</div>' +
          '<div class="deviceAlarmInfor">' +
          '<h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b><span id="alarmDetial">详情 >></span></h3>' +
          '<div class="alarmTableWrap">' +
          '<table class="alarmTable">';
        let thrcon = '</table>' +
          '<div>' +
          '</div>' +
          '</div>'+
          '<p><span id="alarmCount">共计报警<b>'+alarmMes.alarmNum+'</b>次</span></p>';

        content += fircon + alarmMes.seccon + thrcon;
        if (this.areaMarkerData.length <= 1 || onOff) { //只有一个点  直接弹框显示出来  onOff指的是是否列表触发
          let point = new BMap.Point(marker.point.lng, marker.point.lat); //你确定弹窗位置
          let infoWindow = new BMap.InfoWindow(content, this.opts); //弹窗信息
          map.openInfoWindow(infoWindow, point);
          this.infoWindowOpen(infoWindow, marker);
          this.infoWindowClose(infoWindow, marker);
        }

      })
    },
    infoWindowOpen(infoWindow, marker) {
      infoWindow.addEventListener("open", function(type, target, point) { // MDZZ弹框打开时触发的函数(坑爹啊  页面加载第一次生成调取 之后就没用了 也不知道是不是别的原因)
        // console.log(marker.isWarn)
        if(marker.isWarn=='warning'){
          // console.log('是报警减1')
          this.audioOnOff=this.audioOnOff-1
        }
        marker.setAnimation(null);
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
        document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
          // var nodename = e.target.nodeName.toLocaleLowerCase();
          if(e.target && e.target.id=='alarmDetial') {
            this.$router.push({
              name: 'deviceLog',
              params: {
                id: marker.mesData.id
              }
            })
          }
        }.bind(this),false);
        // document.querySelector('.alarmDetial').addEventListener('click',function(){
        //   this.$router.push({
        //     name: 'deviceLog',
        //     params: {
        //       id: marker.mesData.id
        //     }
        //   })
        // }.bind(this));


        if (marker.isWarn=='warning') {
          // console.log('baojingle')
          this.addClass(bMapPop, 'active');
        } else {
          this.removeClass(bMapPop, 'active');
        }
        this.infoWindowOpen = (infoWindow, marker) => { //第一次调完上面那货 我就直接让这玩意直接得一个新函数
          document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {
            // var nodename = e.target.nodeName.toLocaleLowerCase();
            if(e.target && e.target.id=='alarmDetial') {
              this.$router.push({
                name: 'deviceLog',
                params: {
                  id: marker.mesData.id
                }
              })
            }
          }.bind(this),false);

          if(marker.isWarn=='warning'){
            // console.log('是报警减1')
            this.audioOnOff=this.audioOnOff-1
          }
          marker.setAnimation(null);
          // marker.infoCreateTime = new Date().getTime();
          if (marker.isWarn=='warning') {
            // console.log('baojingle')
            this.addClass(bMapPop, 'active');
          } else {
            this.removeClass(bMapPop, 'active');
          }
        }
      }.bind(this))
      if(document.getElementById('alarmDetial')){
        document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click",function(e) {

        if(e.target && e.target.id=='alarmDetial') {
          this.$router.push({
            name: 'deviceLog',
            params: {
              id: marker.mesData.id
            }
          })
        }
      }.bind(this),false);
      }

    },
    infoWindowClose(infoWindow, marker) {
      infoWindow.addEventListener("close", function(type) { //弹框关闭时触发的函数 （这东西倒是每次都调 气不气）

        if(marker.isWarn=='notice'){
          let myIcon = new BMap.Icon("./img/marker4.png", new BMap.Size(25, 27), {});
          marker.setIcon(myIcon);
        }else if(marker.isWarn=='warning'){
          // document.getElementById('siren').pause()
          marker.isWarn = 'caution';
          let myIcon = new BMap.Icon("./img/marker3.png", new BMap.Size(25, 27), {});
          marker.setIcon(myIcon);
        }else if(marker.isWarn=='caution'){
          // document.getElementById('siren').pause()
          marker.isWarn = 'caution';
          let myIcon = new BMap.Icon("./img/marker3.png", new BMap.Size(25, 27), {});
          marker.setIcon(myIcon);
        }else{
          marker.isWarn = 'normal';
          let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(25, 27), {});
          marker.setIcon(myIcon);
        }

      }.bind(this))
    },
    closeList() {
      this.listShow = false;
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
    },
    randomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + (Rand * Range);
      return num;
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
      this.bMapInit();
    })

  },
  computed: {
    listShows() {
      return this.areaMarkerData.length > 1 ? true : false
    }
  },
  mounted() {

  },
  beforeDestroy(){
    // console.log(document.getElementById('siren'))
    // document.getElementById('siren').pause();
    this.audioOnOff=0;
  },
  destroyed() { //页面卸载 清除监听

    // console.log(this.goEasy)


    if(this.goEasy){
      this.goEasy.unsubscribe({
        channel: "gasalarm",
        onSuccess: function () {
          console.log("取消监听成功。");
        },
        onFailed: function (error) {
          console.log("取消监听失败，错误编码：" + error.code + " 错误信息：" + error.content)
        }
      });
    }

  }
}

</script>
