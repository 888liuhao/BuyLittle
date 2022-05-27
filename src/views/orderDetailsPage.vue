<template>
  <div class="box">

    <div class="box1">
      <div class="box2">{{detectionAct}}</div>
      <span style="color:white;font-size:16px">订单完成时间:&nbsp;&nbsp;&nbsp;{{orData.add_time | timeFormat('YYYY-MM-DD HH:mm')}}</span>
      <div class="imgs">
        <img src="../assets/imgs/222.png" alt="">
      </div>
    </div>

    <div>
      <div class="address">
        <div class="address1">
          <van-icon name="location" color="#00b294" size="40px" />
        </div>
        <div class="address2" v-if="orData.address_info">
          <span>{{orData.address_info.name}}</span> <span>{{orData.address_info.tel}}</span>
          <div class="van-ellipsis">地址：{{orData.address_info.province}}{{orData.address_info.city}}{{orData.address_info.country}}{{orData.address_info.addressDetail}}</div>
        </div>
      </div>
    </div>
    <!-- 商品流程 -->
    <van-steps :active="active" class="boxs">
      <van-step v-for="item in steps" :key="item.status">{{item.title}}</van-step>
    </van-steps>
    <!-- 商品信息 -->
    <van-card class="caedd" v-for="item in orGood" @click="$router.push(`/goodinfo/${item.id}`)" :key="item.id" :num="item.cou" :desc="orData.pay_way" :price="item.sell_price" :title="item.title" :thumb="item.thumb_path"></van-card>

    <!-- 订单信息 -->
    <div class="info">
      <div class="info1">订单信息</div>
      <div class="yy_yy">
        <span>卖家昵称：</span> <span>买亿点商城</span>
      </div>
      <div class="yy_yy">
        <span>商品总价：</span> <span>￥{{orData.total_price}}</span>
      </div>
      <div class="yy_yy">
        <span>运费：</span> <span>￥0.00</span>
      </div>
      <div class="yy_yy">
        <span>实付款：</span> <span>￥{{orData.actual_price}}</span>
      </div>
      <div class="yy_yy">
        <span>订单编号：</span> <span>{{orData.order_id}}</span>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="but">
      <van-button type="primary" size="small" color="#569cb3" v-clipboard:copy="orData.order_id" v-clipboard:success="onCopy">复制订单号</van-button>&nbsp;
      <van-button type="primary" size="small" color="red" v-if="orData.status === 0" @click="payment">立即付款</van-button>&nbsp;
      <template v-if="orData.status === 2">
        <van-button type="primary" size="small" @click="onlogistics">物流信息</van-button>&nbsp;
        <van-button type="primary" size="small">交易成功</van-button>
      </template>
    </div>

    <!-- 物流信息 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <div>
        <div class="address">
          <div class="address1">
            <van-icon name="location" color="#00b294" size="40px" />
          </div>
          <div class="address2" v-if="orData.address_info">
            <span>{{orData.address_info.name}}</span> <span>{{orData.address_info.tel}}</span>
            <div class="van-ellipsis">地址：{{orData.address_info.province}}{{orData.address_info.city}}{{orData.address_info.country}}{{orData.address_info.addressDetail}}</div>
          </div>
        </div>
      </div>

      <van-steps direction="vertical" :active="0">
        <van-step v-for="inFo in logisticsData" :key="inFo.time">
          <h3>{{inFo.location}}</h3>
          <p>{{inFo.time}}</p>
        </van-step>
      </van-steps>
    </van-popup>

  </div>
</template>
<script>
import { getOrder_id, moNiPayment, logistics } from '../api/orderForm.js'
import { gettingGoodCat } from '../api/shops.js'
export default {
  name: 'orderDetailsPage',
  data() {
    return {
      condition: '',
      order_id: this.$route.params.order_id,
      active: 0,
      steps: [
        { status: '0', title: '买家下单' },
        { status: '1', title: '商家接单' },
        { status: '4', title: '买家提货' },
        { status: '2', title: '交易完成' },
      ],
      orData: {},
      orGood: [],
      show: false,
      logisticsData:[]
    }
  },
  computed: {
    detectionAct() {
      let { status } = this.orData
      if (status !== 0) {
        this.active = status + 1
        return '交易成功'
      } else {
        this.active = status
        return '未支付'
      }
    }
  },
  created() {
    this._getOrder_id()
  },
  methods: {
    //获取订单信息
    async _getOrder_id() {
      this.orData = await getOrder_id(this.order_id)
      let { message } = await gettingGoodCat(this.orData.goods_ids)
      this.orGood = message
      // 商品状态变化
      if (this.orData.status !== 0) {
        this.active = (this.orData.status) + 1
        this.condition = '交易成功'
        return
      } else {
        this.active = this.orData.status
        this.condition = '未支付'
        return
      }
    },
    //订单号复制粘贴
    onCopy() {
      this.$toast('复制成功')
    },
    payment() {
      this.$dialog.confirm({
        message: '确认是否立即支付'
      })
        .then(async () => {
          //确认支付
          try {
            await moNiPayment(this.order_id)
            this.$toast({
              message: '支付成功',
              icon: 'gold-coin-o'
            })
            this.orData.status = 2
          } catch (err) {
            this.$toast('网络繁忙')
          }
        })
        .catch(() => {
          //取消支付
        })
    },
    async onlogistics() {
      this.show = !this.show
      const result = await logistics()
      this.logisticsData = result
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #f1f3f4;
  .box1 {
    position: relative;
    padding: 10px;
    height: 150px;
    background-color: #00b294;
    .box2 {
      font-size: 30px;
      color: white;
      margin-top: 20px;
      margin-bottom: 40px;
    }
    .imgs {
      width: 100px;
      position: absolute;
      right: 20px;
      top: 20px;
      img {
        width: 100%;
      }
    }
  }
  .address {
    height: 55px;
    margin-top: 7px;
    padding: 0 20px;
    display: flex;
    background-color: white;
    justify-content: flex-start;

    .address1 {
      margin-top: 5px;
    }

    .address2 {
      width: 300px;
      margin-left: 35px;
      font-size: 26px;
    }
  }
  .boxs {
    margin-top: 7px;
  }
  .caedd {
    background-color: white;
  }
  .info {
    background-color: white;
    margin-top: 7px;
    padding: 15px 15px;
    .info1 {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
  .but {
    background-color: white;
    position: absolute;
    right: 0;
    padding: 15px;
  }
}
</style>