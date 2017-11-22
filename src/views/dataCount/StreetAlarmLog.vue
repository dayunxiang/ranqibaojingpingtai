<style lang="scss">
#wrapper {
    position: relative;
    height: 100%;
    overflow: hidden;
}
.streetAlarmLog_wrap {
    width: 75%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    .pathNav,
    .search {
        height: 60px!important;
    }
    .pathNav {
        line-height: 60px;
    }
    .search {
        & > div {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .ivu-form.ivu-form-label-right.ivu-form-inline {
            margin-left: 0;
            margin-top: 0;
        }
        .ivu-col-span-18 {
            display: block;
            width: auto;
        }
    }
    .streetAlarmLog {
        width: 100%;
        .ivu-page {
            margin: 20px 0;
            text-align: center;
        }
        .deviceCon {
            width: 100%;
            margin: auto;
        }
    }
}
</style>
<template lang="html">
  <div id="wrapper">
    <div class="streetAlarmLog_wrap">
      <Row class="pathNav">
        <Col class="breadcrumb" span="18">
          <Breadcrumb>
            <Breadcrumb-item href="/dataCount">数据统计</Breadcrumb-item>
            <Breadcrumb-item>{{streetVal}}</Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row class="search">
        <Col span="18">
            <Form inline :model="streetAlarmSearch">
              <FormItem label="">
                  <Input v-model="streetAlarmSearch.deviceName" placeholder="设备名称"></Input>
              </FormItem>
              <!-- <FormItem label="">
                  <Input v-model="streetAlarmSearch.deviceNum" size="large" placeholder="设备号"></Input>
              </FormItem> -->
              <FormItem label="">
                  <Input v-model="streetAlarmSearch.alarmMes" placeholder="设备预警信息"></Input>
              </FormItem>
              <FormItem>
                  <Button type="primary" icon="android-search" @click="query()">查询</Button>
                  <Button type="error" icon="android-refresh" @click="reset()">重置</Button>
              </FormItem>
            </Form>
        </Col>
      </Row>
      <Row class="streetAlarmLog">
        <Col class="deviceCon" span="18">
          <Table border :columns="column" :data="tableData"></Table>
          <Page :total="total" placement="top" :page-size="pageSize" :current="pageNumber" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
        </Col>
      </Row>
    </div>

  </div>

</template>

<script>
import Qs from 'qs'

export default {
  name: 'alarmLog',
  data() {
    return {
      streetAlarmSearch: {
        deviceName: '',
        // deviceNum:'',
        alarmMes: ''
      },
      streetAlarmScroll: null,

      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      column: [{
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        // {
        //   title: '姓名',
        //   key: 'username',
        //   align: 'center'
        // },
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
          // render: (h, params) => {
          //   if(params.row.date){
          //     return params.row.date.substr(0, params.row.date.indexOf('.'))
          //   }
          // }
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
        },
        {
          title: '报警信息',
          key: 'msg',
          align: 'center'
        }
      ],
      njAreaData: [],
      addressVal: '',
      streetVal: '',
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      tableData: [],
      deviceList: []
    }
  },
  watch: {
    njAreaData(newAreaData) {
      this.getAddressVal()
    },
    deviceList(newDeviceList) {
      this.changePageNumber(1)
    },
    tableData() {
      setTimeout(() => {
        this.streetAlarmScroll.refresh();
      }, 100)
    }
  },
  mounted() {
    this.streetAlarmScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      scrollbars: true, //滚动条支持
      bounce: true, //边界时的反弹动画，默认true
      // preventDefault: false,
      // interactiveScrollbars:true,
      fadeScrollbars: true,
      shrinkScrollbars: 'scale'
    });
  },
  methods: {
    query() {
      this.changePageNumber(false)
    },
    reset() {
      this.streetAlarmSearch.deviceName = ''
      this.streetAlarmSearch.alarmMes = ''
      this.changePageNumber()
      // console.log('重置')
    },
    getAddressVal() {
      this.njAreaData.map((item) => {
        if (item.id == this.$route.params.aid) {
          let address = ''
          for (let i = 0; i < item.street.length; i++) {
            if (item.street[i].id == this.$route.params.sid) {
              this.streetVal = item.street[i].street
            }
          }

        }
      })
    },
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber ? pageNumber : 1;
      let tableData = [];
      this.axios({
        method: 'get',
        url: 'device/alarms',
        params: {
          nickname: this.streetAlarmSearch.deviceName,
          alarmmsg: this.streetAlarmSearch.alarmMes,
          sid: this.$route.params.sid,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(res => {
        // console.log(res.data.resultFlag)
        // console.log(res.resultFlag!='undefined')
        // console.log(res.data.resultFlag==false)
        if (res.data.resultFlag === false) {
          return
        }
        // console.log(res.data.rows)
        tableData = res.data.rows;
        // console.log('街道报警日志',tableData)
        this.total = res.data.total;
        this.tableData = [];
        for (let i = 0; i < tableData.length; i++) {
          new Promise(resolve => {
            for (let j = 0; j < this.deviceList.length; j++) {
              if (this.deviceList[j].id == tableData[i].dId) {
                tableData[i].nickname = this.deviceList[j].nickname;
                tableData[i].aid = this.deviceList[j].aid;
                tableData[i].sid = this.deviceList[j].sid;
                tableData[i].imsi = this.deviceList[j].imsi;
                tableData[i].address = this.deviceList[j].address;
                resolve(tableData[i]);
              }
            }
          }).then((data) => {
            this.streetAlarmScroll.refresh();
            this.njAreaData.map((items) => {
              let address = ''
              if (data.aid == items.id) {
                address += '江苏省 南京市 ' + items.county;
                for (let j = 0; j < items.street.length; j++) {
                  if (data.sid == items.street[j].id) {
                    address += ' ' + items.street[j].street;
                    data.address = address + ' ' + data.address
                    this.tableData.push(data)
                  }
                }
              }

            })

          })

        }

      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取街道报警数据时出错',
        });
      })
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.changePageNumber()
    },
    getAreaDevice() {
      this.axios.get('device/devices?aid=' + this.$route.params.aid + '&pageNumber=1&pageSize=10000')
        .then(res => {
          this.deviceList = res.data.rows;
          // console.log('区域内所有设备',this.deviceList)
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '获取设备数据时出错',
          });
        })

    }
  },
  computed: {

  },
  created() {
    new Promise((resolve) => {
      this.axios.get('region/countyAndStreet', {
          params: {
            id: 830
          }
        })
        .then(res => {
          let data = res.data
          if (data.resultFlag) {
            resolve(data.data)
          } else {
            this.$Notice.error({
              title: '错误',
              desc: '获取区域数据时出错',
            });
          }
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '获取区域数据时服务出错',
          });
        })
    }).then((data) => {
      this.njAreaData = data;
      this.getAreaDevice()
    })
  }
}
</script>
