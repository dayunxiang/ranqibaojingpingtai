<style lang="scss">
.alarmLog {
    // height: 100%!important;
    width: 100%;
    position: absolute;
    top:60px;
    bottom:0;
    .ivu-page {
        margin: 20px 0;
        text-align: center;
    }
    .deviceCon{
      position: absolute;
      top:0;bottom:0;left:0;right:0;
      margin:auto;
    }
}
</style>
<template lang="html">
  <Row class="alarmLog">
    <Col class="deviceCon" span="18">
      <!-- <Table border :columns="column" :data="tableData"></Table>
      <Page :total="total" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page> -->

    </Col>
  </Row>
</template>

<script>
import Qs from 'qs'

export default {
  props:[],
  name: 'alarmLog',
  data() {
    return {
      njAreaData:[],

    }
  },
  mounted() {

  },
  methods: {
    getTableData(){
      let alarmArr=[]
      this.njAreaData.map((items)=>{
        this.axios({
          method: 'get',
          url: 'area/alarms',
          params: {
            aid: items.id,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        }).then(res => {
          alarmArr=alarmArr.concat(res.data)
        })
      })
      console.log(alarmArr)
    }
  },
  computed: {

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
      this.getTableData()
    })
  }
}
</script>
