<style lang="scss">
  .deviceListMain{
    height:100%;
    width:100%;
    .subNav_wrapper{
      height:60px;
      .ivu-col{
        height:60px;
      }
    }
    .ivu-row{
      .ivu-col{
        position: absolute;
        top:0;
        left:0;right:0;
        margin:auto;
      }
    }
    .deviceCon_wrapper{
      height:100%;
      .deviceCon{
        height:100%;
      }
    }
    .subNav{
      background: #fff;
      .ivu-menu-item{
        padding:0;
        margin-right:10px;
        &.ivu-menu-item-active.ivu-menu-item-selected{
          background: #fff;
        }
        height:100%;
        &:hover{
          background: #fff!important;
        }
        a{
          display:inline-block;
          height:38px;
          border-radius:38px;
          line-height:38px;
          position:relative;
          top:0;
          bottom:0;
          left:0;right:0;
          margin:auto;
          padding:0 20px;
          color:#333;
          text-align:center;
          &:hover{
            background:#2d8cf0;
            color:#fff;
          }
          &.router-link-exact-active {
            background:#2d8cf0;
            color:#fff;
          }
        }

      }
    }
  }
</style>
<template lang="html">
  <div class="deviceListMain">
    <Row class="subNav_wrapper">
        <Col span="18">
          <Menu class="subNav" mode="horizontal" theme="primary" active-name="1">
              <Menu-item name="1">
                  <router-link to="/deviceListMain/deviceList">设备列表</router-link>
              </Menu-item>
              <Menu-item name="2">
                  <!-- <Icon type="ios-keypad"></Icon> -->
                  <router-link to="/deviceListMain/alarmLog">报警日志</router-link>
              </Menu-item>
          </Menu>
        </Col>
    </Row>
    <Row class="deviceCon_wrapper">
      <Col span="18" class="deviceCon">
        <router-view></router-view>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name:'deviceListMain',
  data(){
    return{

    }
  },

  mounted(){

  },
  methods:{

  },
  created(){

  }
}
</script>
