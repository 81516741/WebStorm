<template>
  <div class="view-more-normal"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="20">
    <img src="./../assets/loading-spinning-bubbles.svg">
  </div>
</template>

<script>
  import '../assets/css/base.css'
    export default {
      name: "LoadMore",
      methods:{
          loadMore(){
            this.$emit('loadMore');
          }
      },
      props:['busy']
    }
</script>

<style scoped>

</style>
