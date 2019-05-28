<template>
    <div>
      我是局部的
      <div>参数:{{para}}{{item}},绑定属性：{{bindPara}}</div>
      <button @click="clickBtn">点击我</button>
    </div>
</template>

<script>
    export default {
        name: "part",
        props: ['para','bindPara','item'],
        methods:{
          clickBtn(){
            alert('的')
            this.$emit('callBack','回调的参数1','回调的参数2')
          }
        }
    }
</script>

<style scoped>

</style>
