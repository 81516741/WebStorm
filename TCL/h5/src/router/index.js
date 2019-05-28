import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home'
import home_more from '../components/home/more'
import home_play from '../components/home/play'
import home_album_details from '../components/home/album_details'
import home_search from '../components/home/search'
import home_search_result from '../components/home/search_result'
import home_search_result_more from '../components/home/search_result_more'
import channel from '../components/channel/channel'
import channel_edit from '../components/channel/channel_edit'
import programme_edit from '../components/channel/programme_edit'
import programme_select from '../components/channel/programme_select'
import skill from '../components/skill/skill'
import skill_introduction from '../components/skill/skill_introduction'
import clock from '../components/clock/clock'
import clock_edit from '../components/clock/clock_edit'
import oauth from '../components/smart_home/oauth'
import common_problem from '../components/common_problem/common_problem'
import test from '../components/home/test'

Vue.use(Router);

export default new Router({ // 创建 router 实例，然后传 `routes` 配置
    routes: [{
        path: '',
        redirect: '/home',//设置默认指向的路径(重定向)
        name: '首页'
    }, {
      path: '/home/test',
      name: 'test',
      component: test
    }, {
      path: '/home', //访问路径
      name: 'home', //路径名
      component: home //访问的组件，即访问‘/home’,它会加载home组件所有的内容
    }, {
        path: '/home/more',
        name: 'home_more',
        component: home_more
    }, {
        path: '/home/play',
        name: 'home_play',
        component: home_play
    }, {
        path: '/home/album_details',
        name: 'home_album_details',
        component: home_album_details
    }, {
        path: '/home/search',
        name: 'home_search',
        component: home_search
    }, {
        path: '/home/search/result',
        name: 'home_search_result',
        component: home_search_result
    }, {
        path: '/home/search/result/more',
        name: 'home_search_result_more',
        component: home_search_result_more
    }, {
        path: '/channel',
        name: 'channel',
        component: channel
    }, {
        path: '/channel/channel_edit',
        name: 'channel_edit',
        component: channel_edit
    }, {
        path: '/channel/channel_edit/programme_edit',
        name: 'programme_edit',
        component: programme_edit
    }, {
        path: '/channel/channel_edit/programme_edit/programme_select',
        name: 'programme_select',
        component: programme_select
    }, {
        path: '/skill',
        name: 'skill',
        component: skill
    }, {
        path: '/skill/introduction',
        name: 'skill_introduction',
        component: skill_introduction
    }, {
        path: '/clock',
        name: 'clock',
        component: clock
    }, {
        path: '/clock/clock_edit',
        name: 'clock_edit',
        component: clock_edit
    }, {
        path: '/smart_home/oauth',
        name: 'oauth',
        component: oauth
    },{
        path: '/common_problem',
        name: 'common_problem',
        component: common_problem
    }, ]
})
