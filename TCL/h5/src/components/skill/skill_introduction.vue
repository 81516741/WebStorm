<template>
    <div class="container">
        <div class="skill_name">
            <img :src="skill_info.img">
            <span>{{skill_info.name}}</span>
        </div>
        <div class="case">
            <h1>{{$t("skill.you_can_say_like_this")}}</h1>
            <div>“{{skill_info.case}}”</div>
        </div>
        <div class="instruction">
            <h1>{{$t("skill.instruction")}}</h1>
            <div>{{skill_info.instruction_words}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                skill_info: {},
            }
        },
        created() {
            this.skill_info = this.$route.query;
        },
    }
</script>

<style scoped>
    .skill_name {
        width: 690px;
        height: 120px;
        border-radius: 8px;
        background-color: #f4f4f4;
    }

    img {
        margin: 30px 20px;
        width: 61px;
        height: 61px;
    }

    .skill_name > span {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #333333;
        font-weight: 600;
    }

    .case > h1 {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .case > div {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        display: table;
        height: 88px;
        padding: 25px 15px;
        border-radius: 44px;
        margin-bottom: 20px;
    }

    .case > div:last-child {
        margin-bottom: 40px;
    }

    .case > div:nth-child(2n+1) {
        background-color: #ffcf10;
    }

    .case > div:nth-child(2n) {
        background-color: #10e0ff;
    }

    .instruction > h1 {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #333333;
        margin-bottom: 20px;
    }

    .instruction > div {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #666666;
    }
</style>