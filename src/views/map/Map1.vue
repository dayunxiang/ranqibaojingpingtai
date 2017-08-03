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

}
</style>
<template lang="html">
  <div class="map">
    <div id="map" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import '../../data/china.js'
export default {
  name: 'map',
  data() {
    return {

      option:{
          tooltip: {
              trigger: 'item',
              formatter: '{b}'
          },
          series: [
              {
                  name: '中国',
                  type: 'map',
                  map:'china',
                  mapType: 'china',
                  selectedMode : 'multiple',
                  label: {
                      normal: {
                          show: true
                      },
                      emphasis: {
                          show: true
                      }
                  }
              }
          ]
      }

    }
  },

  mounted() {
    var myChart = echarts.init(document.getElementById('map'));
    myChart.setOption(this.option);
  },
  methods: {

  },
  created() {

  }
}
</script>
