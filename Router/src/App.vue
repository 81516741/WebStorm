<template>
  <div id="app">
    <router-link :to="{name:'home',params:{name:'首页'}}">首页</router-link>
    <router-link :to="{name:'other',params:{name:'其他'}}">其他</router-link>
    <router-link :to="{name:'my',query:{name:'我的'}}">我的</router-link>
    <router-link :to="{name:'duo'}">多视图</router-link>
    <router-link :to="{name:'other_oumei'}">other_oumei</router-link>
    <br/> 编程导航<hr>
    <button @click="gotohome">首页</button>
    <button @click="gotoother">其他</button>
    <button @click="gotomy">我的</button>
    <button @click="forword">前进</button><button @click="back">后退</button>
    <router-view/>
    <br/> 多视图<hr>
    <router-view name="home"></router-view>
    <router-view name="my"></router-view>
    <router-view name="other"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    gotohome () {
      this.$router.push({name: 'home', params: {name: '首页'}})
    },
    gotoother () {
      this.$router.push({name: 'other', params: {name: '其他'}})
    },
    gotomy () {
      this.$router.push({name: 'my', query: {name: '我的'}})
    },
    forword () {
      console.log('前进')
      this.$router.go(1)
    },
    back () {
      console.log('后退')
      this.$router.go(-1)
    }
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
}

button {
  background-color: lightblue;
}
</style>
