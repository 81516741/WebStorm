<!--PC端调试url： http://localhost:8080/#/channel  -->
<template>
    <div class="container">
        <div v-show="!show_channel_details">
            <p class="page_title">{{$t("channel.personality_channel")}}</p>
            <div class="channel_default">
                <div class="add_channel">
                    <img src="../../assets/image/add_channel.png" @click="load_page_channel_edit(0,'')">
                    <p>{{$t("channel.add_your_exclusive_channel")}}</p>
                </div>
                <div class="recommended_channel">
                    <p class="recommended_channel_tip">{{$t("channel.recommended_channel_tip")}}</p>
                    <ul>
                        <li v-for="channel of recommended_channels"
                            @click="load_page_channel_edit(channel.recommended_channel_id,'recommended')">
                            {{channel.recommended_channel_name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-show="show_channel_details">
            <p class="page_title">
                {{channel_enable?$t("channel.personality_channel"):$t("channel.personality_channel_stop_use")}}</p>
            <div class="time_line">
                <timeline>
                    <timeline-item v-for="(programme,index) of channel_details" :key="index">
                        <div class="programme">
                            <p>{{programme.play_time}}</p>
                            <img :src="programme.programme_icon">
                            <span>{{programme.programme_name}}</span>
                        </div>
                    </timeline-item>
                </timeline>
            </div>
            <div class="button_container">
                <span class="channel_button" id="enable_or_not"
                      :style="channel_enable ? '': 'background-color: #ffffff'" @click="enable_or_not()">
                    {{channel_enable?$t("channel.stop_using"):$t("channel.start_using")}}
                </span>
                <span class="channel_button" id="edit" @click="load_page_channel_edit(channel_id,'custom')">{{$t("channel.edit")}}</span>
            </div>
            <div id="overlay" v-show="!channel_enable"></div>
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
                channel_id: '',//频道id
                channel_details: [],//频道详情
                channel_enable: true,//启用频道与否，true表示启用，false表示暂停使用
                recommended_channels: [],//推荐频道
                show_channel_details: '',//是否显示频道详情页，true表示显示，false表示不显示
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {//只在第一次打开该页面的时候执行一次
            localStorage.removeItem('programmes');//先清除本地缓存programmes(频道详情，即所有节目信息)
            localStorage.removeItem('programme');//先清除本地缓存programme（单个节目信息）
            this.get_channel_list();//获取频道列表,来判断是否存在用户自定义频道
            if (localStorage.channel_enable && localStorage.channel_enable == 'false')//存在本地缓存且为假
                this.channel_enable = false;
            localStorage.removeItem('channel_enable');//清除本地缓存channel_enable
        },
        methods: {
            get_channel_list() {
                this.axios.get(`/api/app/v1/user/channels`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            if (res.data.data.channels) {//存在用户的自定义频道，则获取频道详情
                                this.channel_id = res.data.data.channels[0].channel_id;
                                this.show_channel_details = true;
                                this.get_channel_details(this.channel_id);
                            }
                            else {//不存在用户自定义频道，则获取推荐频道
                                this.show_channel_details = false;
                                this.get_recommended_channels();
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            get_channel_details(channel_id) {
                this.axios.get(`/api/app/v1/user/channels/${channel_id}`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.channel_details = res.data.data.programmes;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            get_recommended_channels() {
                this.axios.get(`/api/app/v1/user/resource/channels/recommended`)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.recommended_channels = res.data.data.recommended_channels;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            enable_or_not() {//频道是否启用
                this.channel_enable = !this.channel_enable;
                localStorage.channel_enable = this.channel_enable;//存入本地缓存
                this.axios.put(`/api/app/v1/user/channels/${this.channel_id}/use`, {is_open: this.channel_enable})
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    }
</script>

<style scoped>

    .add_channel {
        padding: 200px 0px 258px;
        text-align: center;
    }

    .add_channel img {
        width: 157px;
        height: 157px;
    }

    .add_channel p {
        padding-top: 34px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        font-weight: bold;
    }

    .recommended_channel {
        position: absolute;
        bottom: 46px;
        border-top: 1Px solid #dddddd;
    }

    .recommended_channel_tip {
        text-align: center;
        padding: 46px 0px 16px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        font-weight: bold;
    }

    .channel_default ul {
        padding: 0px 45px;
    }

    .channel_default li {
        text-align: center;
        width: 168px;
        height: 78px;
        padding: 16px;
        margin: 30px 15px 0px;
        display: inline-block; /*li横向排列*/
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
        border: 1Px solid #dddddd;
        border-radius: 39px;
        word-break: keep-all;
    }

    #enable_or_not {
        z-index: 101;
        position: relative;
        width: 240px;
        margin-right: 14px;
    }

    #edit {
        width: 428px;
    }

    #overlay {
        z-index: 100;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 88px;
        left: 0px;
        background-color: #777777;
        opacity: 0.2;
    }
</style>