
<!-- 我想换个方法做 没成功 -->

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

    }
}
</style>
<template lang="html">
  <div class="map">
    <div id="map" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import devicePopup from './devicePopup.vue'
export default {
  name: 'map',
  data() {
    return {
      createTime:null,
      watchAlarms:null,
      mapChart:null,
      streetData:[],  //街道数据
      pointData:[],
      option : {
        tooltip: {
            trigger: 'item',
            confine:true,         //超出隐藏
            position: function (point, params, dom, rect, size){
                var top = document.querySelector('.BMap_mask').style.top;
                var left = document.querySelector('.BMap_mask').style.left;
                top = top.substring(0, top.length - 2);
                left = left.substring(0, left.length - 2);
                return [point[0] + 20 - left, point[1] + 20 - top];
            },
            formatter: function (params) {
              console.log(params)
                let str=''
                str+='<div style="height:50px;color:#fff;">'+
                        '<p>姓名：'+params.data.username+'</p>'+
                        '<p>地址：'+params.data.address+'</p>'+
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
            // type: 'effectScatter',
            type: 'scatter',// 使用百度地图坐标系
            coordinateSystem: 'bmap',// 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [],
            // showEffectOn: 'render',
            // rippleEffect: {
            //     brushType: 'stroke'
            // },
            // hoverAnimation: true,
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
                    //     image:function(){
                    //       let img=document.createElement("img")
                    //       img.src='../../img/marker1.png';
                    //       return img
                    //     }, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    //     repeat: 'no-repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                    // },
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
        },{
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: [],
          symbolSize: function (val) {
              return [20,20];
          },
          showEffectOn: 'render',
          rippleEffect: {
              brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
              normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
              }
          },
          itemStyle: {
              normal: {
                  color: 'purple',
                  shadowBlur: 10,
                  shadowColor: '#333'
              }
          },
          zlevel: 1
        }]
      }
    }
  },
  mounted() {
    // console.log(this.createTime)
    // this.mapInit();
    // console.log(this.streetData)
    this.mapChart= echarts.init(document.getElementById('map'));
    this.mapChart.setOption(this.option,true);
  },
  computed:{
    nextOption() {
      return
    }
  },
  watch:{

    pointData(newPointData){   //监听点数据  有的话初始话地图

      this.mapInit()
      console.log(newPointData)
    }
  },
  methods: {
    mapInit(){
      new Promise((resolve)=>{
        let [arr1,arr2]=[[],[]]
        for(let i=0;i<this.pointData.length;i++){
          console.log(this.pointData[i].alarmsStatus)
          if(this.pointData[i].alarmsStatus){ //报警的
            console.log(this.pointData)
            arr2.push(this.pointData[i])
          }else{
            arr1.push(this.pointData[i])
          }
        }
        let option=this.mapChart.getOption()
        console.log(arr2)
        console.log(arr1)
        this.$set(option.series[1],'data',arr2)
        this.$set(option.series[0],'data',arr1)
        resolve(option)
      }).then((option)=>{
        console.log(option)
        this.mapChart.setOption(option,true);
      })


      // myChart.on('click', (params)=>{
      //     this.devicePopupData=params
      //     this.clickPopup()
      // });
    },
    getStreet(){        //街道信息
      this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
      .then(res => {
        this.streetData = res.data
      })
    },
    getPoint(){
      // let data=[]
      // var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      //
      // for(let i=0;i<100;i++){
      //   let obj={}
      //   let name=generateMixed(10);
      //   let value=[selectfrom (118.843334,118.892591),selectfrom (32.041207,32.004567),selectfrom (10,100)]
      //   obj.name=name
      //   obj.value=value
      //   data.push(obj)
      // }
      // this.pointData=data
      // function selectfrom (lowValue,highValue){
      //   var choice=highValue-lowValue;
      //   return (Math.random()*choice+lowValue).toFixed(6);;
      // }
      // function generateMixed(n) {
      //      var res = "";
      //      for(var i = 0; i < n ; i ++) {
      //          var id = Math.ceil(Math.random()*35);
      //         //  console.log(id)
      //          res += chars[id];
      //      }
      //      return res;
      // }
      this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
        .then(res => {
          this.pointData = res.data.rows;
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
            this.$set(item, 'alarmsStatus', false);
            this.watchPoint(index)
        })
      })
    },
    watchPoint(index){
      setInterval(()=>{

        this.axios('http://service.wanwuyun.com:8920/devicedata/' + this.pointData[index].seckey + '?count=1')
        .then((res)=>{

          let realtimeVal=res.data.data
          if(realtimeVal.length>=1){ //设备有效
            this.$set(this.pointData[index], 'alarmsStatus', true);
            if(realtimeVal[0].ALARM=='0'){//没报警

            }else if(realtimeVal[0].ALARM=='1'){
              this.$set(this.pointData[index], 'alarmsStatus', true);
            }else if(realtimeVal[0].ALARM=='2'){//报警
              this.$set(this.pointData[index], 'alarmsStatus', true);
            }
          }else{ //设备无效
            console.log('无效设备')
          }
        })
      },1500)
    }
    // areaAlarms(){
    //   this.axios('http://58.213.47.166:8990/area/alarms?aid=2086&pageNumber=1&pageSize=1000')
    //   .then((res)=>{
    //
    //     console.log(res.data.rows)
    //   })
    // }
  },
  created() {
    // this.createTime=new Date().getTime()
    // this.watchAlarms=setInterval(()=>{
    //   this.areaAlarms()
    // },1000)

    // let street=new Promise(()=>{
    //   this.getStreet()
    // })
    // let point=new Promise((resolve)=>{
    //   this.getPoint()
    // })
    //
    Promise.all([this.getStreet()])
    .then(()=>{
      this.getPoint()
    })
  },
  destroyed(){
    clearInterval(this.watchAlarms);
  }
}
</script>
