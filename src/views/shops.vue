<template lang="">
    <div>
        
    <van-swipe-cell v-for="(item,index) in dataGoods" :key="item.id">
      <van-card :price="item.sell_price" desc="规格A" :title="dataGoods[index].title" class="goods-card" :thumb="dataGoods[index].thumb_path">
        <template #footer>
          <div class="box">
            <van-checkbox  v-model="$store.getters.onchecke[item.id]" @click="onechecke($store.getters.onchecke[item.id],index)">选中</van-checkbox>            
            <van-stepper v-model:value="nums[index]" theme="round" button-size="22" :name="item.id" @change="inNun(nums[index],item.id)" disable-input />
          </div>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="delet(item.id,index)"/>
      </template>
    </van-swipe-cell>

    <!-- 无商品时展示 -->
    <div v-if="dataGoods.length === 0">
      <van-empty description="您的购物车空空如也，去商城看看吧" :image="cat">
        <van-button type="danger" class="bottom-button" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="$router.replace('/home/index')">买亿点</van-button>
      </van-empty>
    </div>
    <!-- 提交订单 -->
        <van-submit-bar :price="$store.getters.totalpirce" button-text="提交订单">
            <van-checkbox :value="$store.getters.allselected" @click="allsls($store.getters.allselected)" class="zite">
            合计{{$store.getters.totalNumber}}件商品</van-checkbox>
            <template #tip>
            支持微信、支付宝付款
            </template>
        </van-submit-bar>
    </div>
</template>
<script>
import { gettingGoodCat } from '../api/shops.js'
import cat from '../assets/imgs/car.png'
export default {
  data() {
    return {
      cat,
      ids: this.$store.getters.ids,
      dataGoods:[],
      nums:[]
    }
  },
  created() {
    this.getting();
    this.nums =  this.$store.state.goodPlenty.map(item => item.number)
  },
  methods: {
    //进来购物车获取数据
    async getting() {
        if(this.$store.state.goodPlenty.length > 0){
            let ids = this.ids.join()
            const data =  await gettingGoodCat(ids)
            this.dataGoods = data.message;
        }
    },
    //单选
    onechecke(sls, index) {
      this.$store.commit({
        type: 'onchecke',
        sls,
        index
      })
    },
    //全选
    allsls(e) {
      this.$store.commit('allselected', e)
    },
    //加减商品
    inNun(val,id) {
      console.log(val,id);
      this.$store.commit('quantity', {val,id});
    },
    //删除
    delet(id,index) {
      this.$store.commit('delet', id)
      this.dataGoods.splice(index,1)
    }
  },
}
</script>
<style lang="scss" scoped>
.delete-button {
  height: 100%;
}

.box {
  display: flex;
  justify-content: space-between;

}

.van-submit-bar {
  margin-bottom: 50px;
}
</style>