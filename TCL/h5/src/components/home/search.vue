<!--PC端调试url： http://localhost:8080/#/home/search  -->
<template>
    <div class="container">
        <div style="position: relative">
            <i></i>
            <input class="search_bar" type="search" :placeholder="tip" v-model="search_key"
                   @keyup.enter="load_page_home_search_result(search_key)">
            <span class="cancel" @click="native.goBack()">{{$t("home.cancel")}}</span>
        </div>
        <div class="hot_key">
            <div>{{$t("home.hot_search")}}</div>
            <ul>
                <li v-for="hot_key of hot_keys" @click="load_page_home_search_result(hot_key.k)">
                    {{hot_key.k}}
                </li>
            </ul>
        </div>
        <confirm v-model="show_error_msg" :title="error_msg" :hide-on-blur="true"
                 :show-cancel-button="false">
        </confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tip: this.$t("home.tip"),//搜索框提示文字
                search_key: '',//保存用户输入的搜索关键词
                hot_keys: [{k: '周杰伦'}, {k: '摩登兄弟'}, {k: '光年之外'}, {k: '一百万个可能'}, {k: '儿童故事'}, {k: '少儿英语'}, {k: '童话故事'}, {k: '养生精选'}, {k: '探险解谜'},],//搜索热词推荐
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.get_hot_keys();
        },
        methods: {
            get_hot_keys() {
                //调用后台接口获取热门搜索词
                // this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                // this.show_error_msg=true;
            },
        },
    }
</script>

<style scoped>
    i {
        background-image: url("../../assets/image/search.png");
        background-repeat: no-repeat;
        background-position: 35px 15px;
        background-size: 37px 37px;
        position: absolute;
        width: 100px;
        height: 66px;
    }

    .hot_key div {
        margin-top: 40px;
        margin-bottom: 30px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        font-weight: bold;
        color: #333333;
    }

    .hot_key li {
        padding: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        display: inline-block; /*li横向排列*/
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
        border: 1Px solid #dddddd;
        border-radius: 33px;
        word-break: keep-all;
    }
</style>
