''<style lang="scss">
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
            .ivu-table-tbody{
              .operate{
                .ivu-table-cell{
                  padding:0;
                }
              }
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
            .ivu-form-item-label {
              text-align: right;
              vertical-align: middle;
              float: left;
              font-size: 12px;
              color: #495060;
              line-height: 1;
              padding: 10px 6px 10px 0;
            }
        }
    }
    .ivu-form-item-error-tip {
        padding-top: 2px;
    }
    .ivu-form-item {
        margin-bottom: 15px;
    }
}

.ivu-form.ivu-form-label-right.ivu-form-inline {
    margin-left: 30px;
    margin-top: 20px;
}
.ivu-modal-confirm-footer{
  margin-top: 20px!important;
}
</style>
<template lang="html">
  <div class="deviceWrapper">
    <div id="wrapper">
      <div class="scroll">
        <Row class="search">
          <Col span="18">
            <Form ref="deviceQueryForm" :model="deviceQueryForm" inline>
                <FormItem prop="name">
                    <Input type="text" v-model="deviceQueryForm.name" :maxlength="20" placeholder="设备名">
                    </Input>
                </FormItem>
                <FormItem prop="imsi">
                    <Input type="text" v-model="deviceQueryForm.imsi" :maxlength="20" placeholder="设备号">
                    </Input>
                </FormItem>
                <FormItem prop="status">
                    <Select v-model="deviceQueryForm.status" style="width:100px" placeholder="状态">
                        <Option v-for="item in deviceQueryForm.statusData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="areaStreet">
                    <Cascader :data="deviceQueryForm.areaStreetData" v-model="deviceQueryForm.areaStreet" placeholder="区/街道"></Cascader>
                </FormItem>
                <FormItem prop="address">
                    <Input type="text" v-model="deviceQueryForm.address" placeholder="详细地址">
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" icon="search" @click="changePageNumber()">查询</Button>
                    <Button type="error" icon="refresh" @click="resetQueryDevice()" >重置</Button>
                    <Button type="success" icon="plus-round" @click="addDevice(true)">新增</Button>
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
    <Modal v-model="deviceMesModal" :title="deviceMesTitle"
    @on-visible-change="deviceModalChange"
     class-name="vertical-center-modal deviceMesModal" :mask-closable="false">
      <div id="deviceMes">
        <div class="scroll">
          <Form :model="deviceMesFrom" :label-width="80" ref="deviceMesFrom" :rules="deviceMesFromRule">
            <FormItem label="设备号" prop="imsi">
                <Input v-model="deviceMesFrom.imsi" :readonly="deviceMesFrom.imsiStatus" :maxlength="20" placeholder="设备号"></Input>
            </FormItem>
            <FormItem label="设备名称" prop="name">
                <Input v-model="deviceMesFrom.name" :maxlength="20" placeholder="设备名称"></Input>
            </FormItem>
            <FormItem
                    v-for="(item, index) in deviceMesFrom.ownerTels"
                    :key="'o'+index"
                    v-if="item.status"
                    :label="'户主手机'"
                    :prop="'ownerTels.' + index + '.value'"
                    :rules="[{required: true, message: '请输入安全员手机号', trigger: 'blur'},{pattern:/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,message: '请输入正确的手机号'}]">
                <Row>
                    <Col span="18">
                        <Input type="text" v-model="item.value" :maxlength="11" placeholder="户主手机号"></Input>
                    </Col>
                    <Col span="4" offset="1" v-show="deviceMesFrom.ownerTelsDelBtnShow">
                        <Button type="ghost" @click="removeTels(index,'ownerTels')">删除</Button>
                    </Col>
                </Row>

            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" long @click="addTels('ownerTels')" icon="plus-round">添加户主手机号</Button>
                    </Col>
                </Row>
            </FormItem>

            <FormItem
                    v-for="(item, index) in deviceMesFrom.safetyTels"
                    :key="'s'+index"
                    v-if="item.status"
                    :label="'安全员手机'"
                    :prop="'safetyTels.' + index + '.value'"
                    :rules="[{required: true, message: '请输入安全员手机号', trigger: 'blur'},{pattern:/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,message: '请输入正确的手机号'}]">
                <Row>
                    <Col span="18">
                        <Input type="text" v-model="item.value" :maxlength="11" placeholder="安全员手机号"></Input>
                    </Col>
                    <Col span="4" offset="1" v-show="deviceMesFrom.safetyTelsDelBtnShow">
                        <Button type="ghost" @click="removeTels(index,'safetyTels')">删除</Button>
                    </Col>
                </Row>

            </FormItem>
            <FormItem>
                <Row>
                    <Col span="12">
                        <Button type="dashed" long @click="addTels('safetyTels')" icon="plus-round">添加安全员手机号</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="设备状态" prop="status">
              <i-switch v-model="deviceMesFrom.status" size="large">
                  <span slot="1">启用</span>
                  <span slot="0">禁用</span>
              </i-switch>
            </FormItem>
            <FormItem label="设备所属" prop="the">
                <i-radio-group v-model="deviceMesFrom.the">
                    <Radio label="1">商户</Radio>
                    <Radio label="0">个人</Radio>
                </i-radio-group>
            </FormItem>
            <FormItem label="地址" prop="ads">
                <Cascader :data="deviceMesFrom.addressData" v-model="deviceMesFrom.ads" transfer></Cascader>
            </FormItem>
            <FormItem label="详细地址" prop="adsDetail">
                <Input v-model="deviceMesFrom.adsDetail" :maxlength="80" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="详细地址......"></Input>
            </FormItem>
            <FormItem>
              <Row :gutter="12">
                <Col span="8">
                    <Button type="info" @click="obtainLoLa()">获取经纬度</Button>
                </Col>
                <Col span="16">
                    <div v-show="(LoLaMes=='2')" class="ivu-form-item-error-tip" style="line-height:33px;">获取经纬度失败，请手动输入！！</div>
                    <div v-show="(LoLaMes=='1')" class="ivu-form-item-error-tip" style="line-height:33px;color:#19be6b;">获取经纬度成功！！</div>
                </Col>
              </Row>
            </FormItem>
            <FormItem v-show="LoLaMes?true:false">
              <div slot="label">
                <span style="color: #ed3f14;margin-right: 4px;line-height: 1;font-family: SimSun;font-size: 12px;">*</span>
                经纬度
              </div>
              <Row :gutter="12">
                <Col span="11">
                  <FormItem prop="x">
                    <Input v-model="deviceMesFrom.x" @on-change="LoLaMes='3'" placeholder="经度"></Input>
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem prop="y">
                    <Input v-model="deviceMesFrom.y" @on-change="LoLaMes='3'" placeholder="纬度"></Input>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
          <Button type="text" size="large" @click="deviceMesModal = false">取消</Button>
          <Button type="primary" size="large" @click="deviceSubmit('deviceMesFrom')">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Qs from 'qs'

