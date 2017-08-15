<style lang="scss">
.alarmLog {
    height: 100%;
    width: 100%;
    .ivu-page {
        margin-top: 20px;
        text-align: center;
    }

}
</style>
<template lang="html">
  <div class="alarmLog">
    <Table border :columns="column" :data="tableData"></Table>
    <Page :total="total" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
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
          align: 'center',
          render: (h, params) => {
            for (let i = 0; i < this.street.length; i++) {
              if (this.street[i].sid == params.row.sid) {
                return '江苏省 南京市 秦淮区 ' + this.street[i].n + ' ' + params.row.address
              }
            }
          }
        }
      ],
      street: [],
      pageSize: 10,
      pageNumber: 1,
      total: 0,
      tableData: [],
      deviceList: []
    }
  },

  mounted() {
    this.changePageNumber()
  },
  methods: {
    changePageNumber(pageNumber) {
      let dataList
      this.pageNumber = pageNumber ? pageNumber : 1;
      // this.pageNumber=pageNumber
      this.axios({
        method: 'get',
        url: 'http://61.147.166.206:8959/ga/area/alarms',
        params: {
          aid: 2086,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(res => {
        dataList = res.data.rows
        this.total = res.data.total
        for (let i = 0; i < dataList.length; i++) {
          // console.log(this.tableData[i])
          for (let j = 0; j < this.deviceList.length; j++) {
            // console.log(this.deviceList[j])
            if (dataList[i].dId == this.deviceList[j].id) {
              this.$set(dataList[i], 'nickname', this.deviceList[j].nickname);
              this.$set(dataList[i], 'address', this.deviceList[j].address);
              this.$set(dataList[i], 'sid', this.deviceList[j].sid);
              this.$set(dataList[i], 'imsi', this.deviceList[j].imsi);
            }
          }
          this.axios('http://61.147.166.206:8959/ga/device/belong', {
            params: {
              did: dataList[i].dId
            }
          }).then(resp => {
            this.$set(dataList[i], 'username', resp.data.belong.name);
          })
        }
        setTimeout(()=>{
          this.tableData = dataList
        },100)
      }).catch(e => {

      })
    },
    changePageSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize;
      this.changePageNumber()
    },
    setStreet() {
      this.axios.get('http://61.147.166.206:8959/ga/area/street?aid=2086')
        .then(res => {
          this.street = res.data;
        })
    },
    getAreaDevice() {
      this.axios.get('http://61.147.166.206:8959/ga/area/devices?aid=2086&pageNumber=1&pageSize=3000')
        .then(res => {
          this.deviceList = res.data.rows;
        })

    }
  },
  computed: {


  },
  created() {

    this.setStreet() //获取街道信息
    this.getAreaDevice() //获取区域内所有的设备
  }
}
</script>
