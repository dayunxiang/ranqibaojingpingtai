import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';



import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import 'babel-polyfill';

axios.defaults.baseURL = 'http://61.147.166.206:8959/ga/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios=axios;
Vue.use(VueRouter);


Vue.use(iView);



// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers,
    linkActiveClass:''
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    // let loginStatus=localStorage.getItem('loginStatus');
    // if(loginStatus){
    //   let nowTime=new Date().getTime();
    //
    //   if(nowTime-loginStatus>=3600000*24*5){//3600000一个小时
    //     localStorage.removeItem('loginStatus');
    //     router.push('/login');
    //   }
    // }else{
    //   localStorage.removeItem('loginStatus');
    //   router.push('/login');
    // }
    window.scrollTo(0, 0);
});



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});


if (module.hot) {
  module.hot.accept();
}
