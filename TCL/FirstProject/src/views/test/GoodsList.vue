<template>
    <div>
      我是商品首页<br/>
      <span>{{$route.params.user}}</span>
      <router-link to="/test/title">title</router-link>
      <router-link to="/test/image">image</router-link>
      <div>
        <router-view></router-view>
      </div>
      <router-link to="/goodsDetail">这是routerLink跳转</router-link>
      <router-link :to="{name:'goodsDetail',params:{goodsID:888},query:{goodsID:777}}">用名字跳转</router-link>
      <button @click="jumpToGoodsDetailPage">这是button跳转</button>
      <button @click="test">测试js代码</button>
    </div>
</template>

<script>
export default {
  name: 'GoodsList',
  methods: {
    jumpToGoodsDetailPage () {
      this.$router.push({path: '/goodsDetail?goodsID=1234'})
    },
    test () {
      console.log('-------var  let 测试')
      var a = 99
      f()
      console.log(a)
      function f () {
        console.log(a)
        var a = 10
        console.log(a)
      }
      {
        console.log('------')
        console.log(xx)
        var xx = 'var变量'
      }
      console.log('xx是什么' + xx)
      console.log(xx)
      {
        console.log(xx1)
        let xx1 = 'let 变量'
        console.log(xx1)
      }
      console.log('-----------Promise 的用法')
      let getUserInfo = () => {
        return new Promise((resolve, reject) => {
          resolve('获取用户信息成功')
        })
      }
      let getDeviceList = (userID) => {
        console.log('接收到奥用户id' + userID)
        return new Promise((resolve, reject) => {
          resolve('获取设备列表成功')
        })
      }
      getUserInfo().then((res) => {
        return getDeviceList('777')
      }).catch((error) => {
        console.log('获取用户信息失败' + error)
      }).then((res) => {
        console.log('请求完成')
      })
      Promise.all([getUserInfo(), getDeviceList('8888')]).then(([res1,res2]) => {
        console.log(res1)
        console.log(res2)
      })
    }
  }
}
</script>

<style scoped>

</style>
