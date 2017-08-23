<style lang="scss">
.alarmLog {
    // height: 100%!important;
    width: 100%;
    position: absolute;
    top: 60px;
    bottom: 0;
    .ivu-page {
        margin: 20px 0;
        text-align: center;
    }
    .deviceCon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}
.ivu-notice {
    top: 90px!important;
    bottom: 0;
    overflow: hidden;
}
</style>
<template lang="html">
  <Row class="alarmLog">
    <Col class="deviceCon" span="18">
      <Table border :columns="column" :data="tableData"></Table>
      <Page :total="total" placement="top" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>

    </Col>
  </Row>
</template>

<script>
import Qs from 'qs'

export default {
  props: [],
  name: 'alarmLog',
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
          title: '值',
          key: 'ch4',
          align: 'center'
        },
        {
          title: '时间',
          key: 'date',
          align: 'center',
          render: (h, params) => {
            return params.row.date.substr(0, params.row.date.indexOf('.'))
          }
        },
        {
          title: '手机号',
          key: 'alarmTel',
          width: 210,
          align: 'center',
          render: (h, params) => {
            let alarmTel = params.row.alarmTel.split(',');
            let tagArr = []
            for (let i = 0; i < alarmTel.length; i++) {
              tagArr.push(h('span', {
                style: {
                  margin: '3px'
                },
              }, alarmTel[i]))
              if ((i + 1) % 2 == 0) {
                tagArr.push(h('br'))
              }
            }
            return tagArr
          }
        },
        {
          title: '地址',
          key: 'address',
          align: 'center'
        }
      ],
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      tableData: [],
      deviceList: [],
      njAreaData: []
    }
  },

  mounted() {

  },
  methods: {
    changePageNumber(pageNumber) {
      let dataList
      this.pageNumber = pageNumber ? pageNumber : 1;
      // this.pageNumber=pageNumber

      this.axios({
        method: 'get',
        url: 'alarm/listAllAlarmRecords',
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageNumber
        }
      }).then(res => {
        dataList = res.data.data;
        this.total = res.data.total;
        for (let i = 0; i < dataList.length; i++) {
          this.axios('device/belong', {
            params: {
              did: dataList[i].dId
            }
          }).then(resp => {
            this.$set(dataList[i], 'username', resp.data.belong.name);
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '获取用户信息时出错',
            });
          })
          for (let j = 0; j < this.deviceList.length; j++) {
            // console.log(this.deviceList[j])
            if (dataList[i].dId == this.deviceList[j].id) {
              new Promise((resolve)=>{
                this.$set(dataList[i], 'nickname', this.deviceList[j].nickname);
                this.$set(dataList[i], 'sid', this.deviceList[j].sid);
                this.$set(dataList[i], 'imsi', this.deviceList[j].imsi);
                resolve()
              }).then(()=>{
                this.njAreaData.map((item) => {
                  let address = ''
                  if (item.id == this.deviceList[j].aid) {
                    address += item.p + ' ' + item.c + ' ' + item.a + ' '
                    this.axios.get('area/street?aid=' + item.id)
                      .then(res => {
                        this.street = res.data;
                        for (let i = 0; i < res.data.length; i++) {
                          if (res.data[i].sid == this.deviceList[j].sid) {
                            address += res.data[i].n
                          }
                        }
                        this.$set(dataList[i], 'address', address + ' ' + this.deviceList[j].address);
                      }).catch((e) => {
                        this.$Notice.error({
                          title: '错误',
                          desc: '获取街道数据时出错',
                        });
                      })
                  }
                })
                setTimeout(() => {
                  this.tableData = dataList
                }, 500)
              })

            }
          }

        }

      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取报警数据时出错',
        });
      })

    },
    changePageSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize;
      this.changePageNumber()
    },
    getAreaDevice() {
      this.njAreaData.map((items) => {
        this.axios.get('device/listAllDevice?pageIndex=1&pageSize=100000')
          .then(res => {
            // console.log(res.data.data)
            this.deviceList = res.data.data
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '获取设备数据时出错',
            });
          })
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
      this.getAreaDevice() //获取区域内所有的设备
      this.changePageNumber()

    })


  }
}
</script>
