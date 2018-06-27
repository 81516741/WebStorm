// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaseUse1 from './components/BaseUse1'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false

Vue.component('BaseUse1', BaseUse1)
Vue.filter('helloFilter', function (value) {
  return '你好'
})
/* eslint-disable no-new */
new Vue({
  el: '#my-app',
  router,
  components: {App},
  template: '<App/>'
})
/* App写在这里表示局部组件，也可以放在Vue.component那里 */
