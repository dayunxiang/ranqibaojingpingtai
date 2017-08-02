<style lang="scss">
  .dataContent{
    width:100%;
    height:100%;
    background:#1a2742;
    padding: 0 50px;
    .mesHead{

    }
    .contentRow{
      &>div{
        height:214px;
        font-size: 20px;
        color:#b8c6e8;
        background: #2a3b60;
        h3{

          line-height: 52px;
          font-weight: normal;
        }
        .streetCount{
          line-height: 64px;
          display: flex;
          flex-direction: row;
          p{
            flex:1;
          }
        }
        .progress{
          line-height: 34px;
        }
      }
    }
  }
</style>
<template lang="html">
  <div class="dataContent">
    <Row class="mesHead">
        <Col class="weather">

        </Col>
        <Col class="count">
          <div>
            <p>常住户数<span>25681</span></p>
            <p>商户饭店<span>15389</span></p>
          </div>
        </Col>
        <Col class="chart">
          <line-chart></line-chart>
        </Col>
    </Row>
    <Row class="contentRow">
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="streetCount">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <p class="progress">燃气报警次数</p>
          <Progress :percent="45" status="active"></Progress>
        </Col>
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <Progress :percent="45" status="active"></Progress>
        </Col>
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <Progress :percent="45" status="active"></Progress>
        </Col>
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <Progress :percent="45" status="active"></Progress>
        </Col>
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <Progress :percent="45" status="active"></Progress>
        </Col>
        <Col span="6">
          <h3>秦虹街道</h3>
          <div class="">
            <p>常住户数:<span>15873</span></p>
            <p>商户饭店:<span>1873</span></p>
          </div>
          <Progress :percent="45" status="active"></Progress>
        </Col>
    </Row>
  </div>
</template>

<script>
import lineChart from './lineChart.vue'
export default {
  name:'dataContent',
  data(){
    return{

    }
  },
  components:{
    'line-chart':lineChart
  },
  mounted(){

  },
  methods:{

  },
  created(){

  }
}
</script>
