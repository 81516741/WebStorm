<template>
    <div class="container">
        <img class="icon_back" @click="native.goBack()" src="../../assets/image/icon_back.png">
        <p class="page_title">{{$t("clock.clock_title")}}</p>
        <p class="save" @click="save">{{$t("clock.save")}}</p>
        <datetime-view v-model="time" format="HH:mm"></datetime-view>
        <p class="select_time">{{$t("channel.select_time")}}
            <span>:</span>
        </p>
        <div class="select_programme" @click="select_repeat">
            <span>{{$t("clock.clock_repeat")}}</span>
            <span class="programme_name">{{tips}}</span>
            <img src="../../assets/image/more.png">
        </div>
        <div v-transfer-dom>
            <popup v-model="show_repeat" position="bottom">
                <ul style="overflow: hidden">
                    <li class="list_name">{{$t("clock.clock_repeat")}}</li>
                    <li v-for="(week,index) of week_info" :key="index" @click="select_day(index)">
                        <p>{{week.day}}</p>
                        <img class="icon_select" v-show="week.enable" src="../../assets/image/icon_select.png">
                    </li>
                    <li class="sure" @click="sure">{{$t("clock.sure")}}</li>
                </ul>
            </popup>
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
                time: '12:00',//默认的闹钟时间
                show_repeat: false,//是否显示重复时间弹窗（周一、周二到周日）
                tips: this.$t("clock.never"),
                week_info: [
                    {code: 'SUN', day: this.$t("clock.SUN"), enable: false},
                    {code: 'MON', day: this.$t("clock.MON"), enable: false},
                    {code: 'TUE', day: this.$t("clock.TUE"), enable: false},
                    {code: 'WED', day: this.$t("clock.WED"), enable: false},
                    {code: 'THU', day: this.$t("clock.THU"), enable: false},
                    {code: 'FRI', day: this.$t("clock.FRI"), enable: false},
                    {code: 'SAT', day: this.$t("clock.SAT"), enable: false}],//保存周日到周六的信息（一周的第一天默认为国际通用的周日）
                custom_week: '',//从week_info选中的天组成的字符串（code字段，比如“MON，SAT”）
                show_error_msg: false,//是否显示错误信息（接口请求失败返回的错误信息）
                error_msg: '',//接口请求失败返回的错误信息
            }
        },
        created() {
        },
        methods: {
            save() {
                let device_id = this.native.getDeviceId();//获取设备id
                let clock_type = "2";//取值暂时只有字符串1和2
                if (this.tips == this.$t("clock.never"))
                    clock_type = "1";
                let params = {//要传给后台的参数
                    device_id: device_id,//用于播放闹钟的设备id（唯一标识音响）
                    clock_type: clock_type,//闹钟模式。  1：今天具体时间 不重复。  2：自定义重复如周一、周二 早上八点。  3：每天。  4：工作日，周一至周五（暂无）。
                    clock_time: this.time,//闹钟时间 HH:mm
                    custom_week: this.custom_week,//clock_type为2时必填（自定义选择周几）
                    volume: 50,//音量，暂时统一传50
                    memo: '',//闹钟描述，暂时传空
                };
                this.axios.post(`/api/app/v1/user/clock`, params)//调用后端接口添加一个闹钟
                    .then((res) => {
                        if (res.data.error_code !== 0) {
                            this.error_msg = `${res.data.error_msg} ${this.$t('error_code')} ${res.data.error_code}`;
                            this.show_error_msg = true;
                        } else {//添加成功返回闹钟主页
                            this.native.goBack();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            select_repeat() {
                this.show_repeat = true;
            },
            select_day(index) {
                this.week_info[index].enable = !this.week_info[index].enable;
            },
            sure() {
                let days_info = [];
                days_info = this.week_info.filter(item=>{
                    return item.enable;
                });
                let selected_days = days_info.map(function (v) {//被选中的天组成一个数组(字段为day)
                    return v.day;
                });
                this.tips = selected_days.join('，') || this.$t("clock.never");//没有选中任何天就点击确定则仍然显示默认tips（永不）
                let selected_codes = days_info.map(function (v) {//被选中的天组成一个数组（字段为code）
                    return v.code;
                });
                this.custom_week = selected_codes.join(',') || '';//没有选中任何天就点击确定则值为空
                this.show_repeat = false;
            },
        }
    }
</script>

<style scoped>
    .select_programme img {
        left: 605px;
    }

    .vux-popup-dialog {
        opacity: 1 !important; /*弹窗不透明度为1，即完全不透明*/
        background-color: #ffffff !important;
    }

    .save {
        position: absolute;
        top: 15px;
        right: 30px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #333333;
    }

    .list_name {
        line-height: 72px;
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 30px;
        color: #999999;
        border-bottom: 0px;
    }

    li {
        position: relative;
        margin: 0px 30px;
        line-height: 88px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #333333;
        border-bottom: 1Px solid #dddddd;
    }

    .icon_select {
        width: 32px;
        height: 22px;
        position: absolute;
        top: 33px;
        right: 30px;
    }

    .sure {
        line-height: 88px;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #2385fe;
        border: 0px;
    }
</style>