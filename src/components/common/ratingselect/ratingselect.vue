<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{ratings.length - positives.length}}</span></span>
    </div>
    <div @click="toggleCount" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  name: 'rating',
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('select', type);
    },
    toggleCount() {
      if (!event._constructed) {
        return;
      }
      this.$emit('toggle');
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin.styl'
.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    display: block
    .block
      display: inline-block
      padding: 8px 12px
      line-height: 16px
      margin-right: 8px
      border-radius: 1px
      color: rgb(77, 85, 93)
      &.active
        color: #ffffff
      .count
        font-size: 8px
        margin-left: 8px
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 160, 220, 0.2)
        &.active
          background: rgb(77, 85, 93)
  .switch
    padding 12px 18px
    line-height 24px
    border-bottom solid 1px rgba(7,17,27,0.1)
    color rgb(147,153,159)
    font-size 0
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      display inline-block
      margin-right 4px
      font-size 24px
    .text
      display inline-block
      font-size 12px
      vertical-align top

</style>
