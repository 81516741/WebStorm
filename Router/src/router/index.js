import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import My from '@/components/My'
import Other from '@/components/Other'
import NotFound from '@/components/NotFound'
import GuoChan from '@/components/GuoChan'
import OuMei from '@/components/OuMei'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home/:name',
      name: 'home',
      component: Home
    },
    {
      path: '/other',
      name: 'other',
      component: Other,
      children: [
        {name: 'other_guochan', path: 'guochan', component: GuoChan},
        {name: 'other_oumei', path: 'oumei', component: OuMei}
      ]
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/duo',
      name: 'duo',
      components: {
        home: Home,
        my: My,
        other: Other
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
