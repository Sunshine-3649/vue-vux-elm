<template>
  <div class='header'>
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!-- 弹出层 -->
    <div class="detail" v-show="detailShow" @click="detailShow = false">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <star :score="3" :size="24"></star>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/common/star/star';
export default {
  name: 'header',
  data() {
    return {
      detailShow: false
    };
  },
  components: {
    star
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'sepcial'];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    }
  }

};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  color: #ffffff
  background: rgba(7, 17, 27, 0.5)
  overflow: hidden
  position: relative
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      display: inline-block
      margin-left: 16px
      font-size: 14px
      vertical-align: top
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          // background-image: url('brand@2x.png')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        margin-bottom: 10px
        line-height: 12px
        font-size: 12px
      .support
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.sepcial
            bg-image('special_1')
        .text
          line-height: 12px
          vertical-align: top
          font-size: 12px
    .support-count
      padding: 0 8px
      position: absolute
      right: 12px
      bottom: 18px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: rgba(7, 17, 27, 0.2)
    .bulletin-title
      vertical-align: top
      margin-top: 8px
      display: inline-block
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      right: 12px
      bottom: 8px
      font-size: 10px
  .background
    filter: blur(10px)
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
  .detail
    position: fixed
    letf: 0
    top: 0
    z-index: 100
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(7, 17, 27, 0.8)
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16xp
          text-align: center
          font-size: 16px
          font-weight: 700
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
</style>

