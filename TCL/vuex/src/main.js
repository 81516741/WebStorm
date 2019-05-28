// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex);

const moduleA = {
  state:{
    num:'今天'
  },
  mutations:{
    changeNum(state,num) {
      state.num = num
    }
  }
}

const store = new Vuex.Store({
  state: {
    nickName:'小明',
    cartCount:100
  },
  getter: {
    userName(state){
      return state.nickName + "你好"
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
  },
  actions: {
    updateUserInfo(context,cartCount) {
      context.commit("updateUserInfo",cartCount);
    }
  },
  modules: {
    a:moduleA
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
