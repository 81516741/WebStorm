<template>
    <div class="container" v-infinite-scroll="load_more" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="category_name">{{search_type==='single'?$t("home.song"):$t("home.album")}}</div>
        <ul>
            <li class="track_or_album_resource" v-for="resource of resources"
                @click="search_type==='single' ? play(resource) : look_album_details(resource)">
                <img :src="resource.cover_url_large" :onerror="cover_default">
                <span v-if="search_type==='single'"></span>
                <div>
                    <p class="track_or_album_title" v-if="search_type==='single'">
                        {{resource.track_title}}</p>
                    <p class="track_or_album_title" v-else>{{resource.album_title}}</p>
                    <p class="author">{{resource.author?resource.author:$t("home.no_author")}}</p>
                </div>
            </li>
            <load-more v-show="show_is_loading" :tip="$t('home.loading')"></load-more>
            <load-more v-show="show_to_bottom" :show-loading="false" :tip="$t('home.ending')"
                       class="to_bottom"></load-more>
        </ul>
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
                search_key: '',//搜索关键词
                source: '',//搜索来源
                search_type: '',//搜索类型（single or album）
                page: 1,//搜索结果的页码
                page_size: 12,//搜索结果的页大小
                total: '',//结果总数
                resources: [],//搜索到的资源（single or album）
                busy: true,//禁用无限滚动
                show_is_loading: false,//是否显示正在加载图标
                show_to_bottom: false,//是否显示到底提示
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.search_key = this.$route.query.search_key;
            this.source = this.$route.query.source;
            this.search_type = this.$route.query.search_type;
            this.search(this.page, this.page_size, this.search_key, this.source, this.search_type);
        },
        methods: {
            search(page, page_size, search_key, source, search_type) {//搜索
                this.axios.get(`api/app/v1/user/resource/search`, {
                    params: {
                        page: page,
                        page_size: page_size,
                        search_key: search_key,
                        source: source,
                        search_type: search_type
                    }
                })
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg=true;
                        } else {
                            if (search_type === 'single') {//搜索单曲
                                this.resources = this.resources.concat(res.data.data.track_resources);
                                this.total = res.data.data.track_total;
                            } else {//搜索专辑
                                this.resources = this.resources.concat(res.data.data.album_resources);
                                this.total = res.data.data.album_total;
                            }
                            this.show_is_loading = false;//隐藏加载图标
                            this.busy = false;//打开无限滚动
                            if (page * page_size > this.total) {//如果是最后一页就不能加载更多了
                                this.busy = true;//禁用无限滚动
                                this.show_to_bottom = true;//显示到底提示
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            load_more() {//加载更多，当this.busy = false的时候上拉就会触发该方法
                this.busy = true;//正在加载更多的时候关闭无限滚动
                this.show_is_loading = true;//显示加载图标
                this.page++;//上拉一次页数+1
                this.search(this.page, this.page_size, this.search_key, this.source, this.search_type);//显示本页的搜索结果
            },
            play(track_resource){//播放
                track_resource.source=this.source;
                track_resource.resource_type='single';
                this.load_page_home_play(track_resource,track_resource.track_title)
            },
            look_album_details(album_resource){//进入专辑详情页
                album_resource.source=this.source;
                this.load_page_home_album_details(album_resource.album_id,album_resource.source,album_resource.album_title)
            },
        }
    }
</script>

<style scoped>
    .category_name {
        padding-top: 30px;
        padding-bottom: 10px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
    }

    .track_or_album_resource {
        position: relative;
        padding-top: 10px;
        height: 120px;
        vertical-align: middle;
        border-bottom: 1Px solid #dddddd;
    }

    .track_or_album_resource img {
        width: 100px;
        height: 100px;
    }

    .track_or_album_resource span {
        width: 43px;
        height: 43px;
        position: absolute;
        top: 39px;
        left: 28px;
        background: url("../../assets/image/play.png") no-repeat;
        background-size: 43px 43px;
    }

    .track_or_album_resource div {
        width: 567px;
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
    }

    .track_or_album_title {
        margin-bottom: 10px;
        font-size: 30px;
    }
</style>