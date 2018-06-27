<template>
  <div id="base-use1">
    <h3>我是父组件传过来的值:{{hello}}</h3>
    <div v-bind:class="isRed ? 'red':'yellow'"> 颜色变化</div>
    <div :class="{'red':true,'big':true}">多个class</div>
    <ul>
      遍历数组<hr/>
      <li v-for="(stu,index) in stus" :key="index" :class="{'A':'red','B':'yellow'}[stu.core]">
        {{stu.name}}
        <button @click="del(index)">删除</button>
      </li>
      遍历对象<hr/>
      <li v-for="(value,key,index) in person" :key="key" :class="'yellow'">
        value:{{value}},
        key:{{key}},
        index:{{index}}
      </li>
    </ul>
    <button v-on:click="isRed=!isRed">点我颜色变化</button><br>
    请输入学生名字:<input type="text" v-model="name"/><br>
    请输入学生分数:<input type="text" v-model="core"/><br>
    <button @click="add">添加学生</button>
  </div>
</template>

<script>export default {
  name: 'BaseUse1',
  data () {
    return {
      isRed: false,
      text: 'ddd',
      list: ['小明', '小华'],
      name: '',
      core: '',
      stus: [{name: 'jack', core: 'A'}, {name: 'tom', core: 'B'}],
      person: {name: '这周', age: '18', address: '周口店'}
    }
  },
  methods: {
    add () {
      this.stus.push({name: this.name, core: this.core})
      this.isRed = !this.isRed
      this.name = this.core = ''
    },
    del (index) {
      this.stus.splice(index, 1)
    }
  },
  props: ['hello']
}
</script>

<style scoped>
  .red {
    background-color: red;
  }

  .yellow {
    background-color: yellow;
  }

  .big {
    font-size: xx-large;
  }

</style>
