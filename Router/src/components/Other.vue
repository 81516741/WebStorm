<template>
    <div>Other传递params
      <router-link :to="{name:'other_guochan'}">国产</router-link>
      <router-link :to="{name:'other_oumei'}">欧美</router-link>
      <router-view></router-view>
    </div>

</template>

<script>export default {
  name: 'Other',
  mounted () {
    console.log(this.$route.params.name)
  }
}
</script>

<style scoped>
  div{
    background-color: lightsalmon;
    height: 100px;
  }
</style>
