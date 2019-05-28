<template>
    <div>
      <part para="你是个好人" :bindPara="kilometers" @callBack="callBack"></part>
      <part v-for="(item,index) in items" :item="item">{{index}}</part>
      <div>fasdfdsa</div>
      <button>nimei</button>
      <div>{{kilometers}}</div>
      <label v-text="kilometers"/>
      <div v-text="meters"/>
      <div>千米</div><input type="text" v-model="kilometers"/>
      <div>米</div><input type="text" v-model="meters"/>
      <input type="button" @click="change" value="点我"/>
      <div v-bind:class="{active:show}">我、、</div>
    </div>
</template>

<script>
  import part from "./part";
  export default {
    components: {part},
    data() {
      return {
        kilometers: '',
        meters:'',
        show:true,
        siteValue:1,
        items:[{'name':'我爱'},{'name':'我家'}]
      }
    },
    methods:{
      change() {
        console.log('site:' + this.site)
        if (this.site == 2) {
          this.site = 1;
          console.log("改成1")
        }  else {
          this.site = 2;
          console.log("改成2")
        }

      },
      callBack(a,b) {
        alert(a)
        alert(b)
        alert('回调')
      },
      nativeClick(){
        alert('原生')
      }
    },
    computed:{
      site:{
        set:function (newValue) {
          if (newValue == 2) {
            this.show = true
          }  else {
            this.show = false
          }
          console.log(this.show)
          console.log(newValue)
          this.siteValue = newValue

        },
        get:function () {
          return this.siteValue
        }
      }
    },
    watch: {
      kilometers(curVal, oldVal) {
        this.kilometers = curVal
        this.meters = curVal * 1000
      },
      meters(curVal, oldVal) {
        this.kilometers = curVal / 1000
        this.meters = curVal
      }
    }
  }

</script>

<style scoped>
  .active {
    width: 100px;
    height: 100px;
    background: green;
  }
</style>
