import Test1 from '../views/组件/test'
import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/test/GoodsList'
import Image1 from '../views/test/Image'
import Title from '../views/test/Title'
import GoodsDetail from '../views/test/GoodsDetail'
import ProductList from '../views/ProductList'
import Cart from '../views/Cart'
import Address from '../views/Address'
import OrderConfirm from '../views/OrderConfirm'
import OrderSuccess from '../views/OrderSuccess'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/productList', // 设置默认指向的路径(重定向)
      name: '首页'
    },
    {
      path: '/cart',
      name: 'cart',
      component:Cart
    },
    {
      path: '/productList',
      name: 'productList',
      component: ProductList
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1
    },
    {
      path: '/test',
      name: 'GoodsList',
      components: {
        default: GoodsList,
        title: Title,
        img: Image1
      },
      children: [
        {
          path: 'image',
          name: 'image',
          component: Image1
        },
        {
          path: 'title',
          name: 'title',
          component: Title
        }
      ]
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: GoodsDetail
    }
  ]
})
