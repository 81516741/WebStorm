<template>
    <div class="container">
        <div class="play_author">{{this.author}}</div>
        <div class="play_cover_container">
            <div class="play_cover"><img :class="playing ? 'rotate_true':'rotate_false'"
                                         :src=this.track_url_large :onerror="cover_default"></div>
        </div>
        <div class="volume_and_control">
            <div class="volume">
                <span class="volume_down" @click="volume_down"></span>
                <input type="range" min="2" max="100" v-model="current_volume"
                       :style="`background-size:${current_volume}% 100%`">
                <span class="volume_up" @click="volume_up"></span>
            </div>
            <div class="control">
                <img class="loop_mode" src="../../assets/image/single_circle.png">
                <img class="prev" src="../../assets/image/prev.png" @click="prev">
                <img class="play_or_pause" :src="playing ? icon_play:icon_pause" @click="play_or_pause">
                <img class="next" src="../../assets/image/next.png" @click="next">
                <img class="list" src="../../assets/image/list.png" @click="look_play_list">
                <div v-transfer-dom>
                    <popup v-model="show_play_list" position="bottom" max-height="50%">
                        <ul style="overflow: hidden">
                            <li class="list_name">{{$t("home.play_list")}}</li>
                            <li v-for="(single,index) of resources" :key="index" :id="'li'+index"
                                @click="play_by_list(single,index)">
                                <span :class="current_playing_track == single.track_id ? 'playing_true':'playing_false'">
                                    {{single.track_title}}-{{single.author?single.author:'TCL-xiaoT'}}
                                </span>
                                <img class="icon_playing" v-show="current_playing_track == single.track_id ? true:false"
                                     src="../../assets/image/playing_gif.gif">
                            </li>
                        </ul>
                    </popup>
                </div>
            </div>
        </div>
        <confirm v-model="show_device_offline" :title="$t('home.device_offline')" :hide-on-blur="true"
                 :show-cancel-button="false">
        </confirm>
        <confirm v-model="show_error_msg" :title="error_msg" :hide-on-blur="true"
                 :show-cancel-button="false">
        </confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                author: '',//作者（歌手等）
                track_url_large: '',//单曲封面
                resources: [],//播放列表，单曲的话该数组只有一个元素
                total: 0,//专辑包含的单曲总数
                cover_default: 'this.src="' + require('../../assets/image/play_cover_default.png') + '"',//默认的旋转占位图
                icon_play: require('../../assets/image/icon_play.png'),//播放图标
                icon_pause: require('../../assets/image/icon_pause.png'),//暂停图标
                playing: false,//是否正在播放，默认为暂停状态
                show_play_list: false,//是否显示播放列表，默认不显示
                current_volume: 50,//当前音量，默认为50
                current_playing_track: "",//当前在播单曲（用track_id标识）
                debounce_timer: 0,//音量条拖动块防抖计时器
                show_device_offline: '',
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            if (this.native.getDeviceStatus() == '1') {//设备在线
                this.show_device_offline = false;
                this.audio.audio_source.track_id = this.$route.query.track_id;
                this.audio.audio_source.source = this.$route.query.source;
                this.audio.audio_source.album_id = this.$route.query.album_id;
                this.audio.audio_source.playback_position = parseInt(this.$route.query.playback_position) ? parseInt(this.$route.query.playback_position) : 1;//字符串转整型,如果为空表示是单曲那么赋值为1
                this.audio.audio_source.resource_type = this.$route.query.resource_type;
                this.audio.audio_source.is_restart = this.$route.query.is_restart === 'false' ? false : true;//字符串转布尔;
                this.audio.onplay = this.on_play;//注册方法，监听音响播放与否
                this.audio.onpause = this.on_pause;//注册方法，监听音响暂停与否
                this.get_play_list();//获取播放列表
                if (this.audio.audio_source.is_restart) //从头播放
                    this.play(this.audio.audio_source.track_id, true);
                else {//不是从头播放，只是同步音响当前播放状态
                    if (this.$route.query.play_status != 'pause') {//之所以不用=='play'判断，是因为专辑详情页可能出现非从头播放但不传play_status字段的情况，当该字段为空时也只是同步播放状态
                        this.playing = true;
                        this.current_playing_track = this.audio.audio_source.track_id;//当前播放歌曲为该单曲
                    }
                    if (this.$route.query.show_list === 'true' && this.resources)
                        this.look_play_list();
                }
                this.audio.onvolume = this.on_volume;//注册方法，监听音响音量
                this.native.getDeviceVolume();//获取音响音量
            }
            else {
                this.show_device_offline = true;
            }
        },
        watch: {
            current_volume() {//监听音量
                clearTimeout(this.debounce_timer);//清除之前的计时器
                this.debounce_timer = setTimeout(() => {
                    this.native.setDeviceVolume(parseInt(this.current_volume));//设置音响音量,由于H5新特性range传值为string所以这里要转为int
                }, 200);//设置一个计时器，200ms后执行设置音量
            }
        },
        methods: {
            on_volume(volume) {//同步音响音量
                console.log("play.vue--on_volume");
                this.current_volume = volume;
            },
            volume_down() {//调低音量
                this.current_volume = parseInt(this.current_volume) - 5;
                if (this.current_volume <= 2)//保证最低音量为2
                    this.current_volume = 2;
            },
            volume_up() {//调高音量
                this.current_volume = parseInt(this.current_volume) + 5;
                if (this.current_volume >= 100)//保证最大音量为100
                    this.current_volume = 100;
            },
            on_play(track_id) {//APP接收音响消息同步播放状态
                console.log("play.vue--onPlay");
                if (this.current_playing_track != track_id) {
                    this.current_playing_track = track_id;
                    this.playing = true;
                    let index = this.resources.findIndex((v) => {
                        return v.track_id == track_id;
                    });//利用findIndex()根据单曲id找到其在数组的下标
                    this.audio.audio_source.playback_position = index + 1;//音响播到下一首后需要更改播放位置
                    this.native.setTitle(this.resources[index].track_title);//更改原生顶部的歌曲名为当前播放歌曲名
                    this.author = this.resources[index].author ? this.resources[index].author : 'TCL-xiaoT';//更改歌手名为当前播放歌曲的歌手
                }
            },
            on_pause() {//APP接收音响消息同步暂停状态
                console.log("play.vue--onPause");
                this.playing = false;
                this.current_playing_track = "";
            },
            play(track_id, is_restart) {//播放track_id这首歌
                this.audio.audio_source.track_id = track_id;
                this.audio.audio_source.is_restart = is_restart;
                this.audio.play();
                this.playing = true;
                this.current_playing_track = track_id;
            },
            get_play_list() {//获取播放列表
                if (this.audio.audio_source.resource_type === 'single') {//获取单曲的播放列表
                    this.resources.push(this.$route.query);//单曲列表赋值
                    this.track_url_large = this.$route.query.cover_url_large;//单曲封面
                    this.author = this.$route.query.author ? this.$route.query.author : 'TCL-xiaoT';//单曲歌手名
                }
                else {//获取专辑的播放列表
                    this.axios.get(`/api/app/v1/user/resource/playList/${this.audio.audio_source.album_id}`, {
                        params: {
                            source: this.audio.audio_source.source,
                            page: 1,
                            page_size: 1000
                        }
                    })
                        .then((res) => {
                            if (res.data.error_code !== 0) {
                                this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                                this.show_error_msg = true;
                            }
                            else {
                                this.total = res.data.data.total;
                                this.resources = res.data.data.resources;
                                this.track_url_large = this.resources[this.audio.audio_source.playback_position - 1].track_url_large;
                                this.author = this.resources[this.audio.audio_source.playback_position - 1].author ? this.resources[audio_source.playback_position - 1].author : 'TCL-xiaoT';//假如作者为空则显示默认字符串;
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
            },
            prev_or_next(index) {//上一首或下一首
                if (this.audio.audio_source.resource_type === 'single') //播放单曲时按上一曲下一曲会从头播放该单曲
                    this.play(this.resources[0].track_id, true);
                else {
                    if (index >= 1 && index <= this.total) {
                        this.play(this.resources[index - 1].track_id, true);
                        this.audio.audio_source.playback_position = index;
                        this.native.setTitle(this.resources[index - 1].track_title);//更改原生顶部的歌曲名为当前播放歌曲名
                        this.author = this.resources[index - 1].author ? this.resources[index - 1].author : 'TCL-xiaoT';//更改歌手名为当前播放歌曲的歌手

                    } else {
                        let no_prev_or_next;//提示语
                        if (index < 1)//没有上一首了
                            no_prev_or_next = this.$t('home.no_prev');
                        if (index > this.total)//没有下一首了
                            no_prev_or_next = this.$t('home.no_next');
                        this.error_msg = no_prev_or_next;
                        this.show_error_msg = true;
                    }
                }
            },
            prev() {//上一首
                this.prev_or_next(this.audio.audio_source.playback_position - 1);
            },
            next() {//下一首
                this.prev_or_next(this.audio.audio_source.playback_position + 1);
            },
            play_or_pause() {//播放或暂停
                if (this.playing) {
                    this.audio.pause();
                    this.playing = false;
                    this.current_playing_track = '';//当前歌曲处于暂停状态
                } else
                    this.play(this.resources[this.audio.audio_source.playback_position - 1].track_id, false);
            },
            look_play_list() {//显示播放列表
                this.show_play_list = true;
                setTimeout(() => {
                    document.getElementById(`li${this.audio.audio_source.playback_position - 1}`).scrollIntoView()
                }, 0);//每次点击播放列表自动定位到正在播放or暂停的单曲
            },
            play_by_list(single, index) {//通过播放列表播放单曲
                if (this.current_playing_track != single.track_id) { //点击专辑中的其他单曲播放时，被点击单曲从头播放
                    this.play(single.track_id, true);
                    this.audio.audio_source.playback_position = index + 1;
                    this.native.setTitle(single.track_title);//更改原生顶部的歌曲名为当前播放歌曲名
                    this.author = single.author ? single.author : 'TCL-xiaoT';//更改歌手名为当前播放歌曲的歌手
                }
            }
        }
    }
</script>

<style scoped>
    /*音量条样式*/
    input[type=range] {
        appearance: none; /*清除系统默认样式*/
        display: inherit;
        margin-left: 124px;
        width: 442px;
        height: 2px;
        background: linear-gradient(#333333, #b7b7b7) no-repeat, #b7b7b7;
    }

    /*音量条拖动块的样式--伪类样式*/
    input[type=range]::-webkit-slider-thumb {
        appearance: none;
        height: 28px;
        width: 28px;
        background: #000000;
        border-radius: 50%;
    }

    .play_author {
        padding-top: 20px;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 21px;
        color: #666666;
    }

    .play_cover_container {
        position: absolute;
        top: 45px;
        bottom: 450px;
        display: flex; /*弹性布局*/
        justify-content: center; /*布局中的元素水平居中*/
        align-items: center; /*布局中的元素垂直居中*/
    }

    .play_cover {
        width: 100%;
        height: 564px;
        background: url("../../assets/image/play_cover_outline.png") no-repeat center center;
        background-size: 564px 564px;
    }

    .play_cover img {
        border-radius: 50%;
        width: 544px;
        height: 544px;
        margin: 10px 73px;
    }

    .rotate_true {
        animation: rotation 10s linear infinite; /*自定义一个方法rotation 实现旋转，10s，均速，无限*/
    }

    .rotate_false {
        animation-play-state: paused; /*旋转暂停*/
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .volume_and_control {
        position: absolute;
        bottom: 178px;
    }

    .volume {
        margin-bottom: 119px;
    }

    .volume_down {
        position: absolute;
        top: -12px;
        left: 52px;
        width: 32px;
        height: 26px;
        background: url("../../assets/image/volume_down.png");
        background-size: 32px 26px;
    }

    .volume_up {
        top: -12px;
        position: absolute;
        right: 52px;
        width: 32px;
        height: 26px;
        background: url("../../assets/image/volume_up.png");
        background-size: 32px 26px;
    }

    .control {
        height: 139px;
    }

    .loop_mode {
        margin-left: 11px;
        width: 47px;
        height: 32px;
    }

    .play_or_pause {
        width: 127px;
        height: 127px;
    }

    .prev {
        margin-left: 52px;
        margin-right: 70px;
        width: 90px;
        height: 90px;
    }

    .next {
        margin-left: 70px;
        margin-right: 52px;
        width: 90px;
        height: 90px;
    }

    .list {
        width: 51px;
        height: 51px;
    }

    .list_name {
        line-height: 70px;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 28px;
        color: #ffffff;

    }

    li {
        width: 100%;
        padding: 0px 30px;
        line-height: 88px;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        border-bottom: 1Px solid #4a4a4a;
    }

    li > span {
        vertical-align: middle;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .playing_true {
        max-width: 627px;
        color: #ffffff;
    }

    .playing_false {
        max-width: 690px;
        color: #666666;
    }

    .icon_playing {
        vertical-align: middle;
        margin-left: 19px;
        width: 35px;
        height: 35px;
    }

</style>