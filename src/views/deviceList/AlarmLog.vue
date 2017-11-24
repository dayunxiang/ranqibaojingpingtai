<style lang="scss">
.alarmLogWrapper {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
    .search {
        width: 75%;
        margin: 0 auto;
        .ivu-col {
            width: 100%;
            .ivu-form {
                margin-left: 0;
            }
        }
    }
    .alarmLog {
        width: 75%;
        margin: 0 auto;

        .deviceCon {
            width: 100%;
            .ivu-page {
                margin: 20px 0;
                text-align: center;
            }
        }
    }

}
.handelDesc {
    width: 100%;
    padding-right: 30px;
}
</style>
<template lang="html">

    <div class="alarmLogWrapper">
      <div id="wrapper">
        <div class="scroll">
          <Row class="search">
            <Col span="18">
                <Form inline :model="alarmSearch" ref="alarmSearch">
                  <!-- <FormItem label="">
                      <Input v-model="alarmSearch.deviceName" placeholder="设备名称"></Input>
                  </FormItem> -->
                  <!-- <FormItem label="">
                      <Input v-model="streetAlarmSearch.deviceNum" size="large" placeholder="设备号"></Input>
                  </FormItem> -->
                  <FormItem label="">
                      <Input v-model="alarmSearch.alarmMes" :maxlength="100" placeholder="设备预警信息"></Input>
                  </FormItem>
                  <FormItem>
                      <Button type="primary" icon="android-search" @click="query()">查询</Button>
                      <Button type="error" icon="android-refresh" @click="reset()">重置</Button>
                      <!-- <Button type="info" icon="ios-bolt" @click="allProcess()">一键处理</Button> -->
                  </FormItem>
                </Form>
            </Col>
          </Row>
          <Row class="alarmLog">
            <Col class="deviceCon" span="18">
              <Table border :columns="column" :data="alarmLogData"></Table>
              <Page :total="total" placement="top" :page-size="pageSize" :current="pageNumber" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
            </Col>
          </Row>
        </div>
        <Modal v-model="handelmodal" title="报警处理" class-name="vertical-center-modal"
        @on-visible-change="handelModalChange"
         :mask-closable="false">
          <Form ref="handelForm" :model="handelForm" inline :rules="handelValidate"><!-- ref="handelForm" :rules="ruleInline"-->
            <FormItem label="" prop="way">
              <CheckboxGroup v-model="handelForm.way" @on-change="handelWay">
                  <Checkbox label="2-1"><span>电话通知</span></Checkbox>
                  <Checkbox label="2-2"><span>进店通知</span></Checkbox>
                  <Checkbox label="2-3"><span>设备故障</span></Checkbox>
                  <Checkbox label="2-4"><span>测试误报</span></Checkbox>
                  <Checkbox label="2-5"><span>人员疏散</span></Checkbox>
                  <Checkbox label="3-6"><span>通知安全员</span></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem class="handelDesc" label="其他" prop="desc">
                <Input v-model="handelForm.desc" type="textarea" :maxlength="100" :autosize="{minRows: 2,maxRows: 5}" placeholder="其他处理方式......"></Input>
            </FormItem>
          </Form>
          <div slot="footer">
              <Button type="text" size="large" @click="handelCancel">取消</Button>
              <Button type="primary" size="large" @click="handelSubmit">确定</Button>
          </div>
        </Modal>
    </div>

  </div>

</template>

<script>
import Qs from 'qs'

