<style lang="scss">

@font-face {font-family: "Ionicons";
  src: url('../../iconfont/mapIconfont.eot?t=1502095769729'); /* IE9*/
  src: url('../../iconfont/mapIconfont.eot?t=1502095769729#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../../iconfont/mapIconfont.woff?t=1502095769729') format('woff'), /* chrome, firefox */
  url('../../iconfont/mapIconfont.ttf?t=1502095769729') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../../iconfont/mapIconfont.svg?t=1502095769729#iconfont') format('svg'); /* iOS 4.1- */
}

.icon-dingwei:before { content: "\e62f"; }

.icon-tanhao:before { content: "\e67f"; }

.icon-device:before { content: "\e602"; }

.icon-dianhua:before { content: "\e604"; }

.icon-guanbi:before { content: "\e635"; }

.icon-user:before { content: "\e838"; }

.map {
    height:100%;
    width:100%;
    overflow: hidden;

}
// .BMap_mask{
//   z-index: 250!important;
// }
.devicePopup {
    padding:20px;
    background:#fff;
    // width:400px;
    position: absolute;
    top:0;
    left:0;
    z-index: 1000;
    .popupClose{
      position: absolute;
      right:15px;
      top:10px;
      font-size: 16px;
      cursor: pointer;
    }
    .userMes {
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
    .alarmMes {
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
</style>
<template lang="html">
  <div class="map">
      <div id="map" style="width:100%;height:100%;"></div>
      <div class="devicePopup" v-if="devicePopupShow">
        <i class="ivu-icon icon-guanbi popupClose" @click="popupClose()"></i>
        <div class="userMes">
          <p><i class="ivu-icon icon-user"></i><b>户 主</b>：<span>{{devicePopupData.data.username}}</span></p>
          <p><i class="ivu-icon icon-dianhua"></i><b>联 系 方 式</b>：<span>{{devicePopupData.data.tel}}</span></p>
          <p><i class="ivu-icon icon-device"></i><b>设 备 号</b>：<span>{{devicePopupData.data.imsi}}</span></p>
          <p><i class="ivu-icon icon-dingwei"></i><b>地 址</b>：<span>{{devicePopupData.data.address}}</span></p>
        </div>
        <div class="alarmMes">
          <h3><i class="ivu-icon icon-tanhao"></i><b>报 警 记 录</b></h3>
          <table class="alarmTable">
            <tr>
              <td class="time"></td>
              <td class="tel"></td>
            </tr>
          </table>
        </div>
      </div>
    <div class="popupMark"></div>
  </div>
</template>

<script>


export default {
  name: 'map',
  data() {
    return {
      devicePopupShow:false,
      pointData:[],
      streetData:[],
      devicePopupData:{},
      alarmTable:[],
      option : {
        tooltip: {
            trigger: 'item',
            confine:true,         //超出隐藏
            position: function (point, params, dom, rect, size) {
                var top = document.querySelector('.BMap_mask').style.top;
                var left = document.querySelector('.BMap_mask').style.left;
                top = top.substring(0, top.length - 2);
                left = left.substring(0, left.length - 2);
                return [point[0] + 20 - left, point[1] + 20 - top];
            },
            formatter: function (params) {
              // console.log(params)
                let str=''
                str+='<div style="height:50px;color:#fff;">'+
                        '<p>姓名：'+params.data.name+'</p>'+
                        '<p>实时值：'+params.data.value[2]+'</p>'+
                     '</div>'
                return str
            }
        },
        bmap: {  // 加载 bmap 组件
            center: [118.823513,32.020812],// 百度地图中心经纬度
            zoom: 14,// 百度地图缩放
            roam: true,// 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
            mapStyle: {// 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
              styleJson: [
                  {
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
            type: 'scatter',// 使用百度地图坐标系
            coordinateSystem: 'bmap',// 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [],
            symbolSize: function (val) {

                return [10,10];
            },
            // label: {
            //     // normal: {           //标签
            //     //     formatter: '{a}:{b}:{c}',
            //     //     position: 'right',
            //     //     show: false
            //     // },
            //     emphasis: {
            //         show: true     //鼠标浮上显示信息
            //     }
            // },
            itemStyle: {
                normal: {
                    color: '#00f',
                    // color: {
                    //     image:img, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    //     repeat: 'no-repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                    // },
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
        }]
      }
    }
  },
  //name:"海门"
  // value:Array(3)
  // 0:121.15
  // 1:31.89
  // 2:9
  mounted() {

    setTimeout(()=>{

      this.option.series[0].data=this.pointData
      console.log(this.option.series[0].data)
      var myChart = echarts.init(document.getElementById('map'));
      myChart.setOption(this.option,true);
      myChart.on('click', function (params) {
          this.devicePopupData=params
          this.clickPopup()

      }.bind(this));
      console.log(this)
      var bmap = myChart.getModel().getComponent('bmap').getBMap();
      bmap.addControl({enableMapClick:false});
      // bmap.addControl(new BMap.MapTypeControl());//{enableMapClick:false}
    },100)



  },
  methods: {
    clickPopup(){
      this.devicePopupShow=true;
      new Promise((resolve)=>{
        this.axios('http://58.213.47.166:8990/area/alarms?aid=2086&pageNumber=1&pageSize=1000')
        .then((res)=>{
          res.data.rows.forEach((items, index)=>{
            if (this.devicePopupData.data.id == items.dId) {

              resolve(items)
            }
          })
        })

      }).then((res)=>{
        console.log(res)
        this.alarmTable=res
      })


      // this.alarmTable
      console.log(this.alarmTable)
      console.log(this.devicePopupData.event.offsetX+'__'+this.devicePopupData.event.offsetY)
    },
    popupClose(){
      console.log('popupClose')
    },
    getStreet(){
      this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
      .then(res => {
        this.streetData = res.data
      })
    },
    getPoint(){
      let data=[]
      var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

      for(let i=0;i<100;i++){
        let obj={}
        let name=generateMixed(10);
        let value=[selectfrom (118.843334,118.892591),selectfrom (32.041207,32.004567),selectfrom (10,100)]
        obj.name=name
        obj.value=value
        data.push(obj)
      }
      this.pointData=data
      function selectfrom (lowValue,highValue){
        var choice=highValue-lowValue;
        return (Math.random()*choice+lowValue).toFixed(6);;
      }
      function generateMixed(n) {
           var res = "";
           for(var i = 0; i < n ; i ++) {
               var id = Math.ceil(Math.random()*35);
              //  console.log(id)
               res += chars[id];
           }
           return res;
      }
      this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
        .then(res => {
          this.pointData = res.data.rows;
          console.log(this.pointData)
          this.pointData.forEach((item, index) => {
            this.$set(this.pointData[index], 'value', [this.pointData[index].x,this.pointData[index].y]);
            this.axios('http://58.213.47.166:8990/device/belong?did=' + item.id) //
            .then(resp => {
              // console.log(resp.data.belong)
              this.$set(this.pointData[index], 'username', resp.data.belong.name);
              this.$set(this.pointData[index], 'tel', resp.data.belong.tel);
            })

            for (let i = 0; i < this.streetData.length; i++) { //获取完整设备地址
              if (item.sid == this.streetData[i].sid) {
                this.$set(this.pointData[index], 'address', '江苏省 南京市 秦淮区 ' + this.streetData[i].n + ' ' + this.pointData[index].address);
              }
            }
        })
      })
    }
  },
  created() {
    this.getStreet()
    this.getPoint()
  }
}
</script>
