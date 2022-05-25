<template lang="">
    <div>
      <!-- 地址栏 -->
      <div v-if="dataGoods.length">
          <div class="address" v-if="address">
            <div class="address1"><van-icon name="logistics" size="40px" /></div>
            <div class="address2">
              <span>{{myAddress.name}}</span> <span>{{myAddress.tel}}</span>
              <div class="van-ellipsis">地址：{{myAddress.dz}}</div>
            </div>
          </div>
      </div>
        
    <van-swipe-cell v-for="(item,index) in dataGoods" :key="item.id">
      <van-card :price="item.sell_price" desc="规格A" :title="dataGoods[index].title" class="goods-card" :thumb="dataGoods[index].thumb_path">
        <template #footer>
          <div class="box">
            <van-checkbox  v-model="onchecke[index]" @click="onechecke($store.getters.onchecke[index],index)">选中</van-checkbox>            
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
        <van-submit-bar :price="$store.getters.totalpirce" @submit="commitCar" :disabled="isDiss" button-text="提交订单">
            <van-checkbox :value="$store.getters.allselected" @click="allsls($store.getters.allselected)" class="zite">
            合计{{$store.getters.totalNumber}}件商品</van-checkbox>
            <template #tip>
            支持微信、支付宝付款
            </template>
        </van-submit-bar>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { gettingGoodCat } from '../api/shops.js'
import { getAddress } from '../api/personalname.js'
import { SubmitCar } from '../api/orderForm.js'
import { stochasticOrder } from '../utils/tools.js'
import cat from '../assets/imgs/car.png'
export default {
  data() {
    return {
      cat,
      ids: this.$store.getters.ids,
      isDis: true,
      dataGoods: [],
      myAddress: {},
      address: false,
      nums: []
    }
  },
  created() {
    this._getAddress()
    this.getting();
    this.nums = this.$store.state.goodPlenty.map(item => item.number)
  },
  computed: {
    ...mapGetters(['onchecke', 'totalpirce', 'totalNumber']),
    isDiss() {
      if (this.onchecke && this.dataGoods.length > 0) {
        this.isDis = false
      } else {
        this.isDis = true
      }
      return this.isDis
    }
  },
  methods: {
    //进来时获取用户的收货地址
    async _getAddress() {
      let user_id = this.$store.state.userInfo.id
      const result = await getAddress(user_id)
      if (result.length === 0) {
        this.address = false
        this.$dialog.confirm(
          {
            message: '请完善收货地址'
          })
          .then(() => { this.$router.push('/MyOrder') })
          .catch(() => { this.$router.push('/home/index') })
        return
      } else {
        this.address = true
      }
      if (result.length === 1) {
        let { province, city, country, addressDetail } = result[0]
        result[0].dz = `${province}${city}${country}${addressDetail}`
        return this.myAddress = result[0]
      }
      result.forEach(item => {
        if (item.isDefault) {
          let { province, city, country, addressDetail } = item
          item.dz = `${province}${city}${country}${addressDetail}`
          return this.myAddress = item
        }
      })
    },
    //进来购物车获取数据
    async getting() {
      if (this.$store.state.goodPlenty.length > 0) {
        let ids = this.ids.join()
        const data = await gettingGoodCat(ids)
        this.dataGoods = data.message;
      }
    },
    //单选
    onechecke(sls, index) {
      console.log(sls, index);
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
    inNun(val, id) {
      this.$store.commit('quantity', { val, id });
    },
    //删除
    delet(id, index) {
      this.$store.commit('delet', id)
      this.dataGoods.splice(index, 1)
    },
    //提交订单
    async commitCar() {
      let orderData = {
        user_id: this.$store.state.userInfo.id,
        order_id: stochasticOrder(),
        address_id: this.myAddress.id,
        total_price: this.totalpirce / 100,
        number: this.totalNumber,
        goods_ids: this.ids.join()
      }
      const { message, status } = await SubmitCar(orderData)
      this.$toast.loading({
        duration:0,
        message: '提交订单中...',
        forbidClick: true,
      });
      this.$toast.clear(message);
      if (status !== 0) {
          this.$toast('网络繁忙')
          return
      }
      this.$store.commit('emptyCar')
      this.$router.replace('/MyAddress')
    }
  },
}
</script>
<style lang="scss" scoped>
.address {
  height: 55px;
  margin-top: 10px;
  padding: 0 20px;
  border-radius: 10px;
  display: flex;
  background-color: #f5f1d0;
  justify-content: flex-start;

  .address1 {
    margin-top: 7px;
  }

  .address2 {
    width: 300px;
    margin-left: 35px;
    font-size: 26px;
  }
}

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