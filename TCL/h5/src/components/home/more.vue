<template>
    <div class="container" v-infinite-scroll="load_more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="recommended">
            <h1>{{recommended_category_name}}</h1>
            <div class="recommended_resources">
                <div v-for="resource of recommended_resources">
                    <div class="resources">
                        <img :src=resource.cover_url_large :onerror="cover_default"
                             @click="load_page_home_play(resource,resource.track_title)"
                             v-if="resource.resource_type==='single'">
                        <img :src=resource.cover_url_large :onerror="cover_default"
                             @click="load_page_home_album_details(resource.album_id,resource.source,resource.album_title)"
                             v-else>
                        <span class="play" @click="load_page_home_play(resource,resource.track_title)"
                              v-if="resource.resource_type==='single'"></span>
                    </div>
                    <p class="track_or_album_title" v-if="resource.resource_type==='single'">
                        {{resource.track_title}}</p>
                    <p class="track_or_album_title" v-else>{{resource.album_title}}</p>
                    <p class="author">{{resource.author}}</p>
                </div>
            </div>
        </div>
        <div class="others">
            <h1>{{others_category_name}}</h1>
            <div class="others_resources">
                <div v-for="resource of others_resources">
                    <div class="resources">
                        <img :src=resource.cover_url_large :onerror="cover_default"
                             @click="load_page_home_play(resource,resource.track_title)"
                             v-if="resource.resource_type==='single'">
                        <img :src=resource.cover_url_large :onerror="cover_default"
                             @click="load_page_home_album_details(resource.album_id,resource.source,resource.album_title)"
                             v-else>
                        <span class="play" @click="load_page_home_play(resource,resource.track_title)"
                              v-if="resource.resource_type==='single'"></span>
                    </div>
                    <p class="track_or_album_title" v-if="resource.resource_type==='single'">
                        {{resource.track_title}}</p>
                    <p class="track_or_album_title" v-else>{{resource.album_title}}</p>
                    <p class="author">{{resource.author}}</p>
                </div>
                <load-more v-show="show_is_loading" :tip="$t('home.loading')"></load-more>
                <load-more v-show="show_to_bottom" :show-loading="false" :tip="$t('home.ending')"
                           class="to_bottom"></load-more>
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
                categoryid: "",//分类id
                recommended_page: 1,//精选的页码
                recommended_page_size: 3,//精选的页大小
                recommended_category_name: '',//精选名
                recommended_resources: [],//精选资源
                other_page: 1,//非精选的页码
                other_page_size: 8,//非精选的页大小
                others_category_name: '',//非精选名
                others_resources: [],//非精选资源
                busy: true,//禁用无限滚动
                show_is_loading: false,//是否显示正在加载图标
                show_to_bottom: false,//是否显示到底提示
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.categoryid = this.$route.query.category_id;
            this.get_data(this.recommended_page, this.recommended_page_size, "recommended");
            this.get_data(this.other_page, this.other_page_size, "others");
        },
        methods: {
            get_data(page, page_size, type) {//获取更多页内容
                this.axios.get(`/api/app/v1/user/resource/categories/${this.categoryid}/${type}`, {
                    params: {
                        page: page,
                        page_size: page_size,
                    }
                })
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg=true;
                        }
                        else {
                            if (type == "recommended") {//精选
                                this.recommended_category_name = res.data.data.categories.category_name;
                                this.recommended_resources = res.data.data.categories.resources;
                            }
                            else {//其他（非精选）
                                this.others_category_name = res.data.data.categories.category_name;
                                this.others_resources = this.others_resources.concat(res.data.data.categories.resources); //上拉加载更多时需要把返回数据和已有数据做连接（concat()连接两个数组）
                                this.show_is_loading = false;//本页内容获取完毕，隐藏加载图标
                                this.busy = false;//打开无限滚动，此时可以上拉加载更多
                                if (page * page_size > res.data.data.categories.total) {//如果是最后一页就不能加载更多了
                                    this.busy = true;//禁用无限滚动
                                    this.show_to_bottom = true;//显示到底提示
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            load_more() {//加载更多，当this.busy = false的时候上拉就会触发该方法
                this.busy=true;//正在加载更多的时候关闭无限滚动，不能再次上拉加载更多
                this.show_is_loading = true;//显示加载图标
                this.other_page++;//上拉一次页数+1
                this.get_data(this.other_page, this.other_page_size, "others");//获取本页内容
            },
        },
    }
</script>

<style scoped>
    h1 {
        margin: 20px 0px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
    }

    .recommended_resources {
        display: flex;
    }

    .recommended_resources > div {
        margin-right: 9px;
    }

    .recommended_resources > div:last-child {
        margin-right: 0px;
    }

    .others {
        margin-top: 30px;
    }

    .others_resources {
        overflow: hidden;
    }

    .others_resources > div {
        float: left;
        margin-right: 9px;
    }

    .others_resources > div:nth-child(2n+1) {
        margin-right: 9px;
    }

    .others_resources > div:nth-child(2n) {
        margin-right: 0px;
    }

    .others_resources > div:nth-child(n+3) {
        margin-top: 30px;
    }

    .resources {
        display: flex;
        position: relative;
    }

    .recommended_resources img {
        width: 224px;
        height: 224px;
    }

    .others_resources img {
        width: 340px;
        height: 340px;
    }

    .play {
        width: 43px;
        height: 43px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: url("../../assets/image/play.png") no-repeat;
        background-size: 43px 43px;
    }

    .to_bottom {
        margin-bottom: 0px;
    }
</style>