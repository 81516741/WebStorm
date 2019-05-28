<template>
    <div>
        <div class="container">
            <img class="icon_back" @click="native.goBack()" src="../../assets/image/icon_back.png">
            <p class="page_title">{{$t("channel.select_programme_type")}}</p>
        </div>
        <div class="all_programmes">
            <tab>
                <tab-item v-for="(programme_category,index) of programme_categories " :key="index" v-if="index<1"
                          selected
                          @on-item-click="get_programmes(programme_category.programme_category_id)">
                    {{programme_category.programme_category_name}}
                </tab-item>
                <tab-item v-for="(programme_category,index) of programme_categories " :key="index" v-if="index>0"
                          @on-item-click="get_programmes(programme_category.programme_category_id)">
                    {{programme_category.programme_category_name}}
                </tab-item>
            </tab>
            <div class="programmes">
                <ul>
                    <li v-for="programme of programmes">
                        <img :src="programme.programme_icon" :onerror="cover_default">
                        <span>{{programme.programme_name}}</span>
                        <div @click="select_join(programme)">{{$t("channel.select_join")}}</div>
                    </li>
                </ul>
            </div>
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
                cover_default: 'this.src="' + require('../../assets/image/cover_default.png') + '"',//默认占位图
                programme_categories: [],//节目分类
                programmes: [],//节目
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.get_programme_categories();//获取节目分类
        },
        methods: {
            get_programme_categories() {
                this.axios.get(`/api/app/v1/user/resource/programmes/categories`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg=true;
                        } else {
                            this.programme_categories = res.data.data.programme_categories;
                            this.get_programmes(this.programme_categories[0].programme_category_id);//获取该节目分类下的所有节目
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            get_programmes(programme_category_id) {
                this.axios.get(`/api/app/v1/user/resource/programmes/categories/${programme_category_id}`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg=true;
                        } else {
                            this.programmes = res.data.data.programmes;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            select_join(obj) {//选择一个节目加入到自定义频道
                obj.index = JSON.parse(localStorage.programme).index;//取出缓存中programme的index属性（表示要删除的下标）
                obj.play_time = JSON.parse(localStorage.programme).play_time;//取出缓存中的播放时间
                localStorage.programme = JSON.stringify(obj);//将选中的节目信息保存在本地缓存
                this.native.goBack();//调用原生接口返回上一级页面
            },
        }
    }
</script>

<style scoped>

    .all_programmes {
        margin-top: 30px;
    }

    .programmes {
        margin: 5px 30px 0;
    }

    .programmes li {
        padding-top: 26px;
        height: 120px;
        border-bottom: 1Px solid #dddddd;
    }

    .programmes img {
        width: 71px;
        height: 70px;
        margin-right: 20px;
        border-radius: 50%;
    }

    .programmes div {
        float: right;
        text-align: center;
        display: inline-block;
        margin-top: 5px;
        padding: 8px;
        width: 174px;
        height: 60px;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #333333;
        border: 1Px solid #dddddd;
        border-radius: 29px;
    }
</style>