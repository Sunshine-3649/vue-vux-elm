<template>
  <div>
    <div class='goods'>
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :key="item.type" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
            <span class="text">
              <span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wraper" ref="foodWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="food-list" ref="foodList">
            <h2 class="title">{{item.name}}</h2>
            <ul>
              <li v-for="(food,index) in item.foods" :key="index" @click="selectFood(food, $event)" class="food-item">
                <div class="icon"><img :src="food.icon" width="57" height="57" alt=""></div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliverPrice="seller.deliverPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart';
import food from '@/components/food/food';
import cartcontrol from '@/components/common/cartcontrol/cartcontrol';
const ERR_OK = 0;
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      goods: [],
      listHight: [], // 右侧列表的高度区间
      scrollY: 0,
      selectedFood: {}
    };
  },
  components: {
    shopcart,
    cartcontrol,
    food
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHight.length; i++) {
        let height1 = this.listHight[i];
        let height2 = this.listHight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // this._followScroll(i);
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    axios.get('/api/goods').then(res => {
      const result = res.data;
      if (result.errno === ERR_OK) {
        this.goods = result.data;
        console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          // 计算高度
          this._calculateheight();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });

      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateheight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHight.push(height);
      for (var i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    addFood(target) {
      this._drop(target);
    },
    _drop(target) {
      this.$nextTick(() => {
        // 调用子组件的方法
        this.$refs.shopcart.drop(target);
      });
    },
    // 点击获取food组件数据
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      line-height: 14px
      padding: 0 12px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #ffffff
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        font-size: 12px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
  .foods-wraper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: solid 2px #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      vertical-align: middle
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        padding-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
