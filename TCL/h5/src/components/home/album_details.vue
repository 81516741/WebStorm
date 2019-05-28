<template>
    <div class="container">
        <div class="top">
            <div class="top_left" :style="`background-image:url(${cover_url_large})`"></div>
            <div class="top_right">
                <div class="top_right_top">“{{ $t("home.i_want_listen") }}{{album_title}}”</div>
                <div class="top_right_bottom" @click="play_all()">{{ $t("home.play_all") }}</div>
            </div>
        </div>
        <ul>
            <li :class="current_playing_track == single.track_id ? 'playing_true':'playing_false'"
                :id="'li'+index" @click="play(single,index)" v-for="(single,index) of resources" :key="index">
                {{single.track_title}}
            </li>
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
                source: "",//来源（思必驰等等）
                current_page: 1,//页码
                page_size: 1000,//分页大小，暂时定为1000，后续做分页可能为10
                resources: {},//专辑中的所有单曲信息
                resource_type: 'album',//资源类型
                total: 0,//专辑中的单曲总数
                album_title: "",//专辑名
                cover_url_large: "",//专辑封面
                album_id: "",//专辑ID
                author: "",//作者
                current_playing_track: "",//当前在播放的单曲（用track_id标识）
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.album_title = this.$route.query.album_title;
            this.album_id = this.$route.query.album_id;
            this.source = this.$route.query.source;
            this.get_album_details(this.current_page, this.page_size);
            this.audio.onplay = this.on_play;//注册方法，监听音响播放与否
            this.audio.onpause = this.on_pause;//注册方法，监听音响暂停与否
            this.native.getAudioPlayStatus();//获取当前播放信息(再次进入此专辑需要知道在播的是哪一首)
            this.audio.onnearlyfinished = this.on_nearly_finished;
        },
        methods: {
            get_album_details(page, page_size) { //调用后台接口获取专辑内容
                this.axios.get(`api/app/v1/user/resource/others/albums/${this.album_id}`, {
                    params: {
                        source: this.source,
                        page: page,
                        page_size: page_size,
                    }
                })
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg=`${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg=true;
                        } else {
                            this.resources = res.data.data.resources;
                            this.cover_url_large = res.data.data.cover_url_large;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            on_play(track_id) {//APP接收音响消息同步播放状态
                console.log("home_album_details.vue--onPlay");
                let index = this.resources.findIndex((v) => {
                    return v.track_id == track_id;
                });//利用findIndex()根据单曲id找到其在数组的下标
                setTimeout(() => {
                    document.getElementById(`li${index}`).scrollIntoView()
                }, 0);//自动定位到当前播放歌曲
                if (this.current_playing_track != track_id)//更新播放图标位置
                    this.current_playing_track = track_id;
            },
            on_pause() {//APP接收音响消息同步暂停状态
                console.log("home_album_details.vue--onPause");
                this.current_playing_track = "";
            },
            on_nearly_finished(event) {
                console.log("home_album_details.vue--onNearlyFinished");
            },
            play_all() {
                this.play(this.resources[0], 0);
            },
            play(single, index) {//播放专辑中的一首单曲
                let is_restart = false;
                if (this.current_playing_track != single.track_id) { //点击专辑中的其他单曲播放时，被点击单曲从头播放
                    this.current_playing_track = single.track_id;
                    is_restart = true;
                }
                let obj = {
                    track_id: single.track_id,
                    album_id: this.album_id,
                    source: this.source,
                    resource_type: this.resource_type,
                    playback_position: index + 1,
                    is_restart: is_restart,
                };
                this.load_page_home_play(obj, single.track_title);
            },
        }
    }
</script>

<style scoped>
    .top {
        padding-top: 20px;
        padding-bottom: 40px;
        border-bottom: 1Px solid #dddddd;
    }

    .top_left {
        float: left;
        width: 224px;
        height: 224px;
        background-size: 224px 224px;
        margin-right: 30px;
    }

    .top_right {
        margin-left: 254px;
        height: 224px;
        font-size: 32px;
        font-family: "PingFangSC-Medium";
    }

    .top_right_top {
        height: 106px;
        line-height: 54px;
        color: #333333;
        overflow: hidden;
    }

    .top_right_bottom {
        margin-top: 30px;
        width: 226px;
        background: url("../../assets/image/play_all.png");
        background-size: 226px 88px;
        color: #ffffff;
        text-align: center;
        line-height: 88px;
    }

    li {
        width: 100%;
        padding-right: 35px;
        line-height: 88px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        color: #333333;
        border-bottom: 1Px solid #dddddd;
    }

    .playing_false {
        background: url("../../assets/image/play_grey.png") no-repeat center right;
        background-size: 35px 35px;
    }

    .playing_true {
        background: url("../../assets/image/playing_gif.gif") no-repeat center right;
        background-size: 35px 35px;
    }
</style>