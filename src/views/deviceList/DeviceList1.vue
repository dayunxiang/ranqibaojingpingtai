<style lang="scss">
.deviceList {
    // height: 100%!important;
    width: 100%;
    position: absolute;
    top:60px;
    bottom:0;
    .ivu-page {
        margin: 20px 0;
        text-align: center;
    }
}
</style>
<template lang="html">
  <Row class="deviceList">
    <Col class="deviceCon" span="18">
      <!-- <Table border :columns="column" :data="tableData"></Table>
      <Page :total="total" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page> -->

    </Col>
  </Row>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'deviceList',
  data() {
    return {
      njAreaData:[],
      deviceData:[]
    }
  },
  watch:{

  },
  mounted() {

  },
  methods: {
    getTableData(){
      new Promise((resolve)=>{
        let deviceData=[]
        this.njAreaData.map((items)=>{
          this.axios.get('area/devices?aid='+items.id+'&pageNumber=1&pageSize=3000')
          .then(res => {
            deviceData=deviceData.concat(res.data.rows);
            resolve(deviceData)
          })
        })

      }).then((deviceData)=>{
        console.log(deviceData)
      })

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
      this.getTableData();
    })
  }
}
</script>
