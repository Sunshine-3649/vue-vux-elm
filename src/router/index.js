import Vue from 'vue';
import Router from 'vue-router';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Sellers from '@/components/sellers/sellers';

// 全局样式
import '@/common/stylus/index.styl';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: Sellers
    }
  ]
});
