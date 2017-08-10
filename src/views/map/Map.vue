<style lang="scss">
@font-face {
    font-family: "Ionicons";
    src: url('../../iconfont/mapIconfont.eot?t=1501226686963');
    /* IE9*/
    src:url('../../iconfont/mapIconfont.eot?t=1501226686963#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('../../iconfont/mapIconfont.woff?t=1501226686963') format('woff'),
    /* chrome, firefox */
    url('../../iconfont/mapIconfont.ttf?t=1501226686963') format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url(  '../../iconfont/mapIconfont.svg?t=1501226686963#iconfont') format('svg');
    /* iOS 4.1- */
}
.icon-dingwei:before {
    content: "\e62f";
}
.icon-tanhao:before {
    content: "\e67f";
}
.icon-device:before {
    content: "\e602";
}
.icon-dianhua:before {
    content: "\e604";
}
.icon-user:before {
    content: "\e838";
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
                & > h3 {
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
                .alarmTable {
                    width: 100%;
                    height: 100%;
                    border-top: 1px solid #333;
                    border-bottom: 1px solid #333;
                    tr {
                        border-top: 1px solid #333;
                        border-bottom: 1px solid #333;
                        td {
                            line-height: 36px;
                            font-size: 14px;
                            text-align: center;
                            &.time {
                                text-align: left;
                                width: 90px;
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
                & > h3 {
                    i {
                        color: #fff;
                    }
                }
                .alarmTable {
                    border-top: 1px solid #fff;
                    border-bottom: 1px solid #fff;
                    tr {
                        border-top: 1px solid #fff;
                        border-bottom: 1px solid #fff;
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
        overflow-x: auto;
        background: rgba(40,40,40,.8);
        // border:1px solid #333;
        & > ul {
            white-space: nowrap;
            & > li {
                display: inline-block;
                padding: 5px;
                cursor: pointer;
                border: 1px solid #333;
                background: #fff;
                color: #333;

                &.active {
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
</style>
<template lang="html">
  <div class="map">
    <div class="alarmsList" @mouseover="closeList">
      <ul v-show="listShows&&listShow">
        <li v-for="items in markersDataList" @click="clickOpenInfo(items)" :class="{active:items.isWarn?true:false||items.marker.isWarn?true:false}">
          <p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>{{items.name}}</span></p>
          <p><i class="ivu-icon icon-device"></i><b>设 备 名 称</b>：<span>{{items.nickname}}</span></p>
          <p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>{{items.address}}</span></p>

        </li>
      </ul>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'map',
  data() {
    return {
      pointData: [], //点 的数据
      street: [],
      markers: [], //点列表
      rangePoint: [], //点击之后在圆圈范围的点
      markersDataList: [], //点击之后在圆圈范围的点的数据
      listShow: true,
      listShowTime: 0,
      opts: {
        width: 640, // 信息窗口宽度
        height: 400, // 信息窗口高度
        // title : "信息窗口" , // 信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      }
    }
  },
  computed: {
    listShows() {
      return this.markersDataList.length > 1 ? true : false
    }
  },
  mounted() {
    // 百度地图API功能
    // console.log(this.street)

    var map = new BMap.Map("map", {
      enableMapClick: false
    }); // 创建Map实例
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
        // {
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
    // this.getBoundary(map);
    this.makePoint(map);
    map.addEventListener("tilesloaded", function() { //地图加载完成触发的函数

    })
  },
  methods: {
    getBoundary(map) { //添加行政区域划分
      var bdary = new BMap.Boundary();
      bdary.get("南京市秦淮区", function(rs) { //获取行政区域
        // map.clearOverlays();        //清除地图覆盖物
        var count = rs.boundaries.length; //行政区域的点有多少个
        if (count === 0) {
          alert('未能获取当前输入行政区域');
          return;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 2,
            strokeColor: "#f00",
            fillColor: ''
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
          pointArray = pointArray.concat(ply.getPath());
        }
        // console.log(pointArray)
        map.setViewport(pointArray); //调整视野
        // map.zoomIn()       放大一级
      });
    },
    makePoint(map) { //生成点
      map.clearOverlays(); //清除地图覆盖物

      this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
        .then(res => {
          this.pointData = res.data.rows;
          // console.log(this.pointData)
          this.pointData.forEach((item, index) => {

            this.axios('http://58.213.47.166:8990/device/belong?did=' + item.id) //
              .then(resp => {
                // console.log(resp.data.belong)
                this.$set(this.pointData[index], 'name', resp.data.belong.name);
                this.$set(this.pointData[index], 'tel', resp.data.belong.tel);
              })

            for (let i = 0; i < this.street.length; i++) { //获取完整设备地址
              if (item.sid == this.street[i].sid) {
                this.$set(this.pointData[index], 'address', '江苏省 南京市 秦淮区 ' + this.street[i].n + ' ' + this.pointData[index].address);
              }
            }

            // this.axios('http://58.213.47.166:8990/device/alarmtels?did='+item.id)
            // .then(resp=>{
            //   this.$set(this.pointData[index],'alarmtels',resp.data);
            // })

            let pt = new BMap.Point(item.x, item.y);
            let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42));
            let marker = new BMap.Marker(pt, {
              icon: myIcon
            }); // 创建标注
            // this.markers.push(pt)
            marker.did = item.id;
            this.markers.push(marker);
            marker.setTitle(item.address);
            map.addOverlay(marker);
            ///需优化。。。。
            setTimeout(function() {
              this.addClickHandler(map, item, marker);
            }.bind(this), 100);
            this.watchPoint(map, item, marker)

          })
          // console.log(map)
          // console.log(this.markers)
          // this.markerData = new BMapLib.MarkerClusterer(map, {markers:this.markers});
        })

    },
    watchPoint(map, item, marker) { //设备点监听
      // console.log(marker)
      clearInterval(marker.setInt)

      marker.setInt = setInterval(() => {
        // console.log(marker)
        this.axios('http://service.wanwuyun.com:8920/devicedata/' + item.seckey + '?count=1')
          .then((res) => {
            if (res.data.data.length >= 1) {
              res.data.data[0].ALARM = '2'
              if (res.data.data[0].ALARM == '2') {
                // console.log(marker)
                // map.openInfoWindow(infoWindow,point)
                if (marker.infoCreateTime) {
                  let nowDate = new Date().getTime()
                  let timeDiff = nowDate - marker.infoCreateTime

                  if (timeDiff > 30000) { //设定多少分钟后   依然报警  再次跳动（毫秒）  1秒=1000毫秒
                    this.$set(marker, 'isWarn', true)
                    // marker.isWarn = true;
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    let myIcon = new BMap.Icon("./img/marker2.png",
                      new BMap.Size(39, 42), {});
                    marker.setIcon(myIcon);
                  } else {
                    // console.log(marker.isWarn)
                    // if(marker.isWarn){
                    //   this.$set(marker,'isWarn',false)
                    //   // marker.isWarn=false
                    //   console.log("那啥啥%o",marker)
                    // }
                  }
                } else {
                  this.$set(marker, 'isWarn', true)
                  // marker.isWarn = true;
                  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                  let myIcon = new BMap.Icon("./img/marker2.png",
                    new BMap.Size(39, 42), {});
                  marker.setIcon(myIcon);
                }


              }
            } else {
              // console.log(marker.isWarn)
              // if(marker.isWarn){
              //   this.$set(marker,'isWarn',false)
              //   // marker.isWarn=false
              //   console.log("那啥啥%o",marker)
              // }
            }

          })
      }, 2500)

    },
    addClickHandler(map, item, marker) { //设备点弹出框
      // let that = this;


      marker.addEventListener("click", function(e) {
        // console.log(marker)
        marker.setAnimation(null);

        // let myIcon = new BMap.Icon("./img/marker2.png",
        //   new BMap.Size(44, 49), {});
        // marker.setIcon(myIcon);
        this.geoUtils(marker, map, e) //判断点是否再圆内
        if (this.rangePoint.length <= 1) {
          clearInterval(marker.setInt)
          this.openInfo(marker, item, map) //打开弹出框
          marker.infoCreateTime = new Date().getTime();
          this.watchPoint(map, item, marker) //监听每个点是否报警
        }





        /////////////////////////////////////////

        // console.log('范围点数组:%o', this.rangePoint)
        // console.log('范围点的数据:%o', this.markersDataList)
      }.bind(this));

    },
    geoUtils(marker, map, content, e) { //确定范围点

      // new Promise(()=>{
      this.rangePoint = [];
      this.markersDataList = []
      var c = new BMap.Point(marker.point.lng, marker.point.lat); //圆心
      var circle = new BMap.Circle(c, 50); //范围圆
      for (var i = 0; i < this.markers.length; i++) {
        var pt = new BMap.Point(this.markers[i].point.lng, this.markers[i].point.lat); //每个点
        var result = BMapLib.GeoUtils.isPointInCircle(pt, circle);
        if (result == true) {
          for (var j = 0; j < this.pointData.length; j++) {
            if (this.markers[i].did == this.pointData[j].id) {
              this.$set(this.pointData[j], 'isWarn', this.markers[i].isWarn || false)
              this.$set(this.pointData[j], 'marker', this.markers[i])
              this.$set(this.pointData[j], 'map', map)
              this.markersDataList.push(this.pointData[j])
              this.closeList()
            }
          }
          this.rangePoint.push(this.markers[i]);
        } else {
          // console.log("点在圆形外")
        }
      }
      // }).then(()=>{
      //   // for(let i=0;i<)
      // })
      // console.log(this.rangePoint)

      // map.addOverlay(circle);  //演示：将点与圆形添加到地图上
    },
    clickOpenInfo(items) { //列表触发弹出框
      // items.map.clearOverlays(); //清除地图覆盖物
      this.$set(items, 'isWarn', false)
      // items.isWarn=false;
      items.marker.setAnimation(null);
      clearInterval(items.marker.setInt)
      this.openInfo(items.marker, items, items.map, true)
      items.marker.infoCreateTime = new Date().getTime();
      this.watchPoint(items.map, items, items.marker) //监听每个点是否报警
    },
    openInfo(marker, item, map, s) { //打开弹出框
      // console.log(item.name)
      let content = '';
      let seccon = '';
      new Promise((reslove) => {
        this.axios('http://58.213.47.166:8990/area/alarms?aid=2086&pageNumber=1&pageSize=1000')
          .then(function(res) {
            res.data.rows.forEach(function(items, index) {
              if (item.id == items.dId) {
                seccon += '<tr>' +
                  '<td class="time">' + items.date.slice(0, items.date.indexOf('.')) + '</td>' +
                  '<td class="tel">推送' + items.alarmTel.replace(/,/g, '  ') + '</td>' +
                  '</tr>';
              }
            })
            reslove(seccon)
          })
      }).then((seccon) => {
        let fircon = '<div class="deviceInfor">' +
          '<div class="deviceUserInfor">' +
          '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + item.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + item.tel + '</span></p>' +
          '<p><i class="ivu-icon icon-device"></i><b>设 备 号</b>：<span>' + item.imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + item.address + '</span></p>' +
          '</div>' +
          '<div class="deviceAlarmInfor">' +
          '<h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b></h3>' +
          '<table class="alarmTable">';
        let thrcon = '</table>' +
          '</div>' +
          '</div>';
        content += fircon + seccon + thrcon;
        // console.log('窗口打开')
        if (this.rangePoint.length <= 1 || s) { //判断有一个点就直接显示出来弹框
          // let p = e.target;
          // marker.
          let point = new BMap.Point(marker.point.lng, marker.point.lat);
          let infoWindow = new BMap.InfoWindow(content, this.opts); // 创建信息窗口对象

          infoWindow.addEventListener("close", function(type) {

            // console.log('关闭了');
            // console.log(marker);
            let myIcon = new BMap.Icon("./img/marker1.png",
              new BMap.Size(39, 42), {});
            marker.setIcon(myIcon);
          }.bind(this));

          new Promise((reslove) => {
            map.openInfoWindow(infoWindow, point); //开启信息窗口

            reslove()
          }).then(() => {
            setTimeout(() => {
              // console.log(marker.isWarn)
              let bMapPop = document.getElementsByClassName('BMap_pop')[0]
              // console.log(bMapPop.className)
              //
              // console.log(marker)
              if (marker.isWarn) {
                addClass(bMapPop, 'active')
              } else {
                removeClass(bMapPop, 'active')
              }
              //:-(
              function addClass(obj, cls) {
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
              }

              function removeClass(obj, cls) {
                let obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
                obj_class = obj_class.replace(/(\s+)/gi, ' ') //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
                let removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
                removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
                obj.className = removed; //替换原来的 class.
              }
              this.$set(marker, 'isWarn', false)
              // marker.isWarn = false;

            })
          })
        } else { //多个点列表显示

        }
      })
    },
    closeList() {
      // console.log('调用了')
      let setInter;
      this.listShow = true;
      clearInterval(setInter)
      this.listShowTime = new Date().getTime()
      setInter = setInterval(() => {
        let nowTime = new Date().getTime()
        if (nowTime - this.listShowTime >= 30 * 1000) {
          this.listShow = false;
          // console.log('消失了%b',this.listShow)
          clearInterval(setInter)
        }
      }, 1000)
    }
  },
  destroyed() {
    this.markers.map((item) => {
      clearInterval(item.setInt);
      // marker.setInt
    })

  },
  created() {
    this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
      .then(res => {
        this.street = res.data
      })
  }
}
</script>
