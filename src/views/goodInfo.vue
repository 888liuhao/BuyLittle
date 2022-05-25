<template lang="">
    <div class="box">
        <!-- 轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in lunbo" :key="item.src" @click="glance">
                <img :src="item">
            </van-swipe-item>
        </van-swipe>
        <!-- 商品标题信息 -->
        <div class="box2">
            <div class="foot">
            <span class="leftjia">&yen;&nbsp;<em class="leftzi">{{info.sell_price}}</em></span>
            <van-icon name="star" color="#ee0a24" size="24px"/>
            </div>
            <div class="titleGoods ellipsis_line_2">{{info.title}}</div>
        </div>
        <van-notice-bar left-icon="like" color="#fd566c" :text="info.zhaiyao" />
        <!-- 商品详情 -->
        <div class="box3">
            <div class="box4">产品介绍</div>
            <div class="box5" v-html="info.content"></div>
        </div>

        <!-- 购买 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="shop-o" text="店铺" @click="$router.replace('/home/index')" />
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="cart(true)" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="buy(false)" />
        </van-goods-action>
        <!-- 回顶部 -->
        <backTop />

        <!-- Sku商品规格 -->
        <van-sku
        v-model="show" 
        :sku="sku"
        :goods="goods" 
        :goods-id="info.id"
        :reset-stepper-on-hide="true"
        :hide-stock="sku.hide_stock"
        :show-add-cart-btn="btnshow"
        @buy-clicked="addBuy"
        @add-cart="addCart"
        />



    </div>
</template>
<script>
import backTop from '../componets/backTop.vue'
import { ImagePreview } from 'vant';
import { foreachgoodInfo, foreachgoodInfoo } from '../api/Home.js'
export default {
  name: "goodInfo",
  props: ['id'],
  data() {
    return {
      btnshow: true,
      show: false,
      lunbo: [],
      info: '',
      sku: {
        tree: [
          {
            k: '商品规格',
            k_s: 's1',
            v: [
              {
                id: '1', // skuValueId：规格值 id
                name: '规格A', // skuValueName：规格值名称
              },
            ]
          }
        ],
        list: [
          {
            id: 2259, // skuId
            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品 库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: ''
      }
    }
  },
  created() {
    this.foreachgoodInfo_(this.$route.params.id)
    this.foreachgoodInfoo_()
  },
  methods: {
    async foreachgoodInfo_(id) {
      const result = await foreachgoodInfo(id)
      this.lunbo = result.message.map(item => item.src)  //改造数据
      this.goods.picture = this.lunbo[0]
    },
    async foreachgoodInfoo_() {
      const result = await foreachgoodInfoo(this.id)
      this.info = result.message
      // this.sku.price = this.info.sell_price
      this.sku.stock_num = this.info.stock_quantity
      this.sku.list[0].id = this.id
      this.sku.list[0].stock_num = this.info.stock_quantity
      this.sku.list[0].price = this.info.sell_price * 100

    },
    glance() {
      ImagePreview({
        images: this.lunbo
      })
    },
    //打开立即购买
    buy(boolean) {
      this.show = true
      this.btnshow = boolean
    },
    //打开加入购物车
    cart(boolean) {
      this.show = true
      this.btnshow = boolean
    },
    //加入购物车
    addCart(skuData) {
      let { goodsId, selectedNum } = skuData
      let item = { id: goodsId, number: selectedNum, pirce: this.info.sell_price, selected: true }
      //提交到仓库
      this.$store.commit('addGoodsCat', item)
      this.show = false
      this.$toast('加入购物车成功')
    },
    //购买
    addBuy(skuData) {

    }

  },
  components: {
    backTop
  }

}
</script>
<style lang="scss" scoped>
.box {
  background-color: #f6f6f6;
}

.my-swipe {
  height: 350px;

  .van-swipe-item {
    line-height: 350px;

    // background-color: #39a9ed;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
}

.box2 {
  background-color: white;
  border-radius: 20px;
  margin-top: 7px;
  padding: 10px;
  margin-bottom: 10px;

  .foot {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .leftjia {
      color: red;
      font-size: 16px;
      margin-top: 5px;

      .leftzi {
        font-size: 26px;
        color: red;
        font-style: normal;
        margin-top: 10px;
      }
    }
  }

  .titleGoods {
    height: 45px;
    font-size: 18px;
    padding: 6px;
  }
}

.box3 {
  margin-top: 10px;
  background-color: white;
  border-radius: 30px;
  padding: 10px 0 0 0;

  .box4 {
    text-align: center;
    font-size: 22px;
  }

  .box5 {
    font-size: 18px;
    padding: 0 10px;

    ::v-deep img {
      width: 100%;
      height: 100%;
    }

    ::v-deep table {
      width: 100%;
      height: 100%;
    }
  }
}
</style>