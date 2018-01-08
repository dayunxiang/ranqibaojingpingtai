<style lang="scss">
.deviceAlarmLog_wrap {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    .pathNav,
    .search {
        width:75%;
        height: 60px!important;
        margin: 0 auto;
    }
    .pathNav {
        width:75%;
        line-height: 60px;
        margin: 0 auto;
    }
    .deviceAlarmLog{
        width:75%;
        margin: 0 auto;
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
  <div class="deviceAlarmLog_wrap">
    <div id="wrapper">
      <div class="scroll">
        <Row class="pathNav">
          <Col class="breadcrumb" span="18">
            <Breadcrumb>
              <Breadcrumb-item href="/map">实时监控</Breadcrumb-item>
              <Breadcrumb-item>{{daviceName}}</Breadcrumb-item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row class="deviceAlarmLog">
          <Col class="deviceCon" span="18">
            <Table border :columns="column" :data="tableData"></Table>
            <Page :total="total" placement="top" :current="pageNumber" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  props: [],
  name: 'deviceLog',
  data() {
    return {
      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      total: 0,
      tableData: [],
      daviceName:'',
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
        // {
        //   title: '设备名',
        //   key: 'nickname',
        //   align: 'center'
        // },
        // {
        //   title: '值',
        //   key: 'ch4',
        //   align: 'center'
        // },
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
            // console.log(params)
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
          title: '报警信息',
          key: 'msg',
          align: 'center'
        }
      ]
    }
  },
  watch:{
    tableData(){
      setTimeout(() => {
        this.deviceAlarmScroll.refresh();
      }, 100)
    }
  },
  mounted() {
    this.changePageNumber()
    this.deviceAlarmScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      scrollbars: true, //滚动条支持
      bounce: true, //边界时的反弹动画，默认true
      preventDefault: false,
      interactiveScrollbars:true,
      fadeScrollbars: true,
      shrinkScrollbars: 'scale'
    });
  },
  methods: {
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber ? pageNumber : 1;
        this.axios({
          method: 'get',
          url: 'alarm/queryAlarmRecords',
          params: {
            did:this.$route.params.id,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        }).then(res => {
          var resData=res.data;
          if(resData.resultFlag){
            this.tableData = resData.data.rows;
            this.total = resData.data.total;
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
    }
  },
  computed: {

  },
  created() {
    this.daviceName=decodeURI(this.$route.params.name)
  }
}
</script>