export default {
  name: 'deviceList',
  data() {
    const statusSwit = (rule, value, callback) => {callback();}
    const theCheck = (rule, value, callback) => {callback();}
    const adsDetCas = (rule, value, callback) => {
      if(value.length<=0){
        callback(new Error('请选择地址'));
      }else{
        callback();
      }
    }
    return {
      deviceQueryForm: { //查询参数
        name: '',
        imsi: '',
        status:'',
        statusData:[{
            value: '1',
            label: '启用'
        },
        {
            value: '0',
            label: '禁用'
        }],
        areaStreet: [],
        areaStreetData: [],
        address: ''
      },
      LoLaMes:'',

      delTelShow: false,

      deviceMesModal: false,
      deviceMesModalScroll: null,
      deviceMesTitle: '',
      tableData: [],
      njAreaData: [],
      pageNumber: 1, //当前页数
      pageSize: 10, //页大小
      total: 0,
      deviceMesFrom: {
        addMod:true,
        imsiStatus:true,
        id:'',
        name: '',
        imsi: '',
        the: '1',
        ads: [],
        status: true,
        adsDetail: '',
        x: '',
        y: '',
        ownerTelsDelBtnShow:false,
        ownerTels: [{
          value: '',
          index: 1,
          status: 1
        }],
        safetyTelsDelBtnShow:false,
        safetyTels: [{
          value: '',
          index: 1,
          status: 1
        }],
        addressData: [{
          value: 'nanjing',
          label: '南京市',
          children: []
        },{
          value: 'yancheng',
          label: '盐城市',
          children: []
        }]
      },
      deviceMesFromRule: {
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
        status: [{
          required: true,
          // message: '请选择状态',
          validator: statusSwit,
          trigger: 'change'
        }],
        the: [{
          required: true,
          // message: '请选择所属类',
          validator: theCheck,
          trigger: 'change'
        }],
        ads: [{
          required: true,
          // message: '请选择地址',
          validator: adsDetCas,
          trigger:'change'
        }],
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
      column: [
        // {
        //     type: 'selection',
        //     width: 60,
        //     align: 'center'
        // },
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '设备名',
          key: 'nickname',
          className:'userSelectText',
          align: 'center'
        },
        {
          title: '设备号',
          key: 'imsi',
          className:'userSelectText',
          align: 'center'
        },
        {
          title: '业主手机号',
          key: 'yztels',
          width: 210,
          align: 'center',
          className:'userSelectText',
          render: (h, params) => {
            let data=params.row
            let owner=[];
            if (data.yztels.length>=1) {
              for (let i = 0; i < data.yztels.length; i++) {
                owner.push(h('span', {
                  style: {
                    margin: '3px'
                  },
                }, data.yztels[i]))
                if ((i + 1) % 2 == 0) {
                  owner.push(h('br'))
                }
              }
            }else{
              return '-'
            }
            return owner
          }
        },
        {
          title: '安全员手机号',
          key: 'aqytels',
          width: 210,
          align: 'center',
          className:'userSelectText',
          render: (h, params) => {
            let data=params.row
            let safety=[];
            if (data.aqytels.length>=1) {
              for (let i = 0; i < data.aqytels.length; i++) {
                safety.push(h('span', {
                  style: {
                    margin: '3px'
                  },
                }, data.aqytels[i]))
                if ((i + 1) % 2 == 0) {
                  safety.push(h('br'))
                }
              }
            }else{
              return '-'
            }
            return safety
          }
        },
        {
          title: '地址',
          key: 'address',
          align: 'center',
          className:'userSelectText',
          render: (h, params) => {
            let data = params.row
            let addressDetail = ''
            if(data.imsi=='460041765206595'){
              this.ycAreaData.map((items) => {
                let address = ''
                // console.log(params.value[2].aid == items.id||params.value[2].aid == '830')
                if (data.aid == items.id||data.aid== '830') {
                  address += '江苏省 盐城市 ' + items.county;
                  addressDetail = ''
                  addressDetail = address + ' ' + data.address
                  // for (let j = 0; j < items.street.length; j++) {
                  //   if (params.value[2].sid == items.street[j].id) {
                  //     address += ' ' + items.street[j].street;
                  //     params.value[2].addressDetail = ''
                  //     params.value[2].addressDetail = address + ' ' + params.value[2].address
                  //   }
                  // }
                }
              })
            }else{
              console.log(this.njAreaData)
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
            }

            return addressDetail
          }
        },
        {
          title: '状态',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let data = params.row
            if (data.status == '0') {
              return h('span', {
                style: {
                  color: '#ed3f14'
                }
              }, '禁用')
            } else if (data.status == '1'||!data.status) {
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
          width: 150,
          className:'operate',
          align: 'center',
          render: (h, params) => {
            return [h('Button', {
              props: {
                type: 'info',
                // size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {

                  this.modDevice(params.row,false)
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'error',
                // size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {

                  this.delDevice(params.row)
                }
              }
            }, '删除')]
          }
        },
      ]
    }
  },
  watch: {
    // deviceMes: {
    //   handler: (val, oldVal) => {
    //     // this.delTelShow = true
    //     // this.loading = false;
    //   },
    //   deep: true
    // },
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
    //重置查询
    resetQueryDevice() {
      this.$refs['deviceQueryForm'].resetFields();
      this.changePageNumber();
    },
    //获取经纬度
    obtainLoLa(){
      let adsStatus,adsDetStatus;
      this.$refs['deviceMesFrom'].validateField('ads',(valid)=>{adsStatus=valid?false:true})
      this.$refs['deviceMesFrom'].validateField('adsDetail',(valid)=>{adsDetStatus=valid?false:true})
      let addressDetail = ''
      this.njAreaData.map((items) => {
        let address = ''
        if (this.deviceMesFrom.ads[1] == items.id) {
          for (let j = 0; j < items.street.length; j++) {
            if (this.deviceMesFrom.ads[2] == items.street[j].id) {
              // address += items.street[j].street;
              addressDetail = address + this.deviceMesFrom.adsDetail
            }
          }
        }
      })
      if(adsStatus&&adsDetStatus){
        this.axios({
          method: 'get',
          url: 'device/getxy',
          params: {
            address: this.deviceMesFrom.adsDetail,
          }
        }).then(res => {
          let data=res.data;
          // console.log(data)
          if(data.resultFlag){
            this.LoLaMes='1'
            this.deviceMesFrom.x=data.data.lng
            this.deviceMesFrom.y=data.data.lat
            this.$refs['deviceMesFrom'].validateField('x')
            this.$refs['deviceMesFrom'].validateField('y')
          }else{
            this.LoLaMes='2'
            this.deviceMesFrom.x=''
            this.deviceMesFrom.y=''
            this.$refs['deviceMesFrom'].validateField('x')
            this.$refs['deviceMesFrom'].validateField('y')
          }
          setTimeout(()=>{
            this.deviceMesModalScroll.refresh();

          })

        })
      }
    },
    //提交模态框信息
    deviceSubmit(name) {
      // console.log('aaaaaaaaaaa',!(this.deviceMesFrom.x||this.deviceMesFrom.x))
      if(!this.deviceMesFrom.x||!this.deviceMesFrom.x){
        this.obtainLoLa()
      }

      this.$refs[name].validate((valid) => {
        console.log(valid)
        if (valid) {

          let [ownerTels,safetyTels] = [[],[]]
          this.deviceMesFrom.ownerTels.map((item) => {
            if (item.status == '1') {
              ownerTels.push(item.value)
            }
          })
          this.deviceMesFrom.safetyTels.map((item) => {
            if (item.status == '1') {
              safetyTels.push(item.value)
            }
          })
          let pathUrl=''
          let reqData=null
          if(this.deviceMesFrom.addMod){
            pathUrl='device/addDevice'
            reqData={
              imsi: this.deviceMesFrom.imsi,
              nickname: this.deviceMesFrom.name,
              tels: ownerTels.join(','),
              aqytels:safetyTels.join(','),
              aid: this.deviceMesFrom.ads[1],
              sid: this.deviceMesFrom.ads[2],
              type: this.deviceMesFrom.the,
              address: this.deviceMesFrom.adsDetail,
              status: this.deviceMesFrom.status ? 1 : 0,
              x: this.deviceMesFrom.x,
              y: this.deviceMesFrom.y
            }
          }else{
            pathUrl='device/updateDevice'
            reqData={
              id: this.deviceMesFrom.id,
              nickname: this.deviceMesFrom.name,
              tels: ownerTels.join(','),
              aqytels:safetyTels.join(','),
              aid: this.deviceMesFrom.ads[1],
              sid: this.deviceMesFrom.ads[2],
              type: this.deviceMesFrom.the,
              address: this.deviceMesFrom.adsDetail,
              status: this.deviceMesFrom.status ? 1 : 0,
              x: this.deviceMesFrom.x,
              y: this.deviceMesFrom.y
            }
          }
          this.axios({
            headers: {
              'token': JSON.parse(localStorage.getItem('userMes')).token
            },
            method: 'post',
            url: pathUrl,
            data: Qs.stringify(reqData)
          }).then(res => {
            let data=res.data
            if(data.resultFlag){
              this.$Message.info('成功！！');
              this.deviceMesModal = false;
              if(this.deviceMesFrom.addMod){
                this.changePageNumber()
              }else{
                this.changePageNumber(this.pageNumber)
              }
            }else{
              this.$Message.error('失败！！'+data.message);
            }
          }).catch((e) => {
            this.$Notice.error({
              title: '错误',
              desc: '设备操作时服务出错',
            });
          })
        } else {

        }
      },(err)=>{
        console.log(err)
      })
    },
    //设备信息模态框 开关执行
    deviceModalChange(status){
      this.deviceMesModalScroll.scrollTo(0, 0);
      if(this.deviceMesFrom.addMod){
        this.$refs['deviceMesFrom'].resetFields();
        this.deviceMesFrom.ownerTels = [{ value: '', index: 1, status: 1 }]
        this.deviceMesFrom.safetyTels = [{ value: '', index: 1, status: 1 }]
      }else{
        if(!status){
          this.$refs['deviceMesFrom'].resetFields();
          this.deviceMesFrom.ownerTels = [{ value: '', index: 1, status: 1 }]
          this.deviceMesFrom.safetyTels = [{ value: '', index: 1, status: 1 }]
        }
      }
    },
    //新增设备按钮  执行
    addDevice(addMod) {
      this.deviceMesFrom.addMod=addMod
      this.deviceMesFrom.imsiStatus=false
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
        this.LoLaMes=''
      }, 100)
      this.deviceMesTitle = "添加设备"
      this.deviceMesModal = true
    },
    //修改设备按钮  执行
    modDevice(data,addMod) {
      this.deviceMesFrom.imsiStatus=true   //更改只读状态
      this.deviceMesFrom.addMod=addMod      //更改 是新增 还是修改状态
      // console.log(data)
      let ownerTelsArr=data.yztels

      let safetyTelsArr=data.aqytels
      // ownerTels,safetyTels
      let [ownerTels,safetyTels]=[[],[]]
      for(let i=0;i<ownerTelsArr.length;i++){
        ownerTels.push({
          value:ownerTelsArr[i],
          index:i+1,
          status:'1'
        })
      }
      for(let i=0;i<safetyTelsArr.length;i++){
        safetyTels.push({
          value:safetyTelsArr[i],
          index:i+1,
          status:'1'
        })
      }
      this.deviceMesFrom.id=data.id
      this.deviceMesFrom.name=data.nickname
      this.deviceMesFrom.imsi=data.imsi
      this.deviceMesFrom.status=data.status?(data.status=='1'?true:false):true
      this.deviceMesFrom.the=data.type
      this.deviceMesFrom.ads=['nanjing',data.aid,data.sid]
      this.deviceMesFrom.adsDetail=data.address
      this.deviceMesFrom.x=data.x
      this.deviceMesFrom.y=data.y
      this.deviceMesFrom.ownerTels=ownerTels
      this.deviceMesFrom.safetyTels=safetyTels

      this.telDelShow('ownerTels')
      this.telDelShow('safetyTels')


      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)
      this.deviceMesTitle = "修改设备"
      this.deviceMesModal = true
    },
    //删除设备
    delDevice(data){
      this.$Modal.confirm({
          title: '',
          content: '确认删除 <span style="color:#f00;">'+data.nickname+'</span> 设备号为 <span style="color:#f00;">'+data.imsi+'</span> 的设备？',
          class:"vertical-center-modal",
          onOk: () => {
            this.axios({
              headers: {
                'token': JSON.parse(localStorage.getItem('userMes')).token
              },
              method: 'get',
              url: 'device/deleteDeviceById',
              params: {
                id: data.id
              }
            }).then(res => {
              // console.log(res)
              let data=res.data
              if(data.resultFlag){
                this.$Message.info('成功！！');
                this.changePageNumber(this.pageNumber)
              }else{
                this.$Message.error('失败！！'+data.message);
              }
            }).catch((e) => {
              this.$Notice.error({
                title: '错误',
                desc: '删除设备时服务出错',
              });
            })
          },
          // onCancel: () => {
          //     this.$Message.info('Clicked cancel');
          // }
      });
    },
    //添加手机号按钮 执行
    addTels(ownerSafety) {


      let length=this.deviceMesFrom[ownerSafety].length
      // console.log(length)
      this.deviceMesFrom[ownerSafety].push({
        value: '',
        index: length+1,
        status: 1
      });
      this.telDelShow(ownerSafety)
      // console.log(this.deviceMesFrom[ownerSafety])
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)

    },
    //删除手机号按钮 执行
    removeTels(index,ownerSafety) {
      this.deviceMesFrom[ownerSafety][index].status = 0;
      setTimeout(() => {
        this.deviceMesModalScroll.refresh();
      }, 100)
      this.telDelShow(ownerSafety)
      // console.log(this.deviceMesFrom[ownerSafety])
    },
    //新增删除手机号时 判断删除手机号按钮显示与否
    telDelShow(ownerSafety){
      let tel = []
      for (let i = 0; i < this.deviceMesFrom[ownerSafety].length; i++) {
        if (this.deviceMesFrom[ownerSafety][i].status == '1') {
          tel.push(this.deviceMesFrom[ownerSafety][i])
        }
      }
      // console.log(tel.length)
      for (let i = 0; i < tel.length; i++) {
        if (tel.length > 1) {
          this.deviceMesFrom[ownerSafety+'DelBtnShow'] = true;
        } else {
          this.deviceMesFrom[ownerSafety+'DelBtnShow'] = false
        }
      }
    },
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber ? pageNumber : 1;
      this.axios({
        method: 'get',
        url: 'device/listAllDevice',
        params: {
          pageSize: this.pageSize,
          pageIndex: this.pageNumber,
          status:this.deviceQueryForm.status,
          nickname: this.deviceQueryForm.name,
          imsi: this.deviceQueryForm.imsi,
          address: this.deviceQueryForm.address,
          sid: this.deviceQueryForm.areaStreet[1]
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

  },
  created() {
    let ycData=new Promise((resolve) => {
      this.axios.get('region/countyAndStreet', {
          params: {
            id: 1000
          }
        })
        .then(res => {
          let data = res.data
          if (data.resultFlag) {
            console.log('盐城',data)
            this.ycAreaData = data.data
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
    }).then(res => res)
    let njData=new Promise((resolve) => {
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
    }).then(res => res)
    Promise.all([ycData, njData]).then(([ycAreaData,njAreaData]) => {
      console.log(njAreaData)
      this.njAreaData = njAreaData;
      function datass(data){
        let sdata = [];
        data.map((item) => {
          let obj = {};
          obj.value = item.id;
          obj.label = item.county;
          let subobj = [];
          if (item.street.length != 0) {
            item.street.map((items) => {
              let obj = {};
              obj.value = items.id;
              obj.label = items.street;
              subobj.push(obj);
            });
            obj.children = subobj;
          }
          sdata.push(obj);
        })
        return sdata
      }

      this.deviceMesFrom.addressData[1].children = datass(ycAreaData)

      this.deviceQueryForm.areaStreetData = datass(njAreaData)
      this.deviceMesFrom.addressData[0].children = datass(njAreaData)
      this.changePageNumber();
      // this.njAreaData = njAreaData;
      // this.ycAreaData = ycAreaData;
      // this.initBMap()
    })
    // new Promise((resolve) => {

    //   this.axios.get('region/countyAndStreet', {
    //       params: {
    //         id: 830
    //       }
    //     })
    //     .then(res => {
    //       let data = res.data
    //       if (data.resultFlag) {
    //         console.log('南京',data.data)
    //         resolve(data.data)
    //
    //       } else {
    //         this.$Notice.error({
    //           title: '错误',
    //           desc: '获取区域数据时出错',
    //         });
    //       }
    //     }).catch((e) => {
    //       this.$Notice.error({
    //         title: '错误',
    //         desc: '获取区域数据时服务出错',
    //       });
    //     })
    // }).then((data) => {
    //   this.njAreaData = data;
    //   let areaStreet = [];
    //   data.map((item) => {
    //     let obj = {};
    //     obj.value = item.id;
    //     obj.label = item.county;
    //     let subobj = [];
    //     if (item.street.length != 0) {
    //       item.street.map((items) => {
    //         let obj = {};
    //         obj.value = items.id;
    //         obj.label = items.street;
    //         subobj.push(obj);
    //       });
    //       obj.children = subobj;
    //     }
    //     areaStreet.push(obj);
    //   })
    //   this.deviceQueryForm.areaStreetData = areaStreet;
    //   this.deviceMesFrom.addressData[0].children = areaStreet;
    //   this.changePageNumber();
    // })
  }
}
</script>
