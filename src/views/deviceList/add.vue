<template>
<div style="margin-left:300px; margin-right:auto;
	 width: 1000px;
    position: absolute;
    top: 60px;
    bottom: 0;">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="设备名称">
            <Input v-model="formValidate.name" placeholder="请输入设备名称"></Input>
        </FormItem>
        <FormItem label="设备号" prop="num">
            <Input v-model="formValidate.number" placeholder="请输入设备号"></Input>
        </FormItem>
        <FormItem label="预警电话" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入预警电话"></Input>
        </FormItem>
        <FormItem label="区" prop="country">
            <Select v-model="formValidate.country" placeholder="选择所在区">
                <Option value="822">玄武区</Option>
                <Option value="823">秦淮区</Option>
                <Option value="824">建邺区</Option>
                <Option value="825">鼓楼区</Option>
                <Option value="826">浦口区</Option>
                <Option value="827">栖霞区</Option>
                <Option value="828">雨花台区</Option>
                <Option value="829">江宁区</Option>
                <Option value="830">六合区</Option>
                <Option value="831">溧水区</Option>
                <Option value="832">高淳区</Option>
            </Select>
        </FormItem>
        <FormItem label="街道" prop="street">
            <Select v-model="formValidate.street" placeholder="选择所在街道">
                <Option value="beijing">请先选择区</Option>
                <Option value="shanghai">London</Option>
            </Select>
        </FormItem>

        <FormItem label="设备状态" prop="status">
            <RadioGroup v-model="formValidate.status">
                <Radio label="1">启用</Radio>
                <Radio label="0">禁用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="设备类型" prop="type">
            <RadioGroup v-model="formValidate.type">
                <Radio label="0">个人</Radio>
                <Radio label="1">饭店</Radio>
                <Radio label="2">公司</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="具体地址" prop="address">
            <Input v-model="formValidate.desc" placeholder="请输入具体地址"></Input>
        </FormItem>
        <FormItem label="经纬度">
            X:<input v-model="formValidate.x" placeholder="请输入经度"></input>
            Y:<input v-model="formValidate.y" placeholder="请输入纬度"></input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">新增</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    number: '',
                    tel: '',
                    city: '',
                    street: '',
                    status: '',
                    type: '',
                    desc: '',
					x: '',
                    y: ''
                },
                ruleValidate: {
                    num: [
                        { required: true, message: '设备号不能为空', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '预警电话不能为空', trigger: 'change' }
                    ],
                    country: [
                        { required: true, message: '请选择区', trigger: 'blur' }
                    ],
                    street: [
                        { required: true, message: '请选择街道', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ]

                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>    

<!--    
<script>
    export default {
        
    data() {
   		return {
        area: [],
                 data: [{
                    value: 'nanjing',
                    label: '南京',
                    children: [
                        {
                            value: 'gugong',
                            label: '区1',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                                
                            ]
                        },
                        {
                            value: 'tiantan',
                            label: '区2',
                            children: [
                             	 {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                             	{
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                       	{
                            value: 'tiantan',
                            label: '区3',
                            children: [
                             	 {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                             	{
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                    ] 
                }]
    		}
   		}
    }
</script>
-->
