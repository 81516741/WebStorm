<template>
  <div class="hello">
    {{nickName}}
    {{num}}
    <button @click="changeName">点击</button>
    <button @click="changeName1">点击</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['nickName','cartCount']),
    // nickName(){
    //       return this.$store.state.nickName;
    //     },
    // cartCount() {
    //   return this.$store.state.cartCount;
    // },
    num() {
      return this.$store.state.a.num;
    }
  },
  methods:{
    changeName() {
      this.$store.commit('updateUserInfo','明明')
      this.$store.commit('changeNum','好帅')
    },
    changeName1() {
      console.log('nimei')
      this.$store.dispatch('updateUserInfo','大明')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
