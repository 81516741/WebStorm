<template>
  <div>
    <!--header和面包屑-->
    <nav-header></nav-header>
    <nav-bread>
      <span>测试</span>
    </nav-bread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <!--顶部筛选的条-->
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" :class="{'sort-up':sortFlag}" @click="sortGoods()">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click.stop="showFilterPop">Filter by</a>
        </div>

        <div class="accessory-result">
          <!-- 左边价格筛选的 -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')"
                     v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{item.startPrice}}
                  - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!--商品列表展示-->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in dataList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">价格：{{item.salePrice | currency('$')}} 元</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!--加载更多动画-->
            <load-more v-show="showLoadMore" @loadMore="loadMore" :busy="busy"></load-more>
            <div v-show="!showLoadMore">没有更多数据</div>
          </div>
        </div>
      </div>
    </div>

    <!--弹框-->
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法加入到购物车中!
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>

    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>

    <!--<div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>-->

    <!--fotter-->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import http from 'axios'
  import '../assets/css/base.css'
  import '../assets/css/product.css'

  import NavBread from '../components/NavBread'
  import NavFooter from '../components/NavFooter'
  import NavHeader from '../components/NavHeader'
  import LoadMore from '../components/LoadMore'
  import Modal from '../components/Modal'

  export default {
    name: 'ProductList',
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      LoadMore,
      Modal
    },
    data() {
      return {
        mdShowCart: false,
        mdShow: false,
        page: 1,
        busy: false,
        showLoadMore: true,
        sortFlag: true,
        loading: true,
        filterBy: false,
        overLayFlag: false,
        priceChecked: 'all',
        priceFilter: [{
          startPrice: '0',
          endPrice: '100'
        }, {
          startPrice: '100',
          endPrice: '500'
        }, {
          startPrice: '500',
          endPrice: '1000'
        }],
        dataList: []
      }
    },
    mounted() {
      this.getDeviceList();
    },
    methods: {
      addCart(productID) {
        http.post('/goods/addCart', {
          productId: productID
        }).then((res) => {
          this.mdShowCart = true;
        })
      },
      closeModal() {
        this.mdShow = false;
        this.mdShowCart = false;
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          if (this.showLoadMore) {
            this.busy = false;
          }
          this.getDeviceList(true)
        }, 1000);

      },
      setPriceFilter(index) {
        this.priceChecked = index
        this.dataList = []
        this.page = 1
        this.getDeviceList()
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag
        this.dataList = []
        this.page = 1
        this.getDeviceList()
      },
      getDeviceList(isLoadMore = false) {
        console.log('发送请求');
        http.get('/goods/list', {
          params: {
            'userID': 'dashuai',
            'page': this.page,
            'sort': this.sortFlag ? 1 : -1,
            'pageSize': '4',
            'priceLevel': this.priceChecked
          }
        }).then((res) => {
          let data = res.data;
          if (data.status == '0') {
            if (data.result.list.length == 0) {
              this.showLoadMore = false;
              this.busy = true;
              return;
            }
            if (isLoadMore) {
              this.dataList = this.dataList.concat(data.result.list);
            } else {
              this.dataList = data.result.list;
            }
          } else {
            this.dataList = [];
          }

        })
      }
    }
  }
</script>
