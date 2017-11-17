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
  height:100%;
  #container{
    height:100%;
  }
}
</style>
<template lang="html">
  <div class="map">
    <div id="container" tabindex="0"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  watch:{

  },
  methods: {

  },
  created() {

  },
  computed: {

  },
  mounted() {
    var map=new AMap.Map('container',{
        resizeEnable: true,
        zoom: 13,
        center: [118.823513, 32.020812],
        mapStyle: 'amap://styles/bad9972799249931510ddfff7a4f3bcc'
    });
    AMapUI.loadUI(['misc/PointSimplifier'], function(PointSimplifier) {

        if (!PointSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
        }

        //启动页面
        initPage(PointSimplifier);
    });



    var that=this;
    function initPage(PointSimplifier) {
        //创建组件实例
        var pointSimplifierIns = new PointSimplifier({
            map: map, //关联的map
            compareDataItem: function(a, b, aIndex, bIndex) {
                //数据源中靠后的元素优先，index大的排到前面去
                return aIndex > bIndex ? -1 : 1;
            },
            getPosition: function(dataItem) {
                //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
                // return dataItem.position;
                // console.log(dataItem)
                return [dataItem.x,dataItem.y]
            },
            getHoverTitle: function(dataItem, idx) {
                //返回数据项的Title信息，鼠标hover时显示
                // return '序号: ' + idx;
                return dataItem.nickname
            },
            // renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
            renderOptions: {
                //点的样式
                // pointStyle: {
                //     fillStyle: 'blue' //蓝色填充
                // }
                pointHoverStyle:{
                    content:'none'
                },
                pointHardcoreStyle:{
                  //宽度
                  width: 25,
                  //高度
                  height: 27,
                },
                topNAreaStyle:{
                  //宽度
                  width: 25,
                  //高度
                  height: 27,
                },
                pointStyle: {
                   //绘制点占据的矩形区域
                   content: PointSimplifier.Render.Canvas.getImageContent(
                       './src/img/marker1.png',
                       function onload() {
                           pointSimplifierIns.renderLater();
                       },
                       function onerror(e) {
                           alert('图片加载失败！');
                       }),
                   //宽度
                   width: 25,
                   //高度
                   height: 27,
                   //定位点为底部中心
                   offset: ['-50%', '-100%'],
                   fillStyle: null,
                   strokeStyle: null
               }
            }
        });
        var renderOptions = pointSimplifierIns.getRenderOptions();

            //获得pointStyle
        var pointStyle = renderOptions.pointStyle;
        pointStyle.content=PointSimplifier.Render.Canvas.getImageContent(
            './src/img/marker2.png',
            function onload() {
                pointSimplifierIns.renderLater();
            },
            function onerror(e) {
                alert('图片加载失败！');
            })

        pointSimplifierIns.render();
        console.log(pointStyle)
        that.axios('device/listAllDevice?pageIndex=1&pageSize=500')
        .then(res => {
          let data = res.data.data;
          pointSimplifierIns.setData(data);

          //监听事件   pointMouseover pointMouseout
          pointSimplifierIns.on('pointClick', function(e, record) {
              console.log(record);


              AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {

                  // var marker = new AMap.Marker({
                  //     map: map,
                  //     zIndex: 9999999,
                  //     position: map.getCenter()
                  // });

                  var infoWindow = new SimpleInfoWindow({

                      infoTitle: '<strong>这里是标题</strong>',
                      infoBody: '<p class="my-desc"><strong>这里是内容。</strong> <br/> 高德地图 JavaScript API，是由 JavaScript 语言编写的应用程序接口，' +
                          '它能够帮助您在网站或移动端中构建功能丰富、交互性强的地图应用程序</p>',

                      //基点指向marker的头部位置
                      offset: new AMap.Pixel(0, -31)
                  });

                  // function openInfoWin() {
                  //     infoWindow.open(map, marker.getPosition());
                  // }
                  infoWindow.open(map, [record.data.x,record.data.y]);
                  //marker 点击时打开
                  // AMap.event.addListener(marker, 'click', function() {
                  //     openInfoWin();
                  // });
                  //
                  // openInfoWin();
              });


          });

        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '请求设备时服务出错'
          });
        })
        //随机创建一批点，仅作示意
        // var data = createPoints(map.getCenter(), 100000);
        // console.log(data)
        //设置数据源，data需要是一个数组

    }

    //仅作示意
    function createPoints(center, num) {
        var data = [];
        for (var i = 0, len = num; i < len; i++) {
            data.push({
                position: [
                    center.getLng() + (Math.random() > 0.5 ? 1 : -1) * Math.random(),
                    center.getLat() + (Math.random() > 0.5 ? 1 : -1) * Math.random()
                ]
            });
        }
        return data;
    }

  },
  beforeDestroy(){

  },
  destroyed() { //页面卸载 清除监听

  }
}

</script>
