<style lang="scss">
.alarmLog_wrap{
  height: 100%;
  position:relative;
}
.breadcrumb{
  position: absolute!important;
  top:20px;bottom:0;
  left:0;right:0;
  margin:auto;
}
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
.ivu-notice{
  top: 90px!important;
  bottom:0;
  overflow: hidden;
}
</style>
<template lang="html">
  <div class="alarmLog_wrap">
    <Row>
      <Col class="breadcrumb" span="18">
        <Breadcrumb>
          <Breadcrumb-item href="/dataCount">数据统计</Breadcrumb-item>
          <Breadcrumb-item>{{streetVal}}</Breadcrumb-item>
        </Breadcrumb>
      </Col>
    </Row>
    <Row class="alarmLog">
      <Col class="deviceCon" span="18">
        <Table border :columns="column" :data="tableData"></Table>
        <Page :total="total" placement="top" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>

      </Col>
    </Row>
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
          align: 'center'
        }
      ],
      njAreaData:[],
      addressVal:'',
      streetVal:'',
      total:0,
      pageNumber:1,
      pageSize:10,
      tableData:[],
      deviceList:[]
    }
  },
  watch:{
    njAreaData(newAreaData) {
      this.$once(this.getAddressVal())
    },
    deviceList(newDeviceList){
      this.$once(this.changePageNumber(1))
    }
  },
  mounted() {

  },
  methods: {
    getAddressVal(){
      this.njAreaData.map((item)=>{
        if(item.id==this.$route.params.aid){
          this.axios('area/street?aid='+this.$route.params.aid)
          .then((res)=>{
            // console.log(res)
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].sid==this.$route.params.sid){
                this.addressVal=item.p+' '+item.c+' '+item.a+' '+res.data[i].n
                this.streetVal=res.data[i].n
              }
            }
          }).catch((e)=>{
            this.$Notice.error({
                title: '错误',
                desc:'获取街道数据时出错',
            });
          })
        }
      })
    },
    changePageNumber(pageNumber) {
      let dataList;
      this.pageNumber = pageNumber ? pageNumber : 1;
      this.axios({
        method: 'get',
        url: 'area/alarms',
        params: {
          sid: this.$route.params.sid,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(res => {
        if(res.data.resultFlag){
          dataList = res.data.rows
          this.total = res.data.total
          // console.log(this.deviceList)
          for (let i = 0; i < dataList.length; i++) {
            for (let j = 0; j < this.deviceList.length; j++) {
              if (dataList[i].dId == this.deviceList[j].id) {
                // console.log(this.deviceList[j])
                this.$set(dataList[i], 'nickname', this.deviceList[j].nickname);
                this.$set(dataList[i], 'address', this.addressVal+' '+this.deviceList[j].address);
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
            }).catch((e)=>{
              this.$Notice.error({
                  title: '错误',
                  desc:'获取用户信息时出错',
              });
            })
          }

          setTimeout(()=>{
            this.tableData = dataList
          },100)
        }

      }).catch((e)=>{
        this.$Notice.error({
            title: '错误',
            desc:'获取街道报警数据时出错',
        });
      })
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.changePageNumber()
    },
    getAreaDevice() {
      this.axios.get('area/devices?aid='+ this.$route.params.aid +'&pageNumber=1&pageSize=3000')
      .then(res => {
        this.deviceList = res.data.rows;
      }).catch((e)=>{
        this.$Notice.error({
            title: '错误',
            desc:'获取设备数据时出错',
        });
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
        }).catch((e)=>{
          this.$Notice.error({
              title: '错误',
              desc:'获取区域数据时出错',
          });
        })
    }).then((data) => {
      this.njAreaData = data;
      this.getAreaDevice()
    })
  }
}
</script>
