<style lang="scss">
.deviceList {
    height: 100%;
    width: 100%;
    .ivu-page {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
<template lang="html">
  <div class="deviceList">
    <Table border :columns="column" :data="tableData"></Table>
    <Page :total="total" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'deviceList',
  data() {
    return {
      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      column: [{
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'username',
          align: 'center'
        },
        {
          title: '设备名',
          key: 'nickname',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'telnumber',
          align: 'center'
        },
        {
          title: '地址',
          key: 'address',
          align: 'center',
          render: (h, params) => {
            for (let i = 0; i < this.street.length; i++) {
              if (this.street[i].sid == params.row.sid) {
                return '江苏省 南京市 秦淮区 ' + this.street[i].n + ' ' + params.row.address
              }
            }
          }
        },
        {
          title: '设备号',
          key: 'imsi',
          align: 'center'
        },
      ],
      street: [],
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      tableData: []
    }
  },

  mounted() {
    this.changePageNumber()
  },
  methods: {
    changePageNumber(pageNumber) {
      let dataList
      this.pageNumber = pageNumber ? pageNumber : 1;
      // console.log(pageNumber)
      // this.pageNumber=pageNumber
      this.axios({
        method: 'get',
        url: 'http://58.213.47.166:8990/area/devices',
        params: {
          aid: 2086,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(res => {
        // console.log(res)
        dataList = res.data.rows
        // this.tableData=res.data.rows
        this.total = res.data.total
        // console.log(this.tableData)

        for (let i = 0; i < dataList.length; i++) {
          this.axios('http://58.213.47.166:8990/device/belong', {
            params: {
              did: dataList[i].id
            }
          }).then(resp => {

            this.$set(dataList[i], 'username', resp.data.belong.name);
            this.$set(dataList[i], 'telnumber', resp.data.belong.tel);
          })
        }
        this.tableData = dataList
      }).catch(e => {

      })
    },
    changePageSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.changePageNumber()
    },
    setStreet() {
      this.axios.get('http://58.213.47.166:8990/area/street?aid=2086')
        .then(res => {
          this.street = res.data
        })
    }
  },
  computed: {


  },
  created() {

    this.setStreet()
  }
}
</script>
