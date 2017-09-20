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
          title: '手机号',
          key: 'telnumber',
          width: 210,
          align: 'center',
          render: (h, params) => {
            let tagArr = []
            if(params.row.telnumber){
              let telnumber = params.row.telnumber.split(',');
              for (let i = 0; i < telnumber.length; i++) {
                tagArr.push(h('span', {
                  style: {
                    margin: '3px'
                  },
                }, telnumber[i]))
                if ((i + 1) % 2 == 0) {
                  tagArr.push(h('br'))
                }
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
        this.tableData = res.data.data;
        this.total = res.data.total
        for (let i = 0; i < this.tableData.length; i++) {

          this.njAreaData.map((items) => {
            let address = ''
            if(this.tableData[i].aid==items.id){
              address+='江苏省 南京市 '+items.county;
              for(let j=0;j<items.street.length;j++){
                if(this.tableData[i].sid==items.street[j].id){
                  address+=' '+items.street[j].street;
                  this.$set(this.tableData[i], 'address', address+' '+this.tableData[i].address);
                }
              }
            }
          })


          this.axios('device/belong', {
            params: {
              did: this.tableData[i].id
            }
          }).then(resp => {
            if(resp.data.resultFlag==false){
              this.$Notice.error({
                title: '错误',
                desc: '用户查找失败',
              });
            }
            if(resp.data.found==true){
              // this.$set(dataList[i], 'username', resp.data.belong.name);
              this.$set(this.tableData[i], 'telnumber', resp.data.belong.tel);
            }
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '获取用户信息时服务出错',
            });
          })


        }
        // setTimeout(() => {
        //   this.tableData = dataList
        // }, 100)

      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取设备数据时服务出错',
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
      this.changePageNumber()
    })
  }
}
</script>
