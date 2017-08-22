<style lang="scss">
@font-face {
    font-family: "Ionicons";
    src: url('../../iconfont/weatherIconfont.eot?t=1503039881335');
    /* IE9*/
    src:url('../../iconfont/weatherIconfont.eot?t=1503039881335#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('../../iconfont/weatherIconfont.woff?t=1503039881335') format('woff'),
    /* chrome, firefox */
    url('../../iconfont/weatherIconfont.ttf?t=1503039881335') format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url( '../../iconfont/weatherIconfont.svg?t=1503039881335#iconfont') format('svg');
    /* iOS 4.1- */
}
.icon-sun:before {
    content: "\e603";
}
.icon-icon-test:before {
    content: "\e604";
}
.icon-icon-test1:before {
    content: "\e605";
}
.icon-icon-test2:before {
    content: "\e606";
}
.icon-icon-test3:before {
    content: "\e607";
}
.icon-icon-test4:before {
    content: "\e608";
}
.icon-icon-test5:before {
    content: "\e609";
}
.icon-icon-test6:before {
    content: "\e60a";
}
.icon-icon-test7:before {
    content: "\e60b";
}
.icon-icon-test8:before {
    content: "\e60c";
}
.icon-icon-test9:before {
    content: "\e60d";
}
.icon-icon-test10:before {
    content: "\e60e";
}
.icon-icon-test11:before {
    content: "\e60f";
}
.icon-icon-test12:before {
    content: "\e610";
}
.icon-icon-test13:before {
    content: "\e611";
}
.icon-icon-test14:before {
    content: "\e612";
}
.icon-icon-test15:before {
    content: "\e613";
}
.icon-icon-test16:before {
    content: "\e614";
}
.icon-icon-test17:before {
    content: "\e615";
}
.icon-icon-test18:before {
    content: "\e616";
}
.icon-icon-test19:before {
    content: "\e617";
}
.icon-icon-test20:before {
    content: "\e618";
}
.icon-icon-test21:before {
    content: "\e619";
}
.icon-icon-test22:before {
    content: "\e61a";
}
.dataContent {
    width: 100%;
    height: 100%;
    background: #1a2742;
    padding: 0 50px 40px;

    overflow-y: scroll;
    .mesHead {
        margin: 40px 0 42px;
        .weather {
            height: 126px;
            .ivu-row{
              height:100%;
              .ivu-col{
                height:100%;
              }
            }
            .weatherBg{
              // background:#0ff;
              position: absolute;
              z-index: -1;
              top:0;bottom:0;
              left:0;right:0;
              border-radius: 4px;
            }
            // .img {
            //     width: 100%;
            //     height: 100%;
            //     position: relative;
            //     img {
            //         width: 100%;
            //         position: absolute;
            //         top: 0;
            //         bottom: 0;
            //         margin: auto;
            //         vertical-align: middle;
            //     }
            // }
            .weatherIcon{
              padding-top:20px;
              .ivu-icon{
                display: block;
                width:64px;
                height:64px;
                font-size: 64px;
                color:#fff;
                margin:0 auto;
              }
              // .iconSVG{
              //   width:64px;
              //   height:64px;
              //   margin:0 auto;
              // }
            }
            .temperature {
                text-align: center;
                line-height: 118px;
                color: #fff;
                font-size: 18px;
                span {
                    font-size: 40px;
                }
            }
            .area {
                position: absolute;
                top: 10px;
                right: 10px;
                .ivu-select-visible .ivu-select-selection {
                    box-shadow: 0 0 0 0 rgba(0,0,0,0);
                }
                .ivu-select {
                    width: 86px;
                    .ivu-select-selection {
                        border-radius: 0;
                        border: 0;
                        box-shadow: 0 0 0 0 rgba(0,0,0,0);
                        background-color: transparent;
                        .ivu-select-placeholder,.ivu-select-selected-value {
                            color: #fff;
                            padding-left: 12px;
                            font-size: 16px;
                        }
                        .ivu-icon {
                            color: #fff;
                        }
                    }
                    .ivu-select-dropdown{
                      top: 20px!important;
                    }
                }
            }
        }
        .count {
            // padding:0 38px;
            margin: auto;
            p {
                font-size: 22px;
                line-height: 58px;
                text-align: center;
                color: #b8c6e8;
                span {
                    color: #3e9bfe;
                    font-size: 34px;
                    font-weight: bold;
                }
            }

        }
        .chart {
            // margin-top: -10px;
            height: 126px!important;
        }
    }
    .contentRow {
        margin: 0 -4px;
        .item_wrapper {
            & > div {
                color: #b8c6e8;
                background: #2a3b60;
                font-size: 18px;
                padding-left: 24px;
                padding-bottom: 28px;
                margin: 4px;
                cursor: pointer;
                h3 {

                    line-height: 52px;
                    font-weight: normal;
                }
                .streetCount {
                    line-height: 64px;
                    p {
                        float: left;
                        width: 50%;
                        span {
                            color: #fff;
                            font-size: 16px;
                        }
                    }
                }
                .progress {
                    line-height: 34px;
                }
                .ivu-progress-show-info .ivu-progress-outer {
                    padding-right: 42px;
                }
                .ivu-progress-inner {
                    border-radius: 0;
                }
                .ivu-progress-bg {
                    border-radius: 0;
                }
                .ivu-progress-text {
                    margin-left: 15px;
                }
            }
        }

    }

}
.ivu-modal-mask{
    background-color: rgba(55,55,55,0)!important;
}
</style>
<template lang="html">
  <div class="dataContent">
    <Row class="mesHead">
        <Col span="6" class="weather">
          <div :class="'weatherBg '+weatherStatus.bg"></div>
          <Row>
            <Col span="8">
              <div class="temperature">
                <span>{{temperature}}</span><!-- &#8451; -->
              </div>
            </Col>
            <Col span="8">
              <div class="weatherIcon">
                <i :class="'ivu-icon '+weatherStatus.icon"></i>
                <!-- <svg class="iconSVG" aria-hidden="true">
                  <use :xlink:href="weatherStatus"></use>
                </svg> -->

              </div>
            </Col>
            <Col span="8">
              <div class="area">
                <Select v-model="areaVal" @on-change="areaChange" placeholder="秦淮区">
                  <Option v-for="option in njAreaData" :value="option.id" :key="option.id">{{option.a}}</Option>
                </Select>
              </div>
            </Col>
          </Row>

        </Col>
        <Col span="5" class="count">
          <div>
            <p>常住户数：<span>{{areaHouseVal}}</span></p>
            <p>商户饭店：<span>{{areaHotelVal}}</span></p>
          </div>
        </Col>
        <Col span="13" class="chart">
          <line-chart :aid="aid"></line-chart>
        </Col>
    </Row>
    <Row class="contentRow">
        <Col :sm="12" :md="8" :lg="6" class="item_wrapper" v-for="item in streetData" :key="item.sid">
          <div @click="streetMes(item.sid)">
            <h3>{{item.n}}</h3>
            <div class="streetCount">
              <p>常住户数:<span>{{item.streetHouseVal}}</span></p>
              <p>商户饭店:<span>{{item.streetHotelVal}}</span></p>
            </div>
            <p class="progress">燃气报警次数</p>
            <Progress :percent="item.alarmNum" :stroke-width="16"><span>{{item.alarmNum}}</span></Progress>
          </div>
        </Col>

    </Row>
  </div>
</template>

<script>
// import '../../iconfont/iconfont'
import lineChart from './lineChart.vue'
import Qs from 'qs'
export default {
  name: 'dataContent',
  data() {
    return {
      njAreaData: [],
      areaVal: '',
      aid:'',
      streetData: [],
      areaHouseVal: '',
      areaHotelVal: '',
      temperature:'',
      weather:'',
      weatherClass:'',

    }
  },
  components: {
    'line-chart': lineChart
  },
  computed:{
    weatherStatus(){
      let obj={}
      if (this.weather=="晴") {
        obj={
          bg:'sun',
          icon:'icon-sun'
        }
      } else if (this.weather=="多云") {
        obj={
          bg:'test1',
          icon:'icon-icon-test1'
        }
      } else if (this.weather=="阴") {
        obj={
          bg:'test1',
          icon:'icon-icon-test'
        }
      } else if (this.weather=="雷阵雨"||this.weather=="阵雨") {
        obj={
          bg:'test1',
          icon:'.icon-icon-test5'
        }
      } else if (this.weather=="冻雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test1'
        }
      } else if (this.weather=="雨夹雪") {
        obj={
          bg:'test1',
          icon:'icon-icon-test11'
        }
      } else if (this.weather=="小雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test3'
        }
      } else if (this.weather=="中雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test2'
        }
      } else if (this.weather=="大雨"||this.weather=="中到大雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test4'
        }
      } else if (this.weather=="暴雨"||this.weather=="大到暴雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test8'
        }
      } else if (this.weather=="大暴雨"||this.weather=="特大暴雨") {
        obj={
          bg:'test1',
          icon:'icon-icon-test7'
        }
      } else if (this.weather=="阵雪"||this.weather=="小雪") {
        obj={
          bg:'test1',
          icon:'icon-icon-test7'
        }
      } else if (this.weather=="中雪") {
        obj={
          bg:'test1',
          icon:'icon-icon-test10'
        }
      } else if (this.weather=="大雪") {
        obj={
          bg:'test1',
          icon:'icon-icon-test12'
        }
      } else if (this.weather=="暴雪") {
        obj={
          bg:'test1',
          icon:'icon-icon-test15'
        }
      } else if (this.weather=="冰雹") {
        obj={
          bg:'test1',
          icon:'icon-icon-test6'
        }
      }else if (this.weather=="雾") {
        obj={
          bg:'test1',
          icon:'icon-icon-test16'
        }
      }  else if (this.weather=="沙尘暴"||this.weather=="扬沙"||this.weather=="强沙尘暴") {
        obj={
          bg:'test1',
          icon:'icon-icon-test14'
        }
      }  else if (this.weather=="浮尘") {
        obj={
          bg:'test1',
          icon:'icon-icon-test13'
        }
      } else{
        obj={
          bg:'test1',
          icon:'.icon-icon-test22'
        }
      }
      return obj
    }
  },
  watch: {
    njAreaData(newAreaData) {
      this.$once(this.createAreaSelect())
    }
  },
  mounted() {

  },
  methods: {
    createAreaSelect() {
      this.areaChange('2086')
    },
    areaChange(aid) {
      this.aid=aid
      this.areaHouse(aid) //区总户数
      this.areaHotel(aid) //区总饭店数
      this.getStreet(aid)
      this.getWeather()
    },
    getWeather() {
      this.axios('http://wthrcdn.etouch.cn/weather_mini?city=南京市')
      .then(res => {
        // console.log(res)
        let data=res.data.data.forecast[0]
        // console.log(data)
        this.temperature=data.low.substr(data.low.indexOf(' '))
        this.weather=data.type
      })
    },
    areaHouse(aid) { //区总户数
      this.axios.get('area/queryResidentNumByArea?areaId=' + aid)
        .then(res => {
          if (res.data.resultFlag) {
            this.areaHouseVal = res.data.data;
          }
        })
    },
    areaHotel(aid) { //区总饭店数
      this.axios.get('area/queryRestaurantNumByArea?areaId=' + aid)
        .then(res => {
          if (res.data.resultFlag) {
            this.areaHotelVal = res.data.data;
          }
        })
    },
    getStreet(aid) { //获取街道数据
      this.axios.get('area/street?aid=' + aid)
        .then(res => {
          let data = res.data;
          data.map((item) => {

            this.axios.get('street/queryResidentNumByStreet?streetId=' + item.sid)
              .then(res => {
                if (res.data.resultFlag) {
                  this.$set(item, 'streetHouseVal', res.data.data);
                }
              })
            this.axios.get('street/queryRestaurantNumByStreet?streetId=' + item.sid)
              .then(res => {
                if (res.data.resultFlag) {
                  this.$set(item, 'streetHotelVal', res.data.data);
                }
              })
            this.axios.get('street/queryAlarmNumByStreet?streetId=' + item.sid)
              .then(res => {
                if (res.data.resultFlag) {
                  this.$set(item, 'alarmNum', res.data.data);
                }
              })

          })
          this.streetData = data
        })

    },
    streetMes(sid) {
      // console.log(this.aid)
      // console.log(sid)
      this.$router.push({ name: 'streetAlarmLog', params: { aid: this.aid, sid:sid }})
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
    })

  }
}
</script>
