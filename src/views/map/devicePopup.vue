
<!-- 我想换个方法做 他的子组件 没成功 -->

<style lang="scss">

</style>
<template lang="html">
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
      <Table width="600" height="200" :columns="alarmTableColumn" :data="alarmTable" :show-header="false"></Table>
    </div>
  </div>
</template>

<script>
export default {
  props:['devicePopupData','alarmTable'],
  data(){
    return{

      alarmTableColumn:[
        {
            title: '报警时间',
            key: 'date',
            width:180,
            align: 'center'
        },
        {
            title: '报警手机号',
            key: 'alarmTel',
            align: 'center',
            render: (h, params) => {
              let alarmTel=params.row.alarmTel.split(',');
              let tagArr=[]
              for(let i=0;i<alarmTel.length;i++){
                tagArr.push(h('span',{
                  style: {
                      margin:'3px'
                  },
                },alarmTel[i]))
                if((i+1)%3==0){
                  tagArr.push(h('br'))
                }
              }
              return tagArr
            }
        }
      ],
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>
