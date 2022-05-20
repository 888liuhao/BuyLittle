<template lang="">
<!-- 头部栏搜索 -->
<div class="box">
    <div class="navbox">
        <div class="logobox">
            <img src="../assets/imgs/logo.png" >
        </div>
        <van-search v-model="value" placeholder="请输入搜索关键词"  />
    </div>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swipeimg" :key="item.img">
            <img :src="item.img" >
        </van-swipe-item>
    </van-swipe>
    <!-- 九宫格 -->
    <van-grid :column-num="4">
        <van-grid-item v-for="item in Sudoku" :key="item.title" :to="item.to">
            <van-image :src="item.img"/>
            <span class="Sudokutitle">{{item.title}}</span>
        </van-grid-item>
    </van-grid>
    <!-- 商品推荐 -->
    <van-divider class="shoptitle" :style="{borderColor: '#181818'}">精选好物</van-divider>
    <div class="lotGoods">
        <goods v-for="item in homeGoodData" :data="item" :key="item.id" @goodinfo="inGood" />
    </div>
    

    <!-- 回顶部 -->
    <backTop :scrollTop="500"></backTop>
</div>
</template>
<script>
//引入api
import { foreachHome,foreachGoods } from '../api/Home.js'
import backTop from '../componets/backTop.vue'
import goods from '../componets/goods.vue'

export default {
    name:'Home',
    data() {
        return {
            value: "",
            swipeimg:[],
            Sudoku:[
                {img:'../src/assets/imgs/1.png',title:'买亿点超商',to:'/supermarket'},
                {img:'../src/assets/imgs/2.png',title:'新闻列表',to:'/newslist'},
                {img:'../src/assets/imgs/3.png',title:'亿点生鲜',to:'/newslist'},
                {img:'../src/assets/imgs/4.png',title:'生活缴费',to:'/newslist'},
                {img:'../src/assets/imgs/5.png',title:'领精贴',to:'/newslist'},
                {img:'../src/assets/imgs/6.png',title:'puls会员',to:'/newslist'},
                {img:'../src/assets/imgs/7.png',title:'领亿豆',to:'/newslist'},
                {img:'../src/assets/imgs/8.png',title:'更多',to:'/newslist'},
            ],
            homeGoodData:[],
        };
    },
    created(){
        this.swipepic()
        this.homeGoods()
    },
    methods:{
        async swipepic(){
            const data = await foreachHome()
            this.swipeimg = data.message
        },
        async homeGoods(){
            const data = await foreachGoods()
            this.homeGoodData = data.message
        },
        inGood(data){
            this.$router.push(`/goodinfo/${data.id}`)
        }
    },
    components:{
        backTop,
        goods
    }
};
</script>
<style lang="scss" scoped>
.box{
    background-color: #f6f6f6;
}
.navbox {
    display: flex;
    align-items: center;
    // background-color: #1d9eff;

    .logobox {
        width: 50px;
        height: 54px;
        background-color: white;

        img {
            width: 100%;
            margin-left: 5px;
            margin-top: 2px;
            transform: scale(0.9);
        }
    }

    .van-search {
        flex: 1;
        // background-color: #1d9eff;
    }
}
.my-swipe {
    height: 200px;
        .van-swipe-item {
            height: 200px;
            padding: 7px;
                img{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: 12px;
                }   
        }
}
.van-grid{
    
    .van-grid-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #666;

        .van-image{
            width: 50%;
        }
        .Sudokutitle{
            margin-top: 6px;
        }
    }
}
.shoptitle{
    font-size:17px;
    color: black;
    padding: 0 15px;
}
.lotGoods{
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

}
</style>