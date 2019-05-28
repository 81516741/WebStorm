<template>
    <div class="container">
        <img class="icon_back" @click="native.goBack()" src="../../assets/image/icon_back.png">
        <p class="page_title">{{$t("channel.channel_edit")}}</p>
        <img class="icon_add" @click="load_page_programme_edit({},-1)" src="../../assets/image/icon_add_programme.png">
        <div v-show="show_tip" class="tip">
            <img src="../../assets/image/no_channel.png">
            <div>{{$t("channel.tip")}}</div>
        </div>
        <div v-show="!show_tip">
            <div class="time_line">
                <timeline>
                    <timeline-item v-for="(programme,index) of channel_details" :key="index">
                        <div class="programme"
                             @click="load_page_programme_edit(programme,index)">
                            <p>{{programme.play_time}}</p>
                            <img :src="programme.programme_icon" :onerror="cover_default">
                            <span>{{programme.programme_name}}</span>
                        </div>
                        <img class="delete" src="../../assets/image/delete.png"
                             @click="delete_programme(index)">
                    </timeline-item>
                </timeline>
            </div>
            <confirm v-model="show_confirm_delete" :title="$t('channel.confirm_delete_programme')" :hide-on-blur="true"
                     @on-confirm="confirm_delete_programme()">
            </confirm>
            <confirm v-model="show_confirm_empty" :title="$t('channel.confirm_empty_channel')" :hide-on-blur="true"
                     @on-confirm="confirm_empty_channel()">
            </confirm>
            <div class="button_container">
                <span class="channel_button" id="empty" @click="empty_channel()">{{$t("channel.empty")}}</span>
                <span class="channel_button" id="finish" @click="finish_channel()">{{$t("channel.finish")}}</span>
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
                channel_id: "",//频道ID
                channel_type: "",//频道类型，custom 表示自定义频道，recommended表示推荐频道
                channel_details: [],//频道详情
                delete_index: "",//删除的节目序号
                show_confirm_delete: false,//是否显示删除确认弹窗
                show_confirm_empty: false,//是否显示清空确认弹窗
                show_tip: false,//是否显示操作提示
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {//由于该页面的多级页面跳转为h5自身跳转所以每次打开该页面都会执行一次created（）
            localStorage.removeItem('programme');//先清除本地缓存programme，保证每次点击添加按钮出现的都是默认值
            this.channel_id = this.$route.query.channel_id;//注意路由传值都是字符串，所以id为0的时候这里传的id为‘0’
            this.channel_type = this.$route.query.channel_type;//从路由获取频道类型
            this.channel_details = JSON.parse(localStorage.programmes || '[]');//读取本地缓存，实现视图动态响应本地缓存
            if (this.channel_details.length == 0) {//本地缓存为空
                if (this.channel_id == '0') //频道id为0表示为新增频道，所以要显示添加节目提示信息
                    this.show_tip = true;
                else //编辑已存在的频道
                    this.get_channel_details(this.channel_id);//获取频道详情
            }
        },
        methods: {
            get_channel_details(channel_id) {
                let url;
                if (this.channel_type == "custom")//自定义频道
                    url = `/api/app/v1/user/channels/${channel_id}`;
                else//推荐频道
                    url = `/api/app/v1/user/resource/channels/recommended/${channel_id}`;
                this.axios.get(url)
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            localStorage.programmes = JSON.stringify(res.data.data.programmes);//更新本地缓存以同步服务器端
                            this.channel_details = JSON.parse(localStorage.programmes);//从本地缓存获取频道信息
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delete_programme(index) {//删除节目
                this.delete_index = index;//获取要删除的数组下标
                this.show_confirm_delete = true;//显示确认删除弹窗提示
            },
            confirm_delete_programme() {//确定删除节目
                this.channel_details.splice(this.delete_index, 1);//删除选中节目
                localStorage.programmes = JSON.stringify(this.channel_details);//删除完成后更新本地缓存
            },
            empty_channel() {//清空频道
                this.show_confirm_empty = true;//显示确认清空弹窗提示
            },
            confirm_empty_channel() {//确定清空频道
                let empty_enable = true;//能否清空
                if (this.channel_type !== 'recommended' && this.channel_id !== '0') {//清空自定义频道则删除该频道（假如清空的是推荐频道或者是还未新增完成的频道则无法删除）
                    this.axios.delete(`/api/app/v1/user/channels/${this.channel_id}`)
                        .then((res) => {
                            if (res.data.error_code !== 0) {
                                this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                                this.show_error_msg = true;
                                empty_enable = false;//删除失败时无法清空频道
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                if (empty_enable) {
                    this.channel_details = [];//清空频道信息
                    localStorage.removeItem('programmes');//清空完成后清除本地缓存
                    this.native.goBack();//调用原生接口返回上一级页面
                }
            },
            finish_channel() {//频道编辑完成
                if (this.channel_details.length !== 0) {//频道信息不为空
                    let device_id = this.native.getDeviceId();//获取设备id
                    let params = {//要传给后台的参数
                        channel_name: '',//频道名字，暂时为空，后续做多频道的话会用到
                        device_id: device_id,//用于播放频道的设备id（唯一标识音响）
                        programmes: this.channel_details,//所有节目信息（频道详情）
                    };
                    if (this.channel_id !== '0' && this.channel_type == 'custom')//对已存在的自定义频道编辑完成（修改）
                        this.axios.put(`/api/app/v1/user/channels/${this.channel_id}`, params)
                            .then((res) => {
                                if (res.data.error_code !== 0) {
                                    this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                                    this.show_error_msg = true;
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    else//新增频道编辑完成，编辑完推荐频道也是新增，因为不能对推荐频道本身进行修改（新增）
                        this.axios.post(`/api/app/v1/user/channel`, params)
                            .then((res) => {
                                if (res.data.error_code !== 0) {
                                    this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                                    this.show_error_msg = true;
                                } else {
                                    this.channel_id = res.data.data.channel_id;//更新频道id为新增后的频道id
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    localStorage.removeItem('programmes');//清除本地缓存
                    this.native.goBack();//调用原生接口返回上一级页面
                }
                else//频道信息为空（比如用户点击节目的叉号删除节目直到删完所有节目）
                    this.confirm_empty_channel();//调用确定清空频道方法
            },
        },
    }
</script>

<style scoped>

    .icon_add {
        width: 33px;
        height: 32px;
        position: absolute;
        right: 30px;
        top: 30px;
    }

    .delete {
        width: 35px;
        height: 35px;
        position: absolute;
        right: 20px;
        top: 28px;
    }

    .tip {
        text-align: center;
        white-space: pre;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #828282;
    }

    .tip img {
        width: 101px;
        height: 94px;
        margin-top: 300px;
        margin-bottom: 20px;
    }

    #empty {
        width: 240px;
        margin-right: 14px;
    }

    #finish {
        width: 428px;
    }
</style>