<!--PC端调试url： http://localhost:8080/#/home  -->
<template>
    <div>
      <div>涅米的</div>
      <test></test>
        <swiper :list="banner_list" :auto=true :loop=true v-model="banner_index"></swiper>
        <div class="container">
            <div class="categories" v-for="category of categories">
                <div class="category_name">{{category.category_name}}
                    <span class="more" @click="load_page_home_more(category.id,category.category_name)">
                      {{$t("home.more")}}
                    </span>
                </div>
                <div class="resource">
                    <div v-for="resource of category.resources">
                        <div class="cover_url_large">
                            <img :src=resource.cover_url_large :onerror="cover_default"
                                 @click="load_page_home_play(resource,resource.track_title)"
                                 v-if="resource.resource_type==='single'">
                            <img :src=resource.cover_url_large :onerror="cover_default"
                                 @click="load_page_home_album_details(resource.album_id,resource.source,resource.album_title)"
                                 v-else>
                            <span v-if="resource.resource_type==='single'"
                                  @click="load_page_home_play(resource,resource.track_title)"></span>
                        </div>
                        <p class="track_or_album_title" v-if="resource.resource_type==='single'">
                            {{resource.track_title}}</p>
                        <p class="track_or_album_title" v-else>{{resource.album_title}}</p>
                        <p class="author">{{resource.author}}</p>
                    </div>
                </div>
            </div>
            <confirm v-model="show_error_msg" :title="error_msg" :hide-on-blur="true"
                     :show-cancel-button="false">
            </confirm>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
            return {
                cover_default: 'this.src="' + require('../../assets/image/cover_default.png') + '"',//默认占位图
                banner_list: [{
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4065109755,117188874&fm=26&gp=0.jpg',
                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=373613226,388450113&fm=26&gp=0.jpg',
                }, {
                    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1515455955,3273033934&fm=26&gp=0.jpg',
                },],
                banner_index: 0,//轮播图的默认index
                categories: [],//存放首页所有分类信息
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            localStorage.removeItem("record_id");//进入首页就会清除缓存-播放记录
            this.get_categories();
        },
        methods: {
            get_categories() { //调用后台接口获取首页内容
                this.axios.get('/api/app/v1/user/resource/categories')
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.categories = res.data.data.categories;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>

<style scoped>
    .categories:first-child {
        margin-top: 20px;
    }

    .categories:nth-child(n+2) {
        margin-top: 30px;
    }

    .category_name {
        margin-bottom: 20px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
    }

    .resource {
        display: flex;
    }

    .resource > div {
        width: 224px;
        margin-right: 9px;
    }

    .resource > div:last-child {
        margin-right: 0px;
    }

    .cover_url_large {
        display: flex;
        position: relative;
        margin-bottom: 20px;
    }

    img {
        width: 224px;
        height: 224px;
    }

    .cover_url_large > span {
        width: 43px;
        height: 43px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: url("../../assets/image/play.png") no-repeat;
        background-size: 43px 43px;
    }
</style>
