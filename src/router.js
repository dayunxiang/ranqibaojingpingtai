const routers = [
  {
    path: '/',
    meta: {
        title: ''
    },
    redirect: '/map',
    component: (resolve) => require(['./views/index.vue'], resolve),
    children:[
      {
        path: 'map',
        name:'map',
        meta: {
            title: '实时监控'
        },
        component: (resolve) => require(['./views/map/Map.vue'], resolve)
      },
      {
        path: 'deviceListMain',
        name:'deviceListMain',
        meta: {
            title: '设备列表'
        },
        redirect:'deviceListMain/deviceList',
        component: (resolve) => require(['./views/deviceList/DeviceListMain.vue'], resolve),
        children:[
          {
            path: 'deviceList',
            name:'deviceList',
            meta: {
                title: '设备列表'
            },
            component: (resolve) => require(['./views/deviceList/DeviceList.vue'], resolve)
          },
          {
            path: 'alarmLog',
            name:'alarmLog',
            meta: {
                title: '报警日志'
            },
            component: (resolve) => require(['./views/deviceList/AlarmLog.vue'], resolve)
          }
        ]
      }
    ]
  }
];
export default routers;
