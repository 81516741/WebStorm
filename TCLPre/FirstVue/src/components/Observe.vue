<template>
    <div>
      我是子组件<button @click="emit">发送</button>
    </div>
</template>

<script>import myBlock from './MyBlock'
export default {
  name: 'Observe',
  methods: {
    emit () {
      myBlock.$emit('phone', '这个是子组件传递的参数')
    }
  }
}
</script>

<style scoped>
div {
  background-color: #5E740B;
  height: 100px;
}
button {
  background-color: yellow;
}
</style>
