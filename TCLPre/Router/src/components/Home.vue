<template>
    <div>home传递params</div>
</template>

<script>export default {
  name: 'Home',
  mounted () {
    console.log(this.$route.params.name)
  }
}
</script>

<style scoped>
div{
  background-color: lightblue;
  height: 100px;
}
</style>
