<template lang="">
    <div>
        
    <van-swipe-cell v-for="(item,index) in dataGoods" :key="item.id">
      <van-card :price="item.pirce" desc="规格A" :title="dataGoods[index].title" class="goods-card" :thumb="dataGoods[index].thumb_path">
        <template #footer>
          <div class="box">
            <van-checkbox  v-model="$store.getters.onchecke[item.id]" @click="onechecke($store.getters.onchecke[item.id],index)">选中</van-checkbox>
            <van-stepper :value="item.number" theme="round" button-size="22" :name="index" @change="inNun" disable-input />
          </div>
        </template>
      </van-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="delet(item.id,index)"/>
      </template>
    </van-swipe-cell>
        
        <van-submit-bar :price="$store.getters.totalpirce" button-text="提交订单">
            <van-checkbox :value="$store.getters.allselected" @click="allsls($store.getters.allselected)" class="zite">
            合计{{$store.getters.totalNumber}}件商品</van-checkbox>
            <template #tip>
            支持微信、支付宝付款
            </template>
        </van-submit-bar>
        {{$store.getters.ids}}
    </div>
</template>
<script>
import { gettingGoodCat } from '../api/shops.js'
export default {
  data() {
    return {
      ids: this.$store.getters.ids,
      dataGoods:[]
    }
  },
  created() {
    this.getting()
  },
  methods: {
    //进来购物车获取数据
    async getting() {
        let ids = this.ids.join()
        const data =  await gettingGoodCat(ids)
        this.dataGoods = data.message
        console.log(data.message);
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
    inNun(val, { name }) {
      this.$store.commit({
        type: 'quantity',
        val,
        name
      })
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