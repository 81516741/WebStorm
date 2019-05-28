<template>
    <div class="container">
        <div>
            <img class="icon_back" @click="native.goBack()" src="../../assets/image/icon_back.png">
            <p class="page_title">{{$t("channel.programme_edit")}}</p>
        </div>
        <datetime-view v-model="programme_info.play_time" format="HH:mm"></datetime-view>
        <p class="select_time">{{$t("channel.select_time")}}
            <span>:</span>
        </p>
        <div class="select_programme" @click="load_page_programme_select()">
            <span>{{$t("channel.please_select_programme_type")}}</span>
            <span class="programme_name">{{programme_info.programme_name}}</span>
            <img src="../../assets/image/more.png">
        </div>
        <div class="save_button" @click="save()">{{$t("channel.save")}}</div>
        <confirm v-model="show_time_conflict" :title="$t('channel.time_conflict')" :hide-on-blur="true"
                 :show-cancel-button="false">
        </confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                programme_info: {
                    play_time: "12:00",
                    programme_icon: "https://s3.cn-northwest-1.amazonaws.com.cn/xiaot/static/娱乐新闻@2x.png",
                    programme_id: "5c6baad1f5808a41e40ik606",
                    programme_name: '娱乐新闻',
                },//节目默认信息
                show_time_conflict: false,//是否显示节目时间冲突提示
            }
        },
        created() {
            this.programme_info = JSON.parse(localStorage.programme || JSON.stringify(this.programme_info));//获取本地缓存，假如缓存为空则获取默认值
            if (JSON.parse(localStorage.programme || '[]').length == 0 && this.$route.query.index !== "-1") //本地缓存为空并且不是新增节目（index=-1时表示是新增节目，否则表示在原节目的基础上修改节目,注意：路由传参为字符串“-1”）
                this.programme_info = this.$route.query;
            localStorage.programme = JSON.stringify(this.programme_info);//更新本地缓存
        },
        watch: {//对programme_info对象的play_time进行监听,每次改变播放时间就会更新本地缓存
            'programme_info.play_time'() {
                localStorage.programme = JSON.stringify(this.programme_info);
            },
        },
        methods: {
            save() {
                let programmes = JSON.parse(localStorage.programmes || '[]');//从本地缓存中取出频道信息（所有节目）
                if (this.$route.query.index !== "-1") //index !== "-1"表示在已有节目的基础上做修改，则需要先删除原来节目再增加新节目
                    programmes.splice(this.programme_info.index, 1);//删除原来节目
                delete this.programme_info.index;//删除路由传进来的下标，保持与localStorage.programmes中的元素字段一致
                let arr_play_time = programmes.map(function (v) {//取出频道信息的所有播放时间并组成一个数组
                    return v.play_time;
                });
                this.show_time_conflict = arr_play_time.includes(this.programme_info.play_time);//判断选择时间与已有节目的播放时间是否冲突
                if (this.show_time_conflict == false) {//查重通过，则添加该节目到频道
                    programmes.push(this.programme_info);//将剪辑后的节目信息添加到programmes
                    programmes.sort(sort_play_time);//按播放时间升序排序
                    localStorage.programmes = JSON.stringify(programmes);//将更新后的频道信息（所有节目）存到本地缓存
                    function sort_play_time(a, b) {//排序方法，升序
                        return a.play_time > b.play_time ? 1 : -1;
                    }
                    this.native.goBack();//调用原生接口返回上一级页面
                }
            },
        },
    }
</script>

<style scoped>
    .save_button {
        position: absolute;
        bottom: 56px;
        width: 690px;
        line-height: 88px;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #ffffff;
        background-color: #e60012;
        border-radius: 44px;
    }

</style>