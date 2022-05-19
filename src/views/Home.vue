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
        <van-grid-item v-for="item in Sudoku" :key="item.title">
            <van-image :src="item.img"/>
            <span class="Sudokutitle">{{item.title}}</span>
        </van-grid-item>
    </van-grid>
    <!-- 商品推荐 -->
    <van-divider dashed class="shoptitle">精选好物</van-divider>
    <div class="lotGoods">
        <div class="oneGoods" v-for="item in homeGoodData" :key="item.id">
            <div class="pngGoods">
                <img v-lazy="item.img_url">
            </div>
            <div class="titleGoods ellipsis_line_2">{{item.title}}</div>
            <div class="twoSpan">
                <span class="leftjia">&yen;<em class="leftzi">{{item.sell_price}}</em></span>
                <span class="rigzi">{{item.likes}}条评论+</span>
            </div>
        </div>
    </div>
    

    <!-- 回顶部 -->
    <backTop :scrollTop="500"></backTop>
</div>
</template>
<script>
//引入api
import { foreachHome,foreachGoods } from '../api/Home.js'
import backTop from '../componets/backTop.vue'

export default {
    name:'Home',
    data() {
        return {
            value: "",
            swipeimg:[],
            Sudoku:[
                {img:'../src/assets/imgs/1.png',title:'买亿点超商'},
                {img:'../src/assets/imgs/2.png',title:'新闻列表'},
                {img:'../src/assets/imgs/3.png',title:'亿点生鲜'},
                {img:'../src/assets/imgs/4.png',title:'生活缴费'},
                {img:'../src/assets/imgs/5.png',title:'领精贴'},
                {img:'../src/assets/imgs/6.png',title:'puls会员'},
                {img:'../src/assets/imgs/7.png',title:'领亿豆'},
                {img:'../src/assets/imgs/8.png',title:'更多'},
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
        }
    },
    components:{
        backTop,
    }
};
</script>
<style lang="scss">
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
                img{
                    width: 100%;
                    height: 100%;
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
}
.lotGoods{
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .oneGoods{
        width: 200px;
        height: 290px;
        border-radius: 10px;
        background-color: white;
        overflow: hidden;
        margin-bottom: 13px;
        padding: 6px;

        .pngGoods{
            border-radius: 10px;
            overflow: hidden;
            width: 190px;
            height: 190px;
            
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
    .titleGoods{
        height: 45px;
        font-size: 18px;
        padding: 6px;
    }
    .twoSpan{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .leftjia{
            color:red;
            font-size: 16px;
            margin-top: 5px;
            .leftzi{
                font-size: 26px;
                color: red;
                font-style: normal;
                margin-top: 10px;
            }
        }
        .rigzi{
            display: flex;
            justify-content: center;
            align-items:center;
            height: 20px;
            font-size: 12px;
            background-color: #f6f6f6;
            border-radius: 5px;
            margin-top: 14px;
            color:#666;
        }
    }
}
</style>