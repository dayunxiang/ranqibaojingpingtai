<style lang="scss">
.deviceList {
    // height: 100%!important;
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    .ivu-page {
        margin: 20px 0;
        text-align: center;
    }
}
.ivu-notice {
    top: 90px!important;
    bottom: 0;
    overflow: hidden;
}
</style>
<template lang="html">
  <Row class="deviceList">
    <Col class="deviceCon" span="18">
      <Table border :columns="column" :data="tableData"></Table>
      <Page :total="total" placement="top" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>

    </Col>
  </Row>
  <!-- <div class="deviceList">
    <Table border :columns="column" :data="tableData"></Table>
    <Page :total="total" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
  </div> -->
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
          align: 'center'
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
      tableData: [],
      njAreaData: []
    }
  },
  watch: {

  },
  mounted() {
    // this.changePageNumber()
  },
  methods: {
    changePageNumber(pageNumber) {
      let dataList
      this.pageNumber = pageNumber ? pageNumber : 1;
      this.axios({
        method: 'get',
        url: 'device/listAllDevice',
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageNumber
        }
      }).then(res => {
        dataList = res.data.data
        this.total = res.data.total
        for (let i = 0; i < dataList.length; i++) {
          this.axios('device/belong', {
            params: {
              did: dataList[i].id
            }
          }).then(resp => {

            this.$set(dataList[i], 'username', resp.data.belong.name);
            this.$set(dataList[i], 'telnumber', resp.data.belong.tel);
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '获取用户信息时出错',
            });
          })
          this.njAreaData.map((items) => {
            let address = ''
            if (items.id == dataList[i].aid) {
              address += items.p + ' ' + items.c + ' ' + items.a + ' ';
              this.axios.get('area/street?aid=' + items.id)
                .then(res => {
                  for (let j = 0; j < res.data.length; j++) {
                    if (res.data[j].sid == dataList[i].sid) {
                      address += res.data[j].n
                    }
                  }
                  this.$set(dataList[i], 'address', address + ' ' + dataList[i].address);
                }).catch((e) => {
                  this.$Notice.error({
                    title: '错误',
                    desc: '获取街道数据时出错',
                  });
                })
            }
          })
        }
        setTimeout(() => {
          this.tableData = dataList
        }, 100)

      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取设备数据时出错',
        });
      })

    },
    changePageSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize
      this.changePageNumber()
    },

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
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '获取区域数据时出错',
          });
        })
    }).then((data) => {
      this.njAreaData = data;
      this.changePageNumber()
    })
  }
}
</script>
