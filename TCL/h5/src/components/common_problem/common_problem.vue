<!--PC端调试url： http://localhost:8080/#/common_problem  -->
<template>
    <div class="container">
        <div class="problems">
            <div v-for="(problem,index) of problems">
                <p class="problem">{{index+1}}、{{problem.problem}}</p>
                <p class="answer">{{problem.answer}}</p>
            </div>
        </div>
        <div class="button_contact_customer_service" @click="native.callPhone()">
            {{$t('common_problem.contact_customer_service')}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                problems: [{
                    problem: '为什么音箱并未语音提示配网失败，但是APP直接提示联网激活失败？',
                    answer: '这种情况一般可能是音箱蓝牙连接断开或者APP写数据失败，音箱还未真正进行配网。'
                }, {
                    problem: '为什么音箱提示联网成功，APP却可能显示配网失败？',
                    answer: '因为音箱联网成功后还要进行设备绑定，如果设备绑定失败，也认定是配网没有成功的。'
                },],
            }
        },
    }
</script>

<style scoped>
    .problems {
        position: absolute;
        top: 0;
        bottom: 160px;
        margin-right: 30px;
        overflow: auto;
    }

    p {
        font-size: 32px;
        color: #333333;
    }

    .problem {
        font-family: PingFangSC-Medium;
        margin-top: 22px;
        font-weight: bold;
    }

    .answer {
        font-family: PingFangSC-Light;
        margin-top: 10px;
    }

    .button_contact_customer_service {
        position: absolute;
        bottom: 36px;
        width: 690px;
        height: 88px;
        padding-top: 18px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2099ff;
        border: 1Px solid #dddddd;
        border-radius: 44px;
    }

</style>