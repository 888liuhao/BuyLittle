<template>
  <div>
    <van-tabs v-model="active" sticky @click="onClick">
      <van-tab v-for="item in tabs" :title="item.title" :key="item.status">
        <van-card @click="orderDetailsPage(order)" v-for="order in allOrderGoodsFrom" :key="order.id" :num="order.number" :price="order.total_price" :desc="order.pay_way" :title="order.goods_Info.message[0].title" :thumb="order.goods_Info.message[0].thumb_path">
          <template #tags>下单时间: {{ order.add_time | timeFormat('YYYY-MM-DD HH-mm-ss') }}</template>
          <template #footer>
            <template v-if="order.status === 0">
              <van-button size="mini" @click="service">联系客服</van-button>
              <van-button size="mini" >立即付款</van-button>
            </template>
            <template v-if="order.status === 2 && order.is_out === 1 && order.is_take === 1">
              <van-button size="mini" v-clipboard:copy="order.order_id" v-clipboard:success="onCopy">复制订单号
              </van-button>
              <van-button size="mini">交易成功</van-button>
              <van-button size="mini">评价</van-button>
            </template>

          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getOrderInfo } from '../api/orderForm.js'
import { gettingGoodCat } from '../api/shops.js'
export default {
  name: 'MyAddress',
  data() {
    return {
      active: 0,
      tabs: [
        { status: 'all', title: '全部' },
        { status: '0', title: '未付款' },
        { status: '1', title: '已付款' },
        { status: '2', title: '交易成功' },
      ],
      allOrderGoods: [],
      status: 'all'
    }
  },
  created() {
    this._getOrderInfo()
  },
  computed: {
    allOrderGoodsFrom() {
      if (this.status === 'all') {
        return this.allOrderGoods
      }

      return this.allOrderGoods.filter((order) => order.status == this.status)
    }
  },
  methods: {
    //获取用户订单数量
    async _getOrderInfo() {
      let user_id = this.$store.state.userInfo.id
      let orderData = await getOrderInfo(user_id)
      //用户订单数量返回的数据并没有商品信息，只有id，所以得通过获取商品信息
      //需要在每个订单里添加一个商品信息goods_Info,便于循环
      let promisArr = []
      orderData.forEach(order => {
        promisArr.push(gettingGoodCat(order.goods_ids))
      });
      //并发请求
      let allArrGoods = await Promise.all(promisArr)
      //并入用户订单数量信息里面
      orderData = orderData.map((order, index) => {
        order.goods_Info = allArrGoods[index]
        return order
      })
      this.allOrderGoods = orderData
      // console.log(this.allOrderGoods);
    },
    //构造tab的状态status
    onClick(idnex, title) {
      let statusMap = {
        '全部': 'all',
        '未付款': '0',
        '已付款': '1',
        '交易成功': '2',
      }
      this.status = statusMap[title]
    },
    //复制订单号
    onCopy() {
      event.stopPropagation(); //阻止事件冒泡。防止点击复制订单号时跳转到订单详情页
      this.$toast('复制成功')
    },
    //联系客服
    service(){
        event.stopPropagation();
        this.$dialog.confirm({
            message:'确认需要联系客服吗'
        })
        .then(() => {
            window.location.href = "tel:13826666669"
        }).catch(() =>{

        })
    },
    //点击订单跳转详情页
    orderDetailsPage(order){
        let order_id = order.order_id
        this.$router.push('/orderDetailsPage/' + order_id)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>