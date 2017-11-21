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

.ivu-form.ivu-form-label-right.ivu-form-inline {
    margin-left: 30px;
    margin-top: 20px;
}
</style>
<template lang="html">

  <Row class="deviceList">
    <Col class="deviceCon" span="18">
        <Form ref="formInline"  :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="设备名">
                </Input>
            </FormItem>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.password" placeholder="设备号">
                </Input>
            </FormItem>
            <FormItem>
                <Cascader :data="streets" v-model="streetId" placeholder="区/街道"></Cascader>

            </FormItem>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.password" placeholder="详细地址">
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">
                <Icon type="search"></Icon>查询</Button>
            </FormItem>
        </Form>
      <Table border :columns="column" :data="tableData"></Table>
      <Page :total="total" placement="top" :page-size="pageSize" @on-change="changePageNumber" @on-page-size-change="changePageSize" show-total show-sizer></Page>
    </Col>
  </Row>
</template>

<script>
    import Qs from 'qs'

    export default {
        name: 'deviceList',
        data() {
            return {
                streetId: '',
                model1: '',
                streets:[],
                formInline: {
                    user: '',
                    password: ''
                },
                pageNumber: 1, //当前页数
                pageSize: 10, //页大小
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
                        title: '手机号',
                        key: 'telnumber',
                        width: 210,
                        align: 'center',
                        render: (h, params) => {
                            let tagArr = []
                            if (params.row.telnumber) {
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
        watch: {},
        mounted() {
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
                            if (this.tableData[i].aid == items.id) {
                                address += '江苏省 南京市 ' + items.county;
                                for (let j = 0; j < items.street.length; j++) {
                                    if (this.tableData[i].sid == items.street[j].id) {
                                        address += ' ' + items.street[j].street;
                                        this.$set(this.tableData[i], 'address', address + ' ' + this.tableData[i].address);
                                    }
                                }
                            }
                        })


                        this.axios('device/belong', {
                            params: {
                                did: this.tableData[i].id
                            }
                        }).then(resp => {
                            if (resp.data.resultFlag == false) {
//                                this.$Notice.error({
//                                    title: '错误',
//                                    desc: '用户查找失败',
//                                });
                            }
                            if (resp.data.found == true) {
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
                this.pageSize = pageSize;
                this.changePageNumber();
            },
            handleSubmit(name) {
            }
        },
        computed: {},
        created() {
            new Promise((resolve) => {
                this.axios.get('region/countyAndStreet', {params: {id: 830}})
                    .then(res => {
                        let data = res.data
                        console.log(data.data)
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
                let streets=[];
                data.map((item)=>{
                    let obj={};
                    obj.value=item.id;
                    obj.label=item.county;
                    let subobj=[];
                    item.street.map((items)=>{
                        let obj={};
                        obj.value=items.id;
                        obj.label=items.street;
                        subobj.push(obj);
                    });
                    obj.children=subobj;
                    streets.push(obj);
                })
                this.streets=streets;
                this.changePageNumber();
            })
        }
    }
</script>
