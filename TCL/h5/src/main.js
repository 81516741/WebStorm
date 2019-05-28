import Vue from 'vue' //引入vue模块
import App from './App' //引入vue组件
import router from './router' //引入路由配置文件
import axios from './https/http' //引入axios插件处理网络请求
import qs from 'qs' //引入qs库实现url和对象互转
import FastClick from 'fastclick' //添加Fastclick移除移动端点击延迟
import infiniteScroll from 'vue-infinite-scroll'//引入vue-infinite-scroll插件
import {Tab, TabItem, Swiper, TransferDom, Popup, LoadMore, Timeline, TimelineItem, Confirm, DatetimeView,Swipeout,SwipeoutItem,SwipeoutButton} from 'vux'//引入vux部分组件
import i18n from './script/i18n'  //多语言
import page_loader from './script/page_loader' //引入全局函数实现跳转页面的封装
import audio from './script/audio_player' //引入封装好的播放audio类
import native from './script/native' //封装android native对象和方法
import './assets/style/common.css' //引入全局css
import 'lib-flexible' //引入flexible实现移动端适配
import 'babel-polyfill'//引入babel-polyfill来解决低版本安卓手机不支持es6新特性的兼容性问题
import Vconsole from 'vconsole'
import test from './components/home/test'

Vue.component('test',test);
Vue.use(page_loader);//插件或库没有install函数的就直接使用Vue.prototype给实例添加属性即可，否则就必须使用Vue.use()加载方式
Vue.use(infiniteScroll);//vue官方插件或库支持Vue.use()加载方式
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('swiper', Swiper);
Vue.directive('transfer-dom', TransferDom);//https://doc.vux.li/zh-CN/directives/v-transfer-dom.html
Vue.component('popup', Popup);
Vue.component('load-more', LoadMore);
Vue.component('timeline', Timeline);
Vue.component('timeline-item', TimelineItem);
Vue.component('confirm', Confirm);
Vue.component('datetime-view', DatetimeView);
Vue.component('swipeout', Swipeout);
Vue.component('swipeout-item', SwipeoutItem);
Vue.component('swipeout-button', SwipeoutButton);

Vue.config.productionTip = false;//关闭生产模式下给出的提示
Vue.prototype.axios = axios;//axios插件中没有install函数，故使用Vue.prototype来加载插件
Vue.prototype.qs = qs;
Vue.prototype.audio = audio;
Vue.prototype.native = native;

axios.defaults.headers['Authorization'] = native.getToken();
FastClick.attach(document.body);
const vConsole = new Vconsole();
Vue.use(vConsole)
new Vue({ //创建一个 Vue 的根实例
    el: '#nimei', //挂载id,这个实例下所有的内容都会在index.html 一个id为app的div下显示
    router, // 注入路由配置
    i18n, //注入多语言
    components: {App}, //注入根组件
    template: '<App/>',//配置根模板 即打开页面显示那个组件
})
