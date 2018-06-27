<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view/>-->
    <!--如果是用外部引入moudles则这里那不到num-->
    <input v-model="this.$store.state.num">ddd<br/>
    <input v-model="this.$store.getters['A/getNums']"><br/>
    axios<br/>
    <button @click="click">获取验证码</button><hr><br/>

    <div>watch computer</div>
    <div>watch</div>
    <input v-model="data1"/>
    <div>computer</div>
    <input v-model="num1" style="width: 40px"/> * <input v-model="num2" style="width: 40px"/> * <input v-model="num3" style="width: 40px"/> = {{sum}}
    <hr>
    <div>vuex</div>
    <div>直接commit</div>
    <button @click="addnum">增加</button>
    <button @click="subnum">减少</button><br/><hr>
    action方式<br/>
    <button @click="addaction">增加action</button>
    <button @click="subaction">减少action</button><br/><hr>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      data1: 'data1',
      num1: 1,
      num2: 2,
      num3: 3
    }
  },
  mounted: function () {
    alert(this.$store.state.num)
  },
  methods: {
    click: function () {
      this.$axios.post('admin/user/login', {
        sign: {
          username: 'xiaolizi',
          password: '123456',
          captcha: '443ng'
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    addnum () {
      this.$store.commit('A/add', {num: 588})
    },
    subnum () {
      this.$store.commit('A/sub')
    },
    addaction () {
      this.$store.dispatch('A/addAct', {num: 168})
    },
    subaction () {
      this.$store.dispatch('A/subAct')
    }
  },
  watch: {
    data1: function (newvalue, oldvalue) {
      console.log('新的:' + newvalue + '；' + '旧的:' + oldvalue)
    }
  },
  computed: {
    sum: function () {
      return this.num1 * this.num2 * this.num3
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
</style>
