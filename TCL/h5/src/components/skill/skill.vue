<!--PC端调试url： http://localhost:8080/#/skill  -->
<template>
    <div>
        <swiper :list="banner_list" :auto=true :loop=true v-model="banner_index"></swiper>
        <div class="container" style="overflow: hidden">
            <div class="hot_skills" style="overflow: hidden">
                <span class="hot">{{$t("skill.hot_skills")}}</span>
                <div v-for="hot_skill of hot_skill_info" @click="load_page_skill_introduction(hot_skill)">
                    <div class="hot_skills_name">{{hot_skill.name}}</div>
                    <div class="hot_skills_case">“{{hot_skill.case}}”</div>
                </div>
            </div>
            <div class="all_skills" v-for="all_skill of all_skill_info ">
                <span>{{all_skill.skill_category_name}}</span>
                <ul>
                    <li v-for="(skill,index) of all_skill.skills" :key="index"
                        @click="load_page_skill_introduction(skill)">
                        <div class="skills_img"><img :src="skill.img"></div>
                        <div class="name_and_case">
                            <h1 class="skills_name">{{skill.name}}</h1>
                            <div class="skills_case">"{{skill.case}}"</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                banner_list: [{
                    img: 'http://img4.imgtn.bdimg.com/it/u=528117596,3961944276&fm=26&gp=0.jpg',
                }, {
                    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=822659286,2600121127&fm=11&gp=0.jpg',
                }, {
                    img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=152330020,98678577&fm=26&gp=0.jpg',
                },],
                banner_index: 0,
                hot_skill_info: [{
                    img: require('../../assets/image/icon_clock.png'),
                    name: '闹钟',
                    case: '明天早上八点叫我起床',
                    instruction_words: '你可以语音操作，设定闹钟或事情提醒，随时记录，方便简单。',
                }, {
                    img: require('../../assets/image/icon_weather.png'),
                    name: '天气',
                    case: '今天的空气质量好吗',
                    instruction_words: '为你提供以下功能： 1.未来五天的气象、温度、风力/风向；2.当天的湿度、空气质量指数、紫外线指数、日出日落时刻、运动指数和穿衣指数。',
                }],
                all_skill_info: [{
                    skill_category_name: '工具',
                    skills: [{
                        img: require('../../assets/image/icon_calculator.png'),
                        name: '计算器',
                        case: '二的平方加三等于多少',
                        instruction_words: '提供加、减、乘、除混合四则运算及其他基本的数学计算，返回运算结果。支持分数，根号，小数。',
                    }, {
                        img: require('../../assets/image/icon_calendar.png'),
                        name: '日历',
                        case: '美国现在几点',
                        instruction_words: '为你提供以下功能： 1.查询节日节气对应的阴阳历日期；2.查询具体日期对应的节日节气；3.查询星座日期；4.查询生肖，年份，年龄；5.查询世界时间；6.查询星期对应的日期；7.查询距离某节日还有几天。',
                    }, {
                        img: require('../../assets/image/icon_translate.png'),
                        name: '翻译',
                        case: '你好的英文',
                        instruction_words: '提供有道的翻译服务，支持中、英、法、日、韩、西班牙、葡萄牙语之间的互译。',
                    },]
                }, {
                    skill_category_name: '生活',
                    skills: [{
                        img: require('../../assets/image/icon_story.png'),
                        name: '故事',
                        case: '我要听阿拉丁的神灯',
                        instruction_words: '为你提供海量故事音频，可以随机点播，也可以指定故事点播，实现智能点播。',
                    }, {
                        img: require('../../assets/image/icon_joke.png'),
                        name: '笑话',
                        case: '我想听笑话',
                        instruction_words: '听点笑话，放松一下，让你开心每一天。',
                    },]
                }, {
                    skill_category_name: '娱乐',
                    skills: [{
                        img: require('../../assets/image/icon_music.png'),
                        name: '音乐',
                        case: '我想听钢琴曲',
                        instruction_words: '支持通过歌曲名、歌手名、风格、场景等形式进行点歌。音乐资源丰富，满足您的各个情景需求。',
                    }, {
                        img: require('../../assets/image/icon_quyi.png'),
                        name: '曲艺',
                        case: '播放郭德纲的相声',
                        instruction_words: '为你提供大量曲艺音频，包括相声、小品、评书，传播具有民族色彩的表演艺术。',
                    },]
                },],
            }
        },
        created() {

        },
    }
</script>

<style scoped>
    .hot_skills {
        margin-top: 11px;
    }

    span {
        display: block;
        font-family: PingFangSC-Medium;
        font-size: 23px;
        font-weight: 600;
        color: #333333;
    }

    .hot_skills > div {
        margin-top: 20px;
        width: 340px;
        height: 187px;
        float: left;
    }

    .hot_skills > div:nth-child(2n) {
        margin-right: 10px;
        background: url("../../assets/image/hot_skill1.png") no-repeat;
        background-size: 340px 187px;
    }

    .hot_skills > div:nth-child(2n+1) {
        background: url("../../assets/image/hot_skill2.png") no-repeat;
        background-size: 340px 187px;
    }

    .hot_skills_name {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #ffffff;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .hot_skills_case {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #ffffff;
        text-align: center;
    }

    .all_skills {
        margin-top: 40px;
    }

    li {
        overflow: hidden;
        height: 140px;
        border-bottom: 1Px solid #dddddd;
    }

    .skills_img {
        margin-top: 40px;
        float: left;
        width: 61px;
        height: 61px;
    }

    .name_and_case {
        margin-left: 20px;
        padding-left: 61px;
    }

    .skills_name {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        margin-top: 30px;
        margin-bottom: 8px;
    }

    .skills_case {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #666666;
    }

</style>
