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
            console.log(params)
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
  watch:{
    deviceList(newDeviceList){
      this.changePageNumber()
    }

  },
  mounted() {

  },
  methods: {
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber ? pageNumber : 1;
      let tableData=[];
        this.axios({
          method: 'get',
          url: 'alarm/listAllAlarmRecords',
          params: {
            pageSize: this.pageSize,
            pageIndex: this.pageNumber
          }
        }).then(res => {
          tableData = res.data.data;
          this.total = res.data.total;
          this.tableData=[];
          for (let i = 0; i < tableData.length; i++) {
            new Promise(resolve=>{
              for (let j = 0; j < this.deviceList.length; j++) {
                if (this.deviceList[j].id == tableData[i].dId) {
                  tableData[i].nickname=this.deviceList[j].nickname;
                  tableData[i].aid=this.deviceList[j].aid;
                  tableData[i].sid=this.deviceList[j].sid;
                  tableData[i].imsi=this.deviceList[j].imsi;
                  tableData[i].address=this.deviceList[j].address;
                  resolve(tableData[i]);
                }
              }
            }).then((data)=>{
              this.njAreaData.map((items) => {
                let address = ''
                if(data.aid==items.id){
                  address+='江苏省 南京市 '+items.county;
                  for(let j=0;j<items.street.length;j++){
                    if(data.sid==items.street[j].id){
                      address+=' '+items.street[j].street;
                      data.address=address+' '+data.address
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
            desc: '获取报警数据时服务出错',
          });
        })

    },
    changePageSize(pageSize) {
      // console.log(pageSize)
      this.pageSize = pageSize;
      this.changePageNumber()
    },
    getAreaDevice() {
      this.axios.get('device/listAllDevice?pageIndex=1&pageSize=100000')
        .then(res => {
          // console.log(res.data.data)
          this.deviceList = res.data.data
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '获取设备数据时服务出错',
          });
        })
    }
  },
  computed: {

  },
  created() {
    new Promise((resolve) => {
      this.axios.get('region/countyAndStreet',{params:{id:830}})
        .then(res => {
          let data=res.data
          if(data.resultFlag){
            resolve(data.data)
          }else{
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
      this.getAreaDevice() //获取区域内所有的设备


    })


  }
}
</script>
