<!--PC端调试url： http://localhost:8080/#/clock  -->
<template>
    <div class="container">
        <img class="icon_back" @click="native.goBack()" src="../../assets/image/icon_back.png">
        <p class="page_title">{{$t("clock.clock_title")}}</p>
        <img class="icon_add" @click="load_page_clock_edit()" src="../../assets/image/icon_add_clock.png">
        <swipeout>
            <swipeout-item v-for="(clock,index) of clocks" :key="index" transition-mode="follow">
                <div slot="right-menu">
                    <swipeout-button @click.native="delete_clock(index)" type="warn" :width="70">
                        {{$t('clock.delete')}}
                    </swipeout-button>
                </div>
                <div slot="content" class="content" :style="`color:${clock.is_open ? '#333333':'#c6c6c6'}`">
                    <p class="time">{{clock.clock_time}}</p>
                    <p class="repeat" v-if="clock.clock_type=='1'">{{clock.custom_day}}</p>
                    <p class="repeat" v-if="clock.clock_type=='2'">{{clock.custom_week}}</p>
                    <img :src="clock.is_open ? icon_open : icon_close"
                         @click="close_or_open(index)">
                </div>
            </swipeout-item>
        </swipeout>
        <confirm v-model="show_error_msg" :title="error_msg" :hide-on-blur="true"
                 :show-cancel-button="false">
        </confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clocks: [],//所有闹钟信息
                icon_open: require('../../assets/image/icon_open.png'),//闹钟打开图标
                icon_close: require('../../assets/image/icon_close.png'),//闹钟关闭图标
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
            this.get_clocks();
        },
        methods: {
            get_clocks() { //调用后台接口获取所有闹钟信息
                let device_id = this.native.getDeviceId();//获取设备id
                this.axios.get('/api/app/v1/user/clocks', {
                    params: {
                        device_id: device_id,
                    }
                })
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {
                            this.clocks = res.data.data.clocks;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            close_or_open(index) {
                this.axios.put(`/api/app/v1/user/clocks/${this.clocks[index].clock_id}/open`, {is_open: !this.clocks[index].is_open})//调用后端接口修改该闹钟的启用状态
                    .then((res) => {
                        if (res.data.error_code !== 0) {//改变启用状态失败
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        }
                        else {//改变启用状态成功
                            this.clocks[index].is_open = !this.clocks[index].is_open;//页面上改变启用状态
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delete_clock(index) {
                this.axios.delete(`/api/app/v1/user/clocks/${this.clocks[index].clock_id}`)//调用后端接口删除该闹钟
                    .then((res) => {
                        if (res.data.error_code !== 0) {//删除失败
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        }
                        else {//删除成功
                            this.clocks.splice(index, 1);//页面上删除选中节目
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .icon_add {
        width: 31px;
        height: 31px;
        position: absolute;
        right: 30px;
        top: 30px;
    }

    .content {
        width: 100%;
        height: 140px;
        margin-bottom: 20px;
        padding: 30px 20px;
        border: 1Px solid #efefef;
        border-radius: 10px;
    }

    .content img {
        position: absolute;
        top: 50px;
        right: 20px;
        width: 81px;
        height: 41px;
    }

    .time {
        line-height: 48px;
        margin-bottom: 20px;
        font-family: PingFangSC-Medium;
        font-size: 48px;
    }

    .repeat {
        line-height: 28px;
        padding-left: 5px;
        font-family: PingFangSC-Light;
        font-size: 28px;
    }
</style>