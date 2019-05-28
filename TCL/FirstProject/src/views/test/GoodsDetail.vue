<template>
    <div>这里是商品详情<br/>
      <span>商品ID:{{$route.query.goodsID}}</span>
      <span>商品ID:{{$route.params.goodsID}}</span>
    </div>
</template>

<script>
export default {
  name: 'GoodsDetail'
}
</script>

<style scoped>

</style>