export default {
  props: [],
  name: 'alarmLog',
  data() {
    const handelWay = (rule, value, callback) => {
      if(value == ''&&this.handelForm.desc == ''){
        callback(new Error('请选择其中一种处理项'));
      }else{
        callback();
      }
    }
    const handelDesc = (rule, value, callback) => {
      this.$refs.handelForm.validateField('way');
      callback();
    }
    return {
      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      total: 0,
      alarmScroll: null,
      handelmodal: false,
      handelForm: {
        status: '',
        did: '',
        alarmId: '',
        way: [],
        isHandel: '',
        desc: ''
      },
      alarmSearch: {
        // deviceName: '',
        // deviceNum:'',
        alarmMes: ''
      },
      alarmLogData: [],
      njAreaData: [],
      handelValidate: {
        way: [{
          validator: handelWay,
          trigger: 'change'
        }],
        desc: [{
          validator: handelDesc,
          trigger: 'blur'
        }]
      },
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
          title: '设备号',
          key: 'imsi',
          align: 'center'
        },
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
          title: '地址',
          key: 'address',
          align: 'center',
          render: (h, params) => {
            let data = params.row
            let addressDetail = ''
            this.njAreaData.map((items) => {
              let address = ''
              if (data.aid == items.id) {
                address += '江苏省 南京市 ' + items.county;
                for (let j = 0; j < items.street.length; j++) {
                  if (data.sid == items.street[j].id) {
                    address += ' ' + items.street[j].street;
                    addressDetail = address + ' ' + data.address
                  }
                }
              }
            })
            return addressDetail
          }
        },
        {
          title: '报警信息',
          key: 'msg',
          align: 'center'
        },
        {
          title: '状态',
          key: 'isHandel',
          align: 'center',
          render: (h, params) => {
            let data = params.row
            if (data.isHandel == '0') {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'large'
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.alarmHandle(data)
                  }
                }
              }, '未读')
            } else if (data.isHandel == '1') {

              return h('Button', {
                props: {
                  type: 'warning',
                  size: 'large'
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.alarmHandle(data)
                  }
                }
              }, '已读')
            } else if (data.isHandel == '2') {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'large'
                },
                style: {
                  // marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.alarmHandle(data)
                  }
                }
              }, '已处理')
            }


          }
        }
      ]
    }
  },
  watch: {
    alarmLogData() {
      setTimeout(() => {
        this.alarmScroll.refresh();
      }, 100)
    }
  },
  mounted() {
    this.alarmScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      scrollbars: true, //滚动条支持
      bounce: true, //边界时的反弹动画，默认true
      preventDefault: false,
      interactiveScrollbars: true,
      fadeScrollbars: true,
      shrinkScrollbars: 'scale'
    });
  },
  methods: {
    //查询
    query() {
      this.changePageNumber()
    },
    //重置查询
    reset() {
      // this.$refs.alarmSearch.resetFields();
      this.alarmSearch.alarmMes = ''
      this.changePageNumber()
    },
    // 复选框改变时触发
    handelWay(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].split('-')[0] == '3') {
          this.handelForm.isHandel = '3';
        } else {
          this.handelForm.isHandel = '2';
        }
      }
    },
    //提交处理结果
    handelSubmit() {
      this.$refs['handelForm'].validate((valid) => {
        if(valid){
          if(this.handelForm.desc){
            this.handelForm.isHandel='2';
          }
          this.axios({
            method: 'get',
            url: 'device/handelAlarm',
            params: {
              alarmId: this.handelForm.alarmId,
              did: this.handelForm.did,
              isHandel: this.handelForm.isHandel,
              handelResult: this.handelForm.desc
            }
          }).then(res => {
            let data = res.data
            if(data.resultFlag){
              this.$Message.info('成功！！');
              this.handelmodal=false
              this.changePageNumber(this.pageNumber)
            }else{
              this.$Message.error('失败！！'+data.message);
            }
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '报警处理时服务出错',
            });
          })
        }
      })
    },
    //取消处理
    handelCancel() {
      if (this.handelForm.status == '0') {
        this.axios({
          method: 'get',
          url: 'device/handelAlarm',
          params: {
            alarmId: this.handelForm.alarmId,
            did: this.handelForm.did,
            isHandel: '1',
            handelResult: ''
          }
        }).then(res => {
          let data = res.data
          if (data.resultFlag) {
            this.changePageNumber(this.pageNumber)
            this.handelmodal=false
          } else {}
        }).catch((e) => {
          this.$Notice.error({
            title: '错误',
            desc: '报警处理时服务出错',
          });
        })
      }else{
        this.handelmodal=false
      }
    },
    //点击状态按钮触发
    alarmHandle(data) {
      this.handelForm.status = data.isHandel
      this.handelForm.isHandel = ''
      this.handelForm.did = data.dId
      this.handelForm.alarmId = data.id
      this.handelmodal = true
    },
    handelModalChange(status){
      this.$refs['handelForm'].resetFields();
    },
    //一键处理所有报警设备
    allProcess() {
      this.$Modal.confirm({
        // title: 'Title',
        content: '确定一键处理所有报警设备吗？',
        onOk: () => {
          // this.$Message.info('Clicked ok');
          // console.log('OK')
          this.axios({
            method: 'post',
            url: 'alarm/setIsHandel',
          }).then(res => {
            let data = res.data
            // console.log(data)
            if (data.resultFlag) {

            } else {}
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '获取报警数据时服务出错',
            });
          })
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
          // console.log('cancel')
        }
      });
    },
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber ? pageNumber : 1;
      this.axios({
        method: 'get',
        url: 'alarm/listAllAlarmRecords',
        params: {
          alarmmsg: this.alarmSearch.alarmMes,
          pageSize: this.pageSize,
          pageIndex: this.pageNumber
        }
      }).then(res => {
        let data = res.data
        if (data.resultFlag) {
          this.total = res.data.total
          this.alarmLogData = res.data.data
        } else {}
      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取报警数据时服务出错',
        });
      })
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.changePageNumber()
    },
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
      this.changePageNumber()
    })
  }
}
</script>
