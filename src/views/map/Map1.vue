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
    url( '../../iconfont/mapIconfont.svg?t=1501226686963#iconfont') format('svg');
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
    height:100%;
    width:100%;
    overflow: hidden;
}
</style>
<template lang="html">
  <div class="map">
    <div id="map" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>

export default {
  name: 'map',
  data() {
    return {
      pointData:[],
      streetData:[],
      option : {
        tooltip: {
            trigger: 'item',
            confine:true,         //超出隐藏
            position: function (point, params, dom, rect, size) {

                // console.log(point)
                // console.log(dom)
                // // console.log(params)
                // console.log(rect)
                // console.log(size)
                // return point
                //rect.x y    点的右上角  xy
                //point     array      点中心距离地图窗口top  left
                //size.viewSize   tooltip大小
                //size.viewSize  整个地图窗口大小

            },
            formatter: function (params) {
                return params.name + ' : ' + params.value[2];
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
            label: {
                // normal: {           //标签
                //     formatter: '{a}:{b}:{c}',
                //     position: 'right',
                //     show: false
                // },
                emphasis: {
                    show: false     //鼠标浮上显示信息
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple',
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
          console.log(params);
      });
      console.log(this)
      var bmap = myChart.getModel().getComponent('bmap').getBMap();
      bmap.addControl(new BMap.MapTypeControl());//{enableMapClick:false}
    },100)



  },
  methods: {
    getStreet(){
      this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
      .then(res => {
        this.streetData = res.data
      })
    },
    getPoint(){
      let data=[]
      var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

      for(let i=0;i<5000;i++){
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
      // this.axios('http://58.213.47.166:8990/area/devices?aid=2086&pageNumber=1&pageSize=10000')
        // .then(res => {
        //   this.pointData = res.data.rows;
          // console.log(this.pointData)
      //     this.pointData.forEach((item, index) => {
      //       this.$set(this.pointData[index], 'value', [this.pointData[index].x,this.pointData[index].y]);
      //       this.axios('http://58.213.47.166:8990/device/belong?did=' + item.id) //
      //       .then(resp => {
      //         // console.log(resp.data.belong)
      //         this.$set(this.pointData[index], 'username', resp.data.belong.name);
      //         this.$set(this.pointData[index], 'tel', resp.data.belong.tel);
      //       })
      //
      //       for (let i = 0; i < this.streetData.length; i++) { //获取完整设备地址
      //         if (item.sid == this.streetData[i].sid) {
      //           this.$set(this.pointData[index], 'name', '江苏省 南京市 秦淮区 ' + this.streetData[i].n + ' ' + this.pointData[index].address);
      //         }
      //       }
      //   })
      // })
    }
  },
  created() {
    this.getStreet()
    this.getPoint()
  }
}
</script>
