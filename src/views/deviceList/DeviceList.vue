<style lang="scss">
.ivu-cascader-transfer {
    z-index: 100000000!important;
}
.deviceWrapper {
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
    .deviceList {
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
.deviceMesModal {

    .ivu-modal-body {
        position: relative;
        height: 380px;
        max-height: 400px;
        overflow: hidden;
        padding: 16px 16px 0;
        #deviceMes {
            height: 100%;
        }
        .ivu-form {
            padding-bottom: 10px;
        }
    }
    .ivu-form-item-error-tip {
        padding-top: 2px;
    }
    .ivu-form-item {
        margin-bottom: 15px;
    }
}
.ivu-notice {
    top: 90px!important;
    bottom: 0;
    overflow: hidden;
}

.ivu-form.ivu-form-label-right.ivu-form-inline {
    margin-left: 30px;
    margin-top: 20px;
}
</style>
<template lang="html">
  <div class="deviceWrapper">
    <div id="wrapper">
      <div class="scroll">
        <Row class="search">
          <Col span="18">
            <Form ref="data" inline>
                <FormItem prop="nickname">
                    <Input type="text" v-model="nickname" placeholder="设备名">
                    </Input>
                </FormItem>
                <FormItem prop="imsi">
                    <Input type="text" v-model="imsi" placeholder="设备号">
                    </Input>
                </FormItem>
                <FormItem>
                    <Cascader :data="streets" v-model="streetId" placeholder="区/街道"></Cascader>

                </FormItem>
                <FormItem prop="address">
                    <Input type="text" v-model="address" placeholder="详细地址">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="search" @click="queryDevice()">查询</Button>
                    <Button type="error" icon="refresh" @click="reset()" >重置</Button>
                    <Button type="success" icon="plus-round" @click="addDevice()">新增</Button>
                </FormItem>
            </Form>
          </Col>
        </Row>
        <Row class="deviceList">
          <Col class="deviceCon" span="18">
            <Table border :columns="column" :data="tableData"></Table>
            <Page :total="total" placement="top" :page-size="pageSize" :current="pageNumber" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
          </Col>
        </Row>
      </div>
    </div>
    <Modal v-model="modal" :title="modalTitle" @on-ok="deviceSave"
    @on-cancel="deviceCancel" class-name="vertical-center-modal deviceMesModal" :loading="loading" :mask-closable="false">
      <div id="deviceMes">
        <div class="scroll">
          <Form :model="deviceMes" :label-width="80" ref="deviceMes" :rules="deviceMesRule">
            <FormItem label="设备号" prop="imsi">
                <Input v-model="deviceMes.imsi" placeholder="设备号"></Input>
            </FormItem>
            <FormItem label="设备名称" prop="name">
                <Input v-model="deviceMes.name" placeholder="设备名称"></Input>
            </FormItem>
            <!-- v-if="item.status" -->
            <FormItem
                    v-for="(item, index) in deviceMes.tels"
                    :key="index"
                    v-if="item.status"
                    :label="'手机号'"
                    :prop="'tels.' + index + '.value'"
                    :rules="{required: true, message: '请输入手机号', trigger: 'blur'}">
                <Row>
                    <Col span="18">
                        <Input type="text" v-model="item.value" placeholder="手机号"></Input>
                    </Col>
                    <Col span="4" offset="1" v-show="delTelShow">
                        <Button type="ghost" @click="removeTels(index)">删除</Button>
                    </Col>
                </Row>

            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" long @click="addTels" icon="plus-round">添加手机号</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="设备状态" prop="status">
              <i-switch v-model="deviceMes.status" size="large">
                  <span slot="1">启用</span>
                  <span slot="0">禁用</span>
              </i-switch>
            </FormItem>
            <FormItem label="设备所属" prop="the">
                <i-radio-group v-model="deviceMes.the">
                    <Radio label="1">商户</Radio>
                    <Radio label="0">个人</Radio>
                </i-radio-group>
            </FormItem>
            <FormItem label="地址" prop="ads">
                <i-cascader :data="addressData" v-model="deviceMes.ads" transfer></i-cascader>
            </FormItem>
            <FormItem label="详细地址" prop="adsDetail">
                <Input v-model="deviceMes.adsDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="详细地址......"></Input>
            </FormItem>
            <FormItem>
              <Row :gutter="12">
                <Col span="8">
                    <Button type="info">获取经纬度</Button>
                </Col>
                <Col span="16">
                    <div v-show="false" class="ivu-form-item-error-tip" style="line-height:33px;">获取经纬度失败，请手动输入！！</div>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="经纬度">
              <Row :gutter="12">
                <Col span="11">
                  <FormItem prop="x">
                    <Input v-model="deviceMes.x" placeholder="经度"></Input>
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem prop="y">
                    <Input v-model="deviceMes.y" placeholder="纬度"></Input>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'deviceList',
  data() {
    return {
      index: 1,
      modal: false,
      delTelShow: false,
      loading: true,
      deviceMesModalScroll: null,
      modalTitle: '',
      streets: [],
      nickname: '',
      streetId: [],
      imsi: '',
      address: '',
      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      addressData: [{
        value: '1',
        label: '南京市',
        children: []
      }],
      deviceMes: {
        name: '',
        imsi: '',
        the: '1',
        ads: [],
        status: true,
        adsDetail: '',
        x: '',
        y: '',
        tels: [{
          value: '',
          index: 1,
          status: 1
        }],
      },
      deviceMesRule: {
        imsi: [{
          required: true,
          message: '请输入设备号',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入设备名称',
          trigger: 'blur'
        }],
        the: [{
          required: true,
          message: '请选择所属类',
          trigger: 'change'
        }],
        the: [{
          required: true,
          message: '请选择状态',
          trigger: 'change'
        }],
        // ads: [
        //     { required: false, message: '请选择地址', trigger: 'change' }
        // ],
        adsDetail: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }],
        x: [{
          required: true,
          message: '请输入经度',
          trigger: 'blur'
        }],
        y: [{
          required: true,
          message: '请输入纬度',
          trigger: 'blur'
        }]
      },
      column: [{
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
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
        {
          title: '手机号',
          key: 'arlarmTels',
          width: 210,
          align: 'center',
          render: (h, params) => {
            let tagArr = []
            if (params.row.arlarmTels) {
              let telnumber = params.row.arlarmTels.split(',');
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
          align: 'center',
          render: (h, params) => {
            let data=params.row
            let addressDetail = ''
            this.njAreaData.map((items) => {
              let address=''
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
          title: '状态',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            console.log(params)
            let data = params.row
            if (data.type == '0') {
              return h('span', {
                style: {
                  color: '#ed3f14'
                }
              }, '禁用')
            } else if (data.type == '1') {
              return h('span', {
                style: {
                  color: '#19be6b'
                }
              }, '启用')
            }

          }
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'info',
                // size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.modal = true
                  this.modDevice(params.row.id)
                }
              }
            }, '修改')
          }
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
    deviceMes: {
      handler: (val, oldVal) => {
        // this.delTelShow = true
        this.loading = false;
        console.log(oldVal)
      },
      deep: true
    },
    tableData() {
      setTimeout(() => {
        this.deviceScroll.refresh();
      }, 100)
    }

  },
  computed: {

  },
  mounted() {
    this.deviceScroll = new IScroll('#wrapper', {
      mouseWheel: true,
      scrollbars: true, //滚动条支持
      bounce: true, //边界时的反弹动画，默认true
      preventDefault: false,
      interactiveScrollbars: true,
      fadeScrollbars: true,
      shrinkScrollbars: 'scale'
    });
    this.deviceMesModalScroll = new IScroll('#deviceMes', {
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
    //设备信息模态框 确定按钮 执行
    deviceSave() {
      console.log()
      // this.modal = true;
      // setTimeout(() => {
      //     this.modal = false;
      // }, 2000);
      this.$refs.deviceMes.validate((valid) => {
        if (valid) {
          console.log('success')
          let tels = []
          this.deviceMes.tels.map((item) => {
            if (item.status == '1') {
              tels.push(item.value)
            }
          })
          this.axios({
            headers: {'token':JSON.parse(localStorage.getItem('userMes')).token},
            method: 'post',
            url: 'device/addDevice',
            data: Qs.stringify({
              imsi: this.deviceMes.imsi,
              nickname: this.deviceMes.name,
              tels: tels.join(','),
              aid: this.deviceMes.ads[1],
              sid: this.deviceMes.ads[2],
              type: this.deviceMes.the,
              address: this.deviceMes.adsDetail,
              status: this.deviceMes.status ? 1 : 0,
              x: this.deviceMes.x,
              y: this.deviceMes.y
            })
          }).then(res => {
            this.modal = false;
            this.changePageNumber()
            this.$refs['deviceMes'].resetFields();
            this.deviceMes.tels = [{
              value: '',
              index: 1,
              status: 1
            }]
          }).catch((e) => {
            this.modal = false;
          })
        } else {}
      })
    },
    //设备信息模态框 取消按钮 执行
    deviceCancel() {
      this.$refs['deviceMes'].resetFields();
      this.deviceMes.tels = [{
        value: '',
        index: 1,
        status: 1
      }]
    },
    //新增设备按钮  执行
    addDevice() {
      this.$refs['deviceMes'].resetFields();
      this.deviceMes.tels = [{
        value: '',
        index: 1,
        status: 1
      }]
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)
      this.modalTitle = "添加设备"
      this.modal = true
      console.log('新增')
    },
    //修改设备按钮  执行
    modDevice(id) {
      this.$refs['deviceMes'].resetFields();
      this.deviceMes.tels = [{
        value: '',
        index: 1,
        status: 1
      }]
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)
      this.modalTitle = "修改设备"
      console.log(id)
    },

    // deviceSubmit (name) {
    //     this.$refs[name].validate((valid) => {
    //         if (valid) {
    //             this.$Message.success('Success!');
    //         } else {
    //             this.$Message.error('Fail!');
    //         }
    //     })
    // },
    // deviceReset (name) {
    //     this.$refs[name].resetFields();
    // },
    //添加手机号按钮 执行
    addTels() {
      this.index++;
      let tel=[]
      for(let i=0;i<this.deviceMes.tels.length;i++){
        if(this.deviceMes.tels[i].status=='1'){
          tel.push(this.deviceMes.tels[i])
        }
      }
      for(let i=0;i<tel.length;i++){
        if(tel.length>=1){
          this.delTelShow=true;
        }else{
          this.delTelShow=false
        }
      }
      this.deviceMes.tels.push({
        value: '',
        index: this.index,
        status: 1
      });
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)

    },
    //删除手机号按钮 执行
    removeTels(index) {

      this.deviceMes.tels[index].status = 0;
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)
      let tel=[]
      for(let i=0;i<this.deviceMes.tels.length;i++){
        if(this.deviceMes.tels[i].status=='1'){
          tel.push(this.deviceMes.tels[i])
        }
      }
      for(let i=0;i<tel.length;i++){
        if(tel.length>1){
          this.delTelShow=true;
        }else{
          this.delTelShow=false
        }
      }

    },

    changePageNumber(pageNumber) {
      let dataList
      this.pageNumber = pageNumber ? pageNumber : 1;
      this.axios({
        method: 'get',
        url: 'device/listAllDevice',
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageNumber,
          nickname: this.nickname,
          imsi: this.imsi,
          address: this.address,
          sid: this.streetId[this.streetId.length - 1]
        }
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total
      }).catch((e) => {
        this.$Notice.error({
          title: '错误',
          desc: '获取设备数据时服务出错',
        });
      })

    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.changePageNumber();
    },
    queryDevice() {
      this.pageNumber = 1;
      this.changePageNumber(this.pageNumber);
    },
    reset() {
      this.nickname = '';
      this.streetId = [];
      this.imsi = '';
      this.address = '';
      this.pageNumber = 1;
      this.changePageNumber(this.pageNumber);
    }
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
      let streets = [];
      data.map((item) => {
        let obj = {};
        obj.value = item.id;
        obj.label = item.county;
        let subobj = [];
        item.street.map((items) => {
          let obj = {};
          obj.value = items.id;
          obj.label = items.street;
          subobj.push(obj);
        });
        obj.children = subobj;
        streets.push(obj);
      })
      this.streets = streets;
      this.addressData[0].children = streets;
      this.changePageNumber();
    })
  }
}
</script>
