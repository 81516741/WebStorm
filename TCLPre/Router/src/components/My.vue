<template>
    <div>my传递query</div>
</template>

<script>export default {
  name: 'My',
  mounted () {
    console.log(this.$route.query.name)
  }
}
</script>

<style scoped>
  div{
    background-color: lightcoral;
    height: 100px;
  }
</style>
