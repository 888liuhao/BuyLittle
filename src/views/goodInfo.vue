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
        <van-notice-bar
        left-icon="like"
        color="#fd566c"
        :text="info.zhaiyao"/>
        <!-- 商品详情 -->
        <!-- 购买 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="shop-o" text="店铺" />
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
            </van-goods-action>
        </div>
</template>
<script>
import { ImagePreview } from 'vant';
import { foreachgoodInfo, foreachgoodInfoo } from '../api/Home.js'
export default {
    name: "goodInfo",
    props: ['id'],
    data() {
        return {
            lunbo: [],
            info: '',
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
        },
        async foreachgoodInfoo_() {
            const result = await foreachgoodInfoo(this.id)
            this.info = result.message
        },
        glance(){
            ImagePreview({
                images:this.lunbo
            })
        }
    },

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
</style>