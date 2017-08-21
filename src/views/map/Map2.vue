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
.icon-dingwei:before { content: "\e62f"; }


.icon-imsi:before { content: "\e702"; }


.icon-tanhao:before { content: "\e67f"; }


.icon-device:before { content: "\e602"; }


.icon-dianhua:before { content: "\e60"; }


.icon-guanbi:before { content: "\e635"; }


.icon-user:before { content: "\e838"; }


.icon-imsi-c:before { content: "\e839"; }



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
            height: 66px;
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
                height: 66px;
                & > li {
                    display: inline-block;
                    padding: 5px;
                    margin: 0 8px;
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
    <div class="alarmsList" v-show="listShows&&listShow">
      <div class="closeWrap">
        <i class="ivu-icon icon-guanbi closeList" @click="closeList"></i>
      </div>
      <div class="list">
        <ul>
          <li v-for="items in areaMarkerData" @click="clickOpenInfo(items)" :class="{active:items.isWarn?true:false}">
            <p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>{{items.mesData.name}}</span></p>
            <p><i class="ivu-icon icon-device"></i><b>设 备 名 </b>：<span>{{items.mesData.nickname}}</span></p>
            <p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>{{items.mesData.address}}</span></p>
          </li>
        </ul>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bMap: null,
      njAreaData:[],
      streetList: [], //街道列表
      markerData: [], //点列表
      areaMarkerData: [], //范围点数据（解决点过多 无法全部点击 使用列表显示）
      listShow: true,
      opts: {
        width: 640, // 信息窗口宽度
        height: 420, // 信息窗口高度
        enableMessage: true //设置允许信息窗发送短息
      }
    }
  },
  watch: {
    streetList(newStreetList) {
      this.$once(this.bMapInit()); //街道列表 有？ 地图初始化
    }
  },
  methods: {
    getStreet() { //获取街道列表函数
      this.axios.get('area/street?aid=2086')
        .then(res => {
          this.streetList = res.data
        })
    },
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

      this.axios('area/devices?aid=2086&pageNumber=1&pageSize=10000')
        .then(res => {
          let data = res.data.rows;
          data.forEach((item, index) => { //循环所有设备补全信息
            this.axios('device/belong?did=' + item.id) //获取设备用户信息接口
              .then(resp => {
                data[index].name = resp.data.belong.name;
                data[index].tel = resp.data.belong.tel;
              })

            // for (let i = 0; i < this.streetList.length; i++) { //获取完整设备地址
            //   if (item.sid == this.streetList[i].sid) {
            //     this.$set(data[index], 'address', '江苏省 南京市 秦淮区 ' + this.streetList[i].n + ' ' + data[index].address);
            //   }
            // }

            for (let i = 0; i < this.streetList.length; i++) { //获取完整设备地址
              if (item.sid == this.streetList[i].sid) {
                data[index].address = '江苏省 南京市 秦淮区 ' + this.streetList[i].n + ' ' + data[index].address;
              }
            }
            let pt = new BMap.Point(item.x, item.y); //点经纬度
            let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42)); //点图片
            let marker = new BMap.Marker(pt, {
              icon: myIcon
            }); // 生成点

            marker.setTitle(item.address);

            map.addOverlay(marker);
            marker.mesData = data[index]
            this.$set(marker, 'isWarn', false);
            this.markerData.push(marker)
            this.watchPoint(map, marker);
            this.addClickHandler(map, marker);
          })
        })



    },
    watchPoint(map, marker) { //每个点的间歇监听
      clearInterval(marker.setInt)
      marker.setInt = setInterval(() => {
        this.axios('http://service.wanwuyun.com:8920/devicedata/' + marker.mesData.seckey + '?count=1')
          .then((res) => {
            let data = res.data.data;
            if (data.length >= 1) { //有数据证明设备有效
              // data[0].ALARM = '2'
              if (data[0].ALARM == '2') { //报警状态
                if (marker.infoCreateTime) { //如果有打开时的创建时间
                  let nowDate = new Date().getTime()
                  let timeDiff = nowDate - marker.infoCreateTime
                  if (timeDiff > 12 * 60000) { //设定12分钟后   依然报警  再次跳动（毫秒）  1秒=1000毫秒
                    marker.isWarn = true; //是否报警
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                    let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(39, 42), {}); //更改图片（红）
                    marker.setIcon(myIcon);
                  }
                } else { //默认报警直接跳动
                  marker.isWarn = true; //是否报警
                  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                  let myIcon = new BMap.Icon("./img/marker2.png", new BMap.Size(39, 42), {}); //更改图片（红）
                  marker.setIcon(myIcon);
                }

              } else if (data[0].ALARM == '1') { //求救状态

              } else if (data[0].ALARM == '0') { //正常状态
                marker.isWarn = false; //是否报警
                this.$set(marker, 'infoCreateTime', false) //当成状态初始化 为以后二次报警 再次跳动
                marker.setAnimation(null); //停止跳动
                let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {}); //更改图片（蓝）
                marker.setIcon(myIcon);

              } else {
                //其他
              }
            }
          })
      }, 1500)
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
      marker.isWarn = false
      marker.setAnimation(null);
      marker.infoCreateTime = new Date().getTime();
      this.openInfo(this.bMap, marker, true)

      this.watchPoint(this.bMap, marker)
    },
    geoUtils(map, marker) { //百度地图geoUtils  用来确定坐标点是否在设定区域内
      this.areaMarkerData = []; //先清空
      let pts = []; //X                    //Y
      let pt1 = new BMap.Point(marker.point.lng - 0.00006, marker.point.lat + 0.00002); //上左
      let pt2 = new BMap.Point(marker.point.lng + 0.00006, marker.point.lat + 0.00002); //上右
      let pt3 = new BMap.Point(marker.point.lng + 0.00006, marker.point.lat - 0.00012); //下右
      let pt4 = new BMap.Point(marker.point.lng - 0.00006, marker.point.lat - 0.00012); //下左
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
          console.log("点在范围外");
        }
      }
      // map.addOverlay(ply);//显示测定范围矩形
    },
    openInfo(map, marker, onOff) {
      let content = '';
      let seccon = '';
      new Promise((reslove) => {
        let alarmsArr = [];
        this.axios('area/alarms?aid=2086&pageNumber=1&pageSize=1000') //查询该区内所有报警
          .then(function(res) {
            let data = res.data.rows
            data.forEach(function(item, index) {
              if (marker.mesData.id == item.dId) {
                alarmsArr.push(item);
              }
            })
            if (alarmsArr < 1) {
              seccon += '<tr>' +
                '<td class="time" style="text-align:center;">' + "暂无记录" + '</td>'
              '</tr>';
              reslove(seccon);
            } else {
              alarmsArr.forEach(function(item, index) {
                if (marker.mesData.id == item.dId) {
                  alarmsArr.push(item)
                  seccon += '<tr>' +
                    '<td class="time">' + item.date.slice(0, item.date.indexOf('.')) + '</td>' +
                    '<td class="tel">推送' + item.alarmTel.replace(/,/g, '  ') + '</td>' +
                    '</tr>';
                }
              })
              reslove(seccon);
            }
          })
      }).then((seccon) => {
        let fircon = '<div class="deviceInfor">' +
          '<div class="deviceUserInfor">' +
          '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + marker.mesData.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + marker.mesData.tel + '</span></p>' +
          '<p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>' + marker.mesData.nickname + '</span></p>' +
          '<p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>' + marker.mesData.imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + marker.mesData.address + '</span></p>' +
          '</div>' +
          '<div class="deviceAlarmInfor">' +
          '<h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b></h3>' +
          '<div class="alarmTableWrap">' +
          '<table class="alarmTable">';
        let thrcon = '</table>' +
          '<div>' +
          '</div>' +
          '</div>';
        content += fircon + seccon + thrcon;
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

        marker.setAnimation(null);
        marker.infoCreateTime = new Date().getTime();
        let bMapPop = document.getElementsByClassName('BMap_pop')[0];
        if (marker.isWarn) {
          this.addClass(bMapPop, 'active');
        } else {
          this.removeClass(bMapPop, 'active');
        }
        this.infoWindowOpen = (infoWindow, marker) => { //第一次调完上面那货 我就直接让这玩意直接得一个新函数

          marker.setAnimation(null);
          marker.infoCreateTime = new Date().getTime();
          if (marker.isWarn) {
            this.addClass(bMapPop, 'active');
          } else {
            this.removeClass(bMapPop, 'active');
          }
        }
      }.bind(this))

    },
    infoWindowClose(infoWindow, marker) {
      infoWindow.addEventListener("close", function(type) { //弹框关闭时触发的函数 （这东西倒是每次都调 气不气）
        marker.isWarn = false;
        let myIcon = new BMap.Icon("./img/marker1.png", new BMap.Size(39, 42), {});
        marker.setIcon(myIcon);
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
    }
  },
  created() {
    new Promise((resolve) => {
      let njArr = [];
      this.axios.get('area/list')
        .then(res => {
          let data = res.data
          data.map((item) => {
            if (item.id >= 2085 && item.id <= 2095) {
              njArr.push(item);
            }
          })
          resolve(njArr)
        })
    }).then((data) => {
      this.njAreaData = data;
      this.getStreet(); //获取街道列表
    })

  },
  computed: {
    listShows() {
      return this.areaMarkerData.length > 1 ? true : false
    }
  },
  mounted() {

  },
  destroyed() { //页面卸载 清除所有点上的定时器
    this.markerData.map((item) => {
      if (item.setInt) {
        clearInterval(item.setInt);
      }
    })
  }
}
</script>
