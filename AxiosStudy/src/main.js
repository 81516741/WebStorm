// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
import ModuleA from './moudles/MoudleA'

Axios.defaults.baseURL = 'https://hzmb.withbtc.cn/'
Axios.defaults.headers = {
  accept: 'defaults'
}
Axios.interceptors.request.use(function (config) {
  // config.headers.accept = 'interceptors' 这个是追加
  config.headers = {
    accept: 'interceptors'
  }
  return config
})
Vue.prototype.$axios = Axios
Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    A: ModuleA
  }
})

// let store = new Vuex.Store({
//   state: {
//     num: 1
//   },
//   mutations: {
//     add (state, obj) {
//       console.log(obj.num)
//       state.num++
//     },
//     sub (state) {
//       state.num--
//     }
//   },
//   actions: {
//     addAct (store, obj) {
//       store.commit('add', obj)
//     },
//     subAct ({commit}) {
//       commit('sub')
//     }
//   },
//   getters: {
//     getNums (state) {
//       return state.num
//     }
//   }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
