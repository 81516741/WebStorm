<template>
    <div>
        <div class="search" style="position: relative">
            <i></i>
            <input class="search_bar" type="search" :placeholder="tip" v-model="search_key"
                   @keyup.enter="search(search_key,current_source)">
            <span class="cancel" @click="native.goBack()">{{$t("home.cancel")}}</span>
        </div>
        <tab>
            <tab-item v-for="(source,index) of sources " :key="index" v-if="index<1" selected
                      @on-item-click="search(search_key,source.source)">
                {{source.source_name}}
            </tab-item>
            <tab-item v-for="(source,index) of sources " :key="index" v-if="index>0"
                      @on-item-click="search(search_key,source.source)">
                {{source.source_name}}
            </tab-item>
        </tab>
        <div class="search_result">
            <div class="category_name" v-show="show_track">{{$t("home.song")}}
                <span class="more" v-show="show_track_more"
                      @click="load_page_home_search_result_more(search_key,current_source,'single',`${$t('home.include')}“${search_key}”${$t('home._song')}`)">{{$t("home.more")}}</span>
            </div>
            <ul>
                <li class="track_or_album_resource" v-for="track_resource of track_resources"
                    @click="play(track_resource)">
                    <img :src="track_resource.cover_url_large" :onerror="cover_default">
                    <span></span>
                    <div>
                        <p class="track_or_album_title">{{track_resource.track_title}}</p>
                        <p class="author">{{track_resource.author?track_resource.author:$t("home.no_author")}}</p>
                    </div>
                </li>
            </ul>
            <div class="category_name" v-show="show_album">{{$t("home.album")}}
                <span class="more" v-show="show_album_more"
                      @click="load_page_home_search_result_more(search_key,current_source,'album',`${$t('home.include')}“${search_key}”${$t('home._album')}`)">{{$t("home.more")}}</span>
            </div>
            <ul>
                <li class="track_or_album_resource" v-for="album_resource of album_resources"
                    @click="look_album_details(album_resource)">
                    <img :src="album_resource.cover_url_large" :onerror="cover_default">
                    <div>
                        <p class="track_or_album_title">{{album_resource.album_title}}</p>
                        <p class="author">{{album_resource.author?album_resource.author:$t("home.no_author")}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="not_found" v-show="show_not_found">
            <img src="../../assets/image/not_found.png">
            <p class="sorry">{{$t("home.sorry")}}</p>
            <p class="try">{{$t("home.try")}}</p>
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
                tip: '搜索音乐、故事、有声书',//搜索框提示文字
                search_key: '',//保存用户输入的搜索关键词
                sources: [],//搜索来源
                current_source: '',//当前的搜索来源
                track_resources: [],//搜索到的单曲资源
                album_resources: [],//搜索到的专辑资源
                show_track: false,//是否显示单曲的搜索结果
                show_album: false,//是否显示专辑的搜索结果
                show_track_more: false,//是否显示单曲的更多按钮
                show_album_more: false,//是否显示专辑的更多按钮
                show_not_found: false,//是否显示搜索不到提示
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.search_key = this.$route.query.search_key;
            this.get_sources();
        },
        methods: {
            get_sources() {//获取搜索来源列表
                this.axios.get(`/api/app/v1/user/resource/source`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.sources = res.data.data.sources;
                            this.current_source = this.sources[0].source;
                            this.search(this.search_key, this.current_source);//默认在第一个来源下进行关键字搜索
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            search(search_key, source) {//搜索
                this.axios.get(`api/app/v1/user/resource/search`, {
                    params: {
                        page: 1,
                        page_size: 5,
                        search_key: search_key,
                        source: source,
                        search_type: 'all'
                    }
                })
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.track_resources = res.data.data.track_resources;
                            this.album_resources = res.data.data.album_resources;
                            this.show_track = false;
                            this.show_track_more = false;
                            this.show_album = false;
                            this.show_album_more = false;
                            this.show_not_found = false;
                            if (res.data.data.track_total !== 0)
                                this.show_track = true;
                            if (res.data.data.track_total > 5)
                                this.show_track_more = true;
                            if (res.data.data.album_total !== 0)
                                this.show_album = true;
                            if (res.data.data.album_total > 5)
                                this.show_album_more = true;
                            if (res.data.data.track_total + res.data.data.album_total == 0)
                                this.show_not_found = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                if (navigator.platform == "Win32" || navigator.platform == "Win64")//PC调试环境下需要更改url中的参数否则返回该页面时不会有历史记录
                    self.location.href = `http://localhost:8080/#/home/search/result?search_key=${search_key}`;
            },
            play(track_resource) {//播放
                track_resource.source = this.current_source;
                track_resource.resource_type = 'single';
                this.load_page_home_play(track_resource, track_resource.track_title)
            },
            look_album_details(album_resource) {//进入专辑详情页
                album_resource.source = this.current_source;
                this.load_page_home_album_details(album_resource.album_id, album_resource.source, album_resource.album_title)
            },
        },
    }
</script>

<style scoped>
    .search {
        margin: 0px 30px 40px;
    }

    i {
        background-image: url("../../assets/image/search.png");
        background-repeat: no-repeat;
        background-position: 35px 15px;
        background-size: 37px 37px;
        position: absolute;
        width: 100px;
        height: 66px;
    }

    .search_result {
        margin: 12px 30px 0px;
    }

    .category_name {
        padding-top: 20px;
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

    .not_found {
        margin-top: 252px;
        text-align: center;
    }

    .not_found img {
        width: 345px;
        height: 303px;
    }

    .sorry {
        margin-top: 35px;
        margin-bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #333333;
    }

    .try {
        font-family: PingFangSC-Light;
        font-size: 23px;
        color: #999999;
    }
</style>
