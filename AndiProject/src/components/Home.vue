<template>
    <div>
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <div @click="click(index)" style="height: 100%; width: 100%">
            <img :src="image" style="height: 100%; width: 100%"/>
          </div>
        </el-carousel-item>
      </el-carousel>
      <el-container>
        <el-header>广州安迪信息技术有限公司</el-header>
        <el-main></el-main>
        <el-footer></el-footer>
      </el-container>
    </div>
</template>

<script>export default {
  name: 'Home',
  data () {
    return {
      images: [require('../assets/11.png'), require('../assets/22.png'), require('../assets/33.png'), require('../assets/11.png'), require('../assets/22.png'), require('../assets/33.png')]
    }
  },
  methods: {
    click: function (index) {
      alert(index)
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 300px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
