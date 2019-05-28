<template>
    <div>
      <div ref="mumu">
        {{text}}
      </div>
      -------这个是修改组件内部的元素-------:<br/>
      <FilterEvent ref="nnn"></FilterEvent>
      -------这个是修改组件的根div-------:<br>
      <HelloWorld ref="hello"></HelloWorld>
    </div>
</template>

<script>import FilterEvent from './FilterEvent'
import HelloWorld from './HelloWorld'
export default {
  name: 'DomOperation',
  components: {HelloWorld, FilterEvent},
  data () {
    return {
      text: '你好'
    }
  },
  mounted: function () {
    this.$refs.mumu.innerHTML = '你是谁啊'
    this.$refs.nnn.$refs.filterInput.value = '就是搞事情'
    this.$refs.hello.$el.innerHTML = '就是一个字，帅'
  }
}
</script>

<style scoped>

</style>
