<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-link :to="{name:'home'}">去首页</router-link>
    <router-link :to="{name:'other'}">去其他页</router-link>
    <router-view/>
    <hr>基本使用
    <BaseUse1 :hello="text"></BaseUse1>
    <!--通知-->
    <hr>通知
    <Observe></Observe>
    <hr>过滤器
    <FilterEvent></FilterEvent>
    <hr>dom操作
    <DomOperation></DomOperation>
    <button style="background-color: #0b97c4" @click="tipClick">点击</button>
    <mt-switch v-model="value">开关</mt-switch>

  </div>
</template>

<script>
import Observe from './components/Observe'
import myBlock from './components/MyBlock'
import FilterEvent from './components/FilterEvent'
import DomOperation from './components/DomOperation'
export default {
  name: 'App',
  components: {DomOperation, FilterEvent, Observe},
  data () {
    return {
      text: '你好',
      value: true
    }
  },
  methods: {
    // 有点像ios里面的通知
    lis () {
      myBlock.$on('phone', function (name) {
        alert('我是父组件的响应:' + name)
      })
    },
    tipClick () {
    }
  },
  mounted: function () {
    // 页面加载就去监听
    this.lis()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: white;
  height: 200px;
}
</style>
