<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<script>
import axios from 'axios';
import { urlParse } from '@/common/js/util';
import vHeader from '@/components/header/header';
export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    };
  },
  components: {
    vHeader
  },
  created() {
    axios.get('/api/seller?' + this.seller.id).then(res => {
      const result = res.data;
      if (result.errno === 0) {
        // this.seller = result.data;
        this.seller = Object.assign({}, this.seller, result.data);
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl'
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: solid 1px rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      &>a
        display: block
        font-size: 14
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>

