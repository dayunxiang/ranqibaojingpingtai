const routers = [
  {
    path:'/login',
    meta: {
        title: '登陆'
    },
    component: (resolve) => require(['./views/login/login.vue'], resolve)
  },
  {
    path: '/',
    meta: {
        title: '燃气报警平台'
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
        component: (resolve) => require(['./views/map/Map1.vue'], resolve)
      },
      {
        path: 'deviceLog/:id',
        name:'deviceLog',
        meta: {
            title: '设备报警记录'
        },
        component: (resolve) => require(['./views/map/DeviceLog.vue'], resolve)
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
      },
      {
        path: 'dataCount',
        name:'dataCount',
        meta: {
            title: '数据统计'
        },
        component: (resolve) => require(['./views/dataCount/DataCount.vue'], resolve)
      },
      {
        path: 'streetAlarmLog/:aid/:sid',
        name:'streetAlarmLog',
        meta: {
            title: '街道报警'
        },
        component: (resolve) => require(['./views/dataCount/StreetAlarmLog.vue'], resolve)
      }
    ]
  }
];
export default routers;
