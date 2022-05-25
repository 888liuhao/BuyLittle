<template lang="">
    <div>
        <van-tabs v-model="active" sticky @click="onClick">
            <van-tab v-for="item in tabs" :title="item.title" :key="item.status">
                <van-card v-for="order in allOrderGoodsFrom" :num="order.number" :price="order.total_price" :desc="order.pay_way" :title="order.goods_Info.message[0].title" :thumb="order.goods_Info.message[0].thumb_path">
                    <template #footer>
                        <van-button size="mini">按钮</van-button>
                        <van-button size="mini">按钮</van-button>
                    </template>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import {getOrderInfo} from '../api/orderForm.js'
import {gettingGoodCat} from '../api/shops.js'
export default {
    name:'MyAddress',
    data(){
        return {
            active:0,
            tabs:[
                {status:'all',title:'全部'},
                {status:'0',title:'未付款'},
                {status:'1',title:'已付款'},
                {status:'2',title:'完成'},
            ],
            allOrderGoods:[],
            status:'all'
        }
    },
    created(){
        this._getOrderInfo()
    },
    computed:{
        allOrderGoodsFrom(){
            if(this.status === 'all'){
                return this.allOrderGoods
            }

            return this.allOrderGoods.filter((order) => order.status == this.status)
        }
    },
    methods:{
        //获取用户订单数量
        async _getOrderInfo(){
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
            orderData = orderData.map((order,index) => {
                order.goods_Info = allArrGoods[index]
                return order
            })
            this.allOrderGoods = orderData
        },
        //构造tab的状态status
        onClick(idnex,title){
            let statusMap = {
                '全部':'all',
                '未付款':'0',
                '已付款':'1',
                '完成':'2',
            }
            this.status = statusMap[title]
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>