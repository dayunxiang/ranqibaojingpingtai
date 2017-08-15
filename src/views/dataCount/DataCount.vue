<style lang="scss">
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

            .img {
                width: 100%;
                height: 100%;
                position: relative;
                img {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    vertical-align: middle;
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
            margin-top: -10px;
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
</style>
<template lang="html">
  <div class="dataContent">
    <Row class="mesHead">
        <Col span="6" class="weather">
          <div class="img">
            <img src="../../img/n_33.png" alt="">
          </div>

        </Col>
        <Col span="5" class="count">
          <div>
            <p>常住户数：<span>25681</span></p>
            <p>商户饭店：<span>15389</span></p>
          </div>
        </Col>
        <Col span="13" class="chart">
          <line-chart></line-chart>
        </Col>
    </Row>
    <Row class="contentRow">
        <Col :sm="12" :md="8" :lg="6" class="item_wrapper" v-for="x in 12">
          <div>
            <h3>秦虹街道</h3>
            <div class="streetCount">
              <p>常住户数:<span>15873</span></p>
              <p>商户饭店:<span>1873</span></p>
            </div>
            <p class="progress">燃气报警次数</p>
            <Progress :percent="45" :stroke-width="16" status="active"><span>45</span></Progress>
          </div>
        </Col>

    </Row>
  </div>
</template>

<script>
import lineChart from './lineChart.vue'
export default {
  name: 'dataContent',
  data() {
    return {

    }
  },
  components: {
    'line-chart': lineChart
  },
  mounted() {
    // for(var i=0)
  },
  methods: {

  },
  created() {

  }
}
</script>
