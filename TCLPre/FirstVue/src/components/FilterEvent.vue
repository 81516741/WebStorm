<template>
    <div>
      请输入值:<input ref="filterInput" type="text" v-model="text"/><br/>
      反转的结果:{{text | reverse}} {{text | helloFilter}}
    </div>
</template>

<script>export default {
  name: 'FilterEvent',
  data () {
    return {
      text: '1'
    }
  },
  filters: {
    reverse: function (value) {
      return value.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>

</style>
