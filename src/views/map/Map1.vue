
<template lang="html">
  <div class="map">
      <div class="areaList" v-show="listShows&&listShow">
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
      <div class="alarmList" v-show="option.series[1].data.length>=1?true:false">
        <h3>报警列表</h3>
        <ul>
          <li v-for="items in option.series[1].data" @click="clickOpenInfo(items)">
            <img style="float:left;width:16px;height:18px;margin-top:5px;" src="../../img/marker2.png" />
            {{items.value[2].nickname}}
          </li>
        </ul>
        <!-- <div class="listOnOff">
          <Icon type="arrow-right-b"></Icon>
        </div> -->

        <!-- <Icon type="arrow-left-b"></Icon> -->
      </div>
      <div id="map" style="width:100%;height:100%;"></div>
      <audio id="siren" loop="loop">
        <!-- ./source/119.wav -->
        <source src="src/source/119.wav">
        <source src="src/source/119.mp3">
          Your browser does not support the audio element.
      </audio>

  </div>
</template>

<script>
export default {
  name: 'bmap',
  data() {
    return {
      //南京范围内的行政区域
      njAreaData: [],
      //地图中的数据点
      pointData: [],
      //多个点重合列表显示
      areaPointData: [],
      ycAreaData:[],
      //百度地图信息窗口显示
      listShow: true,
      bMap: null,
      opts: {
        width: 640, // 信息窗口宽度
        height: 420, // 信息窗口高度
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
          formatter: (params) => {

            if(params.value[2].aid=='460041765206595'){
              this.ycAreaData.map((items) => {
                console.log(params.value[2].aid)
                let address = ''
                // console.log(params.value[2].aid == items.id||params.value[2].aid == '830')
                if (params.value[2].aid == items.id||params.value[2].aid == '830') {
                  address += '江苏省 盐城市 ' + items.county;
                  params.value[2].addressDetail = ''
                  params.value[2].addressDetail = address + ' ' + params.value[2].address
                  // for (let j = 0; j < items.street.length; j++) {
                  //   if (params.value[2].sid == items.street[j].id) {
                  //     address += ' ' + items.street[j].street;
                  //     params.value[2].addressDetail = ''
                  //     params.value[2].addressDetail = address + ' ' + params.value[2].address
                  //   }
                  // }
                }
              })
            }else{
              this.njAreaData.map((items) => {
                let address = ''
                if (params.value[2].aid == items.id) {
                  address += '江苏省 南京市 ' + items.county;
                  for (let j = 0; j < items.street.length; j++) {
                    if (params.value[2].sid == items.street[j].id) {
                      address += ' ' + items.street[j].street;
                      params.value[2].addressDetail = ''
                      params.value[2].addressDetail = address + ' ' + params.value[2].address
                      // resolve()
                    }
                  }
                }
              })
            }

            let str = ''
            str += '<div style="color:#fff;">' +
              '<p id="deviceName">' + params.value[2].nickname + '</p>' +
              '<p>' + params.value[2].addressDetail + '</p>' +
              '</div>'
            return str
          }
        },
        bmap: { // 加载 bmap 组件
          center: [118.798811, 32.037492], // 百度地图中心经纬度
          zoom: 16, // 百度地图缩放
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
          //正常在线点
          {
            type: 'scatter', // 使用百度地图坐标系
            coordinateSystem: 'bmap', // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [],
            // image://./src/img/marker1.png
            symbol: 'image://./src/img/marker1.png',
            symbolSize: function(val) {
              return [15, 16];
            },
            zlevel: 1
          },
          //报警点
          {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: [],
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke',
              scale: 4
            },
            hoverAnimation: true,
            symbol: 'image://./src/img/marker2.png',
            scale: 100,
            symbolSize: function(val) {
              return [18, 20];
            },
            zlevel: 4
          },
          //报过警的点
          {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [],
            symbol: 'image://./src/img/marker3.png',
            symbolSize: function(val) {
              return [16, 18];
            },
            zlevel: 3
          },
          //离线点
          {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [],
            symbol: 'image://./src/img/marker4.png',
            symbolSize: function(val) {
              return [16, 18];
            },
            zlevel: 2
          }

        ]
      }
    }
  },
  computed: {
    //控制范围点列表的显示
    listShows() {
      // console.log(this.areaPointData)
      return this.areaPointData.length > 1 ? true : false
    }
  },
  watch: {
    option: {
      handler: (val, oldVal) => {
        // 监听报警数量 开关声音
        if (oldVal.series[1].data.length > 0) {
          document.getElementById('siren').play()
        } else {
          document.getElementById('siren').pause()
        }
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.ycAreaData)
  },
  methods: {
    initBMap() {
      var myChart = echarts.init(document.getElementById('map'));
      this.myChart = myChart
      //'device/listAllDevice?pageIndex=1&pageSize=200'
      this.axios('device/listAllDeviceNoPage', { //优化后的接口
          // onDownloadProgress: function(progressEvent) {
          //   console.log(progressEvent)
          // }
        })
        .then(res => {
          let data = res.data.data;
          let total = res.data.total;
          let echartsArr = [];
          //数据处理成echarts数据
          data.map((item) => {
            if (item.x == '4.9E-324' || item.y == '4.9E-324' || !(item.x > 73.255024 && item.x < 135.437887) || !(item.y > 2.820272 && item.y < 53.829599)) {
              item.x = this.randomNumBoth(118.726818, 118.887794);
              item.y = this.randomNumBoth(31.98072, 32.082593);
            }
            if(item.imsi=='460041765206595'){

            }
            let obj = {
              name: item.id,
              value: [item.x, item.y, item]
            }
            echartsArr.push(obj)
          })
          this.option.series[0].data = echartsArr
          myChart.setOption(this.option);
          myChart.resize();
          //百度地图初始化获取地图对象
          var bMap = myChart.getModel().getComponent('bmap').getBMap();
          console.log(bMap)
          console.log(myChart.getModel)
          console.log(myChart.getModel().getComponent)
          this.bMap = bMap;
          //报警监听
          this.watchPoint(bMap, myChart);
          //定时分段调取
          // let pageNumber = 2;
          // let countpageNum = Math.ceil(parseFloat(total) / 200);
          // // let subTotal;
          // let pointSetInt = setInterval(() => {
          //   // console.log(pageNumber)
          //   if (pageNumber >= countpageNum) {
          //     clearInterval(pointSetInt)
          //   }
          //   this.axios('device/listAllDevice?pageIndex=' + pageNumber + '&pageSize=200', {})
          //     .then(suRes => {
          //       let subData = suRes.data.data;
          //       // subTotal=subData.length
          //       // console.log(subData.length)
          //       if (subData.length == 0) {
          //         clearInterval(pointSetInt)
          //       }
          //       let SubEchartsArr = [];
          //       subData.map((item) => {
          //         let obj = {
          //           name: item.id,
          //           value: [item.x, item.y, item]
          //         }
          //         SubEchartsArr.push(obj)
          //       })
          //       this.option.series[0].data = this.option.series[0].data.concat(SubEchartsArr);
          //       myChart.setOption(this.option);
          //       // myChart.resize();
          //       // console.log(suRes.config.url)
          //       function getQueryString(name) {
          //         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          //         var r = suRes.config.url.split('?')[1].match(reg);
          //         if (r != null) {
          //           return unescape(r[2]);
          //         }
          //         return null;
          //       }
          //       // console.log(getQueryString('pageIndex'))
          //       if (getQueryString('pageIndex') == countpageNum) {
          //         // console.log('最后一次')
          //         this.watchPoint(bMap, myChart);
          //       }
          //     })
          //
          //
          //   pageNumber++;
          // });

          window.onresize = () => {
            // myChart.resize()
            // console.log(document.getElementsByTagName('canvas'))
            let canvas = document.getElementsByTagName('canvas');
            for (let i = 0; i < canvas.length; i++) {
              canvas[0].style.width = '100%';
              canvas[0].style.height = '100%';
            }
            myChart.resize();
          }
          //点点击
          myChart.on('click', (params) => {
            console.log(params.data)
            // params.data.symbol='image://./src/img/marker2.png'
            this.option.series[0].data.map((item) => {
              if (params.data.name == item.name) {
                new Promise((resolve) => {
                  this.geoUtils(bMap, item); //
                  resolve()
                }).then(() => {
                  this.openInfo(bMap, item); //打开弹框
                })
              }
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
    //报警监听
    watchPoint(bMap, myChart) {
      let warning = [] //报警的
      let notice = [] //离线的
      let normal = [] //在线的
      let aa = (message) => {
        // console.log(message)
        let data = message;

        for (let key in data) {
          // console.log(key+'__'+data[key])
          this.option.series[0].data.map((item) => {
            if (key == item.value[2].id) {
              if (data[key] == '1') { //报警
                // console.log(item);
                if (item.value[2].isWarn != 'warning') {
                  this.option.series[1].data.push(item);
                }
                this.$set(item.value[2], 'isWarn', 'warning')
                // this.$set(item,'symbol','image://./src/img/marker2.png');
              } else if (data[key] == '0') { //离线
                if (item.value[2].isWarn != 'notice') {
                  this.option.series[3].data.push(item);
                }
                this.$set(item.value[2], 'isWarn', 'notice')
                // this.$set(item,'symbol','image://./src/img/marker4.png');
              } else if (data[key] == '2') { //上线'
                if (item.value[2].isWarn != 'normal') {
                  // normal.push(item);
                  for (var i = 0; i < this.option.series[3].data.length; i++) {
                    if (this.option.series[3].data[i].name == item.name) {
                      for (var j = 0; j < this.option.series[0].data.length; j++) {
                        if (this.option.series[0].data[i].name == item.name) {
                          this.option.series[0].data.splice(j, 1);
                          this.option.series[0].data.push(item);
                          break;
                        }
                      }
                      this.option.series[3].data.splice(i, 1);
                      break;
                    }
                  }
                }
                this.$set(item.value[2], 'isWarn', 'normal')
                // this.$set(item,'symbol','image://./src/img/marker1.png');
              }
            } else {

            }
          })
          // this.$set(this.option.series[1], 'data', warning)
          // this.$set(this.option.series[2], 'data', [])
          // this.$set(this.option.series[3], 'data', notice)

        }
        // myChart.resize();
        // myChart.setOption(this.option)
        myChart.setOption({
          series: [{
              type: 'scatter', //常态的
              data: this.option.series[0].data
            },
            {
              type: 'effectScatter', //报警的
              data: this.option.series[1].data
            },
            {
              type: 'scatter', //报过警的
              data: this.option.series[2].data
            },
            {
              type: 'scatter', //离线的
              data: this.option.series[3].data
            }
          ]
        });

        let pointArr=[]
        this.option.series[1].data.map((item)=>{
          let point=new BMap.Point(item.value[0],item.value[1])
          pointArr.push(point)
        })
        let view=this.bMap.getViewport(pointArr)
        this.bMap.centerAndZoom(view.center,view.zoom);
        // myChart.resize();
      }


      //   setInterval(() => {
      //     aa({
      //       521: 1
      //     })
      //   setTimeout(() => {
      //     aa({
      //       383: 1
      //     })
      //   }, 115)
      //   setTimeout(() => {
      //     aa({
      //       1080: 1
      //     })
      //   }, 400)
      // }, 30000)

      this.goEasy = new GoEasy({
        //  appkey: 'BC-c9708db6dee74beb87244e4a1ce1554b'
        appkey: 'BC-7d00ae382f2f42cd904b263af6a76ff0'
      });
      this.goEasy.publish({
        channel: 'demo_channel',
        message: 'Hello world!'
      });
      // console.log('监听开启')

      this.goEasy.subscribe({
        channel: 'gasalarm',
        onMessage: (message) => {
          // console.log(message)
          let data = JSON.parse(message.content);
          console.log(data)
          for (let key in data) {
            // console.log(key+'__'+data[key])
            this.option.series[0].data.map((item) => {
              if (key == item.value[2].id) {
                if (data[key] == '1') { //报警
                  // console.log(item);
                  if (item.value[2].isWarn != 'warning') {
                    this.option.series[1].data.push(item);
                  }
                  this.$set(item.value[2], 'isWarn', 'warning')
                  // this.$set(item,'symbol','image://./src/img/marker2.png');
                } else if (data[key] == '0') { //离线
                  if (item.value[2].isWarn != 'notice') {
                    this.option.series[3].data.push(item);
                  }
                  this.$set(item.value[2], 'isWarn', 'notice')
                  // this.$set(item,'symbol','image://./src/img/marker4.png');
                } else if (data[key] == '2') { //上线'
                  if (item.value[2].isWarn != 'normal') {
                    // normal.push(item);
                    // 去除 离线data里的单条数据 并更新在线data相应数据
                    for (var i = 0; i < this.option.series[3].data.length; i++) {
                      if (this.option.series[3].data[i].name == item.name) {
                        for (var j = 0; j < this.option.series[0].data.length; j++) {
                          if (this.option.series[0].data[i].name == item.name) {
                            this.option.series[0].data.splice(j, 1);
                            this.option.series[0].data.push(item);
                            break;
                          }
                        }

                        this.option.series[3].data.splice(i, 1);
                        break;
                      }
                    }
                  }
                  this.$set(item.value[2], 'isWarn', 'normal')
                  // this.$set(item,'symbol','image://./src/img/marker1.png');
                }
              } else {

              }
            })
            // this.$set(this.option.series[1], 'data', warning)
            // this.$set(this.option.series[2], 'data', [])
            // this.$set(this.option.series[3], 'data', notice)

          }
          // myChart.resize();
          // myChart.setOption(this.option)
          myChart.setOption({
            series: [{
                type: 'scatter', //常态的
                data: this.option.series[0].data
              },
              {
                type: 'effectScatter', //报警的
                data: this.option.series[1].data
              },
              {
                type: 'scatter', //报过警的
                data: this.option.series[2].data
              },
              {
                type: 'scatter', //离线的
                data: this.option.series[3].data
              }
            ]
          });
          // 报警时  改变地图中心点和缩放级别  使所有点都显示出来
          let pointArr = []
          this.option.series[1].data.map((item) => {
            let point = new BMap.Point(item.value[0], item.value[1])
            pointArr.push(point)
          })
          let view = this.bMap.getViewport(pointArr)
          this.bMap.centerAndZoom(view.center, view.zoom);
          myChart.resize();
        },
        onSuccess: function() {
          console.log("监听开启");
        },
        onFailed: function(error) {
          console.log("监听失败, 错误编码：" + error.code + " 错误信息：" + error.content)
        }

      });



    },
    //点重合范围判定
    geoUtils(bMap, params) {
      //首先清空区域数据
      this.areaPointData = []

      //多边形区域
      let poly = [
        [params.value[0] - 0.00006, parseFloat(params.value[1]) + 0.00005],
        [parseFloat(params.value[0]) + 0.00006, parseFloat(params.value[1]) + 0.00005],
        [parseFloat(params.value[0]) + 0.00006, params.value[1] - 0.00005],
        [params.value[0] - 0.00006, params.value[1] - 0.00005]
      ];
      for (let i = 0; i < this.option.series[0].data.length; i++) {
        //每个点
        let p = [this.option.series[0].data[i].value[0], this.option.series[0].data[i].value[1]]
        //判断此点是否在设定区域内
        let result = rayCasting(p, poly);
        //地址补全
        if(params.value[2].imsi=='460041765206595'){
          this.ycAreaData.map((items) => {
            let address = ''
            // console.log(params.value[2].aid == items.id||params.value[2].aid == '830')
            if (this.option.series[0].data[i].value[2].aid == items.id||this.option.series[0].data[i].value[2].aid== '830') {
              address += '江苏省 盐城市 ' + items.county;
              params.value[2].addressDetail = ''
              params.value[2].addressDetail = address + ' ' + params.value[2].address
              // for (let j = 0; j < items.street.length; j++) {
              //   if (params.value[2].sid == items.street[j].id) {
              //     address += ' ' + items.street[j].street;
              //     params.value[2].addressDetail = ''
              //     params.value[2].addressDetail = address + ' ' + params.value[2].address
              //   }
              // }
            }
          })
        }else{
          this.njAreaData.map((items) => {
            let address = ''
            if (this.option.series[0].data[i].value[2].aid == items.id) {
              address += '江苏省 南京市 ' + items.county;
              for (let j = 0; j < items.street.length; j++) {
                if (this.option.series[0].data[i].value[2].sid == items.street[j].id) {
                  address += ' ' + items.street[j].street;
                  this.option.series[0].data[i].value[2].addressDetail = ''
                  this.option.series[0].data[i].value[2].addressDetail = address + ' ' + this.option.series[0].data[i].value[2].address

                }
              }
            }
          })
        }

        if (result == true) {
          this.areaPointData.push(this.option.series[0].data[i]);
          console.log("点在范围nei");

          this.listShow = true;
        } else {
          // console.log("点在范围外");
        }
      }


      //射线算法  判断点是否再区域内
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
    //信息窗口打开
    openInfo(bMap, params, onOff) {
      // console.log(params)
      let content = '';
      let seccon = '';
      // 报警内容获取
      let alarmCon = new Promise((resolve) => {
        let alarmsArr = [];
        let alarmMes = {
          alarmNum: 0,
          seccon: ''
        };
        this.axios('alarm/queryAlarmRecords?did=' + params.value[2].id + '&pageNumber=1&pageSize=10000')
          .then(function(res) {

            let data = res.data
            // console.log(data)
            if (data.resultFlag) {
              if (data.data.total > 0) { //1个或多条报警
                alarmsArr = data.data.rows;
                alarmMes.alarmNum = data.data.total;
                alarmsArr.forEach(function(item, index) {
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
                })
                resolve(alarmMes);
              } else { //没有报警记录
                alarmMes.seccon += '<tr>' +
                  '<td class="time" style="text-align:center;">' + "暂无记录" + '</td>'
                '</tr>';
                resolve(alarmMes);
              }
              alarmsArr = data.data.rows;
              alarmMes.alarmNum = data.data.total;
            }
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '查询报警记录时服务出错',
            });
          })
      }).then(res => res)
      //用户报警手机号获取
      let alarmTel = new Promise((resolve) => {
        //用户手机号请求
        let arlarmTels = ''
        this.axios('device/alarmtels', {
            params: {
              did: params.value[2].id
            }
          })
          .then((res) => {
            let data = res.data;
            // params.value[2].arlarmTels=data.result.join(' ')
            this.$set(params.value[2], 'arlarmTels', data.result.join(' '))
            resolve();
          })
      }).then(res => res)
      Promise.all([alarmCon, alarmTel]).then(([alarmMes]) => {
        // console.log(alarmMes,tel)
        //详细地址补全

        if(params.value[2].imsi=='460041765206595'){
          this.ycAreaData.map((items) => {
            let address = ''
            // console.log(params.value[2].aid == items.id||params.value[2].aid == '830')
            if (params.value[2].aid == items.id||params.value[2].aid == '830') {
              address += '江苏省 盐城市 ' + items.county;
              params.value[2].addressDetail = ''
              params.value[2].addressDetail = address + ' ' + params.value[2].address
              // for (let j = 0; j < items.street.length; j++) {
              //   if (params.value[2].sid == items.street[j].id) {
              //     address += ' ' + items.street[j].street;
              //     params.value[2].addressDetail = ''
              //     params.value[2].addressDetail = address + ' ' + params.value[2].address
              //   }
              // }
            }
          })
        }else{
          this.njAreaData.map((items) => {
            let address = ''
            if (params.value[2].aid == items.id) {
              address += '江苏省 南京市 ' + items.county;
              for (let j = 0; j < items.street.length; j++) {
                if (params.value[2].sid == items.street[j].id) {
                  address += ' ' + items.street[j].street;
                  params.value[2].addressDetail = ''
                  params.value[2].addressDetail = address + ' ' + params.value[2].address
                }
              }
            }
          })
        }
        let fircon = '<div class="deviceInfor">' +
          '<div class="deviceUserInfor">' +
          '<p><i class="ivu-icon icon-device"></i><b>设 备 名</b>：<span>' + params.value[2].nickname + '</span></p>' +
          // '<p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>' + marker.mesData.name + '</span></p>' +
          '<p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>' + params.value[2].arlarmTels + '</span></p>' +
          '<p><i class="ivu-icon icon-imsi"></i><b>设 备 号</b>：<span>' + params.value[2].imsi + '</span></p>' +
          '<p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>' + params.value[2].addressDetail + '</span></p>' +
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
          //打开
          bMap.openInfoWindow(infoWindow, point);
          // infoWindow.restore()
          //打开后进行样式设置  内操作
          this.infoWindowOpen(infoWindow, params);
          //关闭  执行点状态更新
          this.infoWindowClose(infoWindow, params);

        }

      })
    },
    //手动点击范围点列表弹出信息框
    clickOpenInfo(params) {
      this.openInfo(this.bMap, params, true)
    },
    //关闭范围点列表
    closeList() {
      this.listShow = false;
    },
    infoWindowOpen(infoWindow, params) {
      let bMapPop;
      let domEvent = () => {
        bMapPop = document.getElementsByClassName('BMap_pop')[0];
        if (params.value[2].isWarn == 'warning') {
          this.addClass(bMapPop, 'active');
        } else {
          this.removeClass(bMapPop, 'active');
        }
        document.getElementsByClassName("deviceAlarmInfor")[0].addEventListener("click", function(e) {
          if (e.target && e.target.id == 'alarmDetial') {
            this.$router.push({
              name: 'deviceLog',
              params: {
                id: params.value[2].id,
                name: encodeURI(params.value[2].nickname)
              }
            })
          }
        }.bind(this), false);
      }
      if (infoWindow.isOpen()) {
        domEvent()
      } else {
        infoWindow.addEventListener('open', function(e) {
          domEvent()
        }.bind(this));
      }

    },
    infoWindowClose(infoWindow, params) {
      infoWindow.addEventListener("close", function(type) {
        let resize = false
        if (params.value[2].isWarn == 'notice') { //离线的
          this.$set(params.value[2], 'isWarn', 'notice')
          // for(var i=0; i<this.option.series[3].data.length; i++) {
          //   if(this.option.series[3].data[i].name == params.name) {
          //     this.option.series[3].data.splice(i, 1);
          //     break;
          //   }
          // }
          // this.$set(params,'symbol','image://./src/img/marker4.png');
        } else if (params.value[2].isWarn == 'warning') { //报警的
          resize = true
          this.$set(params.value[2], 'isWarn', 'caution')
          // this.$set(params,'symbol','image://./src/img/marker3.png');
          //报警点data单个去除
          let cautionItem = null
          for (let i = 0; i < this.option.series[1].data.length; i++) {
            if (this.option.series[1].data[i].name == params.name) {
              cautionItem = this.option.series[1].data[i]
              this.option.series[1].data.splice(i, 1);
              break;
            }
          }
          //  报过警点data添加  ps:判断ata是否已经有相应点数据
          if (this.option.series[2].data.length >= 1) {
            let cautionOnOff = true
            for (let i = 0; i < this.option.series[2].data.length; i++) {
              console.log(params.name)
              console.log(this.option.series[2].data[i].name)
              if (params.name == this.option.series[2].data[i].name) {
                cautionOnOff = false;
                break;
              }
            }
            if (cautionOnOff) {
              this.option.series[2].data.push(cautionItem);
            }
          } else {
            this.option.series[2].data.push(cautionItem);
          }

        } else if (params.value[2].isWarn == 'caution') { //报过警的
          this.$set(params.value[2], 'isWarn', 'caution')
          // this.$set(params,'symbol','image://./src/img/marker3.png');
        } else { //其他的
          // resize=true
          this.$set(params.value[2], 'isWarn', 'normal')
          // this.$set(params,'symbol','image://./src/img/marker1.png');

        }
        //确定状态改变  更新全部点
        if (resize) {
          this.myChart.setOption({
            series: [{
                type: 'scatter', //常态的
              },
              {
                type: 'effectScatter', //报警的
                data: this.option.series[1].data
              },
              {
                type: 'scatter', //报过警的
                data: this.option.series[2].data
              },
              {
                type: 'scatter', //离线的
                data: this.option.series[3].data
              }
            ]
          });
          myChart.resize();
          console.log(this.option.series[2].data)
        }
      }.bind(this))

    },
    //添加clss
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
    //移除class
    removeClass(obj, cls) {
      let obj_class = ' ' + obj.className + ' '; //获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
      obj_class = obj_class.replace(/(\s+)/gi, ' ') //将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
      let removed = obj_class.replace(' ' + cls + ' ', ' '); //在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
      removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格. ex) 'bcd ' -> 'bcd'
      obj.className = removed; //替换原来的 class.
    },
    randomNumBoth(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + (Rand * Range);
      return num;
    }
  },
  created() {
    //南京市区域数据
    let ycData=new Promise((resolve) => {
      this.axios.get('region/countyAndStreet', {
          params: {
            id: 1000
          }
        })
        .then(res => {
          let data = res.data
          if (data.resultFlag) {
            console.log('盐城',data)
            this.ycAreaData = data.data
            resolve(data.data)
          } else {
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
    }).then(res => res)
    let njData=new Promise((resolve) => {
      this.axios.get('region/countyAndStreet', {
          params: {
            id: 830
          }
        })
        .then(res => {
          let data = res.data
          if (data.resultFlag) {
            resolve(data.data)
          } else {
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
    }).then(res => res)
    Promise.all([ycData, njData]).then(([ycAreaData,njAreaData]) => {
      this.njAreaData = njAreaData;
      this.ycAreaData = ycAreaData;
      this.initBMap()
    })
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: "Ionicons";
    src: url("../../iconfont/mapIconfont.eot?t=1502947190921");
    /* iOS 4.1- */
    /* IE9*/
    src:url('../../iconfont/mapIconfont.eot?t=1502947190921#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('../../iconfont/mapIconfont.woff?t=1502947190921') format('woff'),
    /* chrome, firefox */
    url('../../iconfont/mapIconfont.ttf?t=1502947190921') format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
     url("../../iconfont/mapIconfont.svg?t=1502947190921#iconfont") format('svg');
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
        overflow: hidden;
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
                #alarmCount {
                    display: inline-block;
                    margin-left: 10px;
                    font-size: 14px;
                    line-height: 26px;
                    & > b {
                        margin: 0 4px;
                    }
                }
                & > h3 {

                    #alarmDetial {
                        font-weight: normal;
                        cursor: pointer;
                        font-size: 14px;
                        line-height: 24px;
                        float: right;
                        &:hover {
                            color: #3b6ceb;
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
                    border-collapse: collapse;
                    tr {
                        &:hover {
                            background: #517aff;
                            color: #fff;
                        }
                        &+tr {
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
                                vertical-align: middle;
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
                #alarmCount {}
                & > h3 {

                    #alarmDetial {}

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
                        &:hover {
                            background: #f44f60;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .areaList {
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
    .alarmList {
        position: absolute;
        left: 0;
        z-index: 10000;
        background: rgba(0,0,0,0.7);
        padding: 20px 0;
        & > h3 {
            font-size: 16px;
            text-align: center;
            color: #f00;
        }
        & > ul {
            min-width: 120px;
            & > li {
                color: #fff;
                width: 100%;
                padding: 0 20px;
                text-align: center;
                line-height: 30px;
                cursor: pointer;
                &:hover {
                    background: rgba(255,255,255,0.2);
                }
            }
        }
        .listOnOff {
            position: absolute;
            top: 0;
            bottom: 0;
            height: 30px;
            margin: auto;
            right: -15px;
            color: #f00;
            & > i {
                font-size: 30px;
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
