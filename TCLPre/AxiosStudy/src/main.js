// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Vuex from 'vuex'
import ModuleA from './moudles/MoudleA'

Axios.defaults.baseURL = 'http://service.tunnel.qydev.com/ldapp'
Axios.defaults.headers = {
  accept: 'defaults'
}
Axios.interceptors.request.use(
  request => {
    console.log('request拦截器打印:' + '收到正确的request')
    return request
  },
  error => {
    console.log('request拦截器打印:' + '收到错误的request')
    if (error.request) {
      console(error)
    }
    return Promise.reject(error.request.data)
  })

Axios.interceptors.response.use(
  response => {
    console.log('response拦截器打印:' + '收到正确的response')
    return response
  },
  error => {
    console.log('response拦截器打印:' + '收到错误的response')
    if (error.response) {
      console('response拦截器打印:' + error)
    }
    return Promise.reject(error.response.data)
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
