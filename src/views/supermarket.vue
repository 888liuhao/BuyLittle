<template lang="">
    <div>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="lotGoods">
               <goods v-for="item in list" :key="item.id" :data="item" @goodinfo="inGood"></goods>
            </div>
            </van-list>
        </van-pull-refresh>

    </div>
</template>
<script>
import goods from '../componets/goods.vue'
import { foreachsupermarket } from '../api/Home.js'
import router from '../router';
export default {
    data() {
        return {
            list: [],
            page:0,
            pagesize:10,
            loading: false,  //是否正在加载中
            finished: false,    //是否加载完毕
            refreshing: false,  //是否在刷新中
        };
    },
    methods: {
        //上拉加载数据 进入或刷新当前页会默认调用一次
        onLoad() {
            console.log(11);
            this.page++
            this.foreachsupermarket_()
        },
        //下拉刷新
        onRefresh() {
            // 清空列表数据
            this.page = 0
            this.finished = false;
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },
        async foreachsupermarket_(){
            if (this.refreshing) {
                this.list = [];
                this.refreshing = false;
                }
            const result = await foreachsupermarket(this.page,this.pagesize)
            this.loading = false;   //await请求成功则 关闭---加载中
            this.list = [...this.list,...result.message]
            if (result.message.length === 0) {
                this.finished = true;
            }
        },
        //跳转商品详情
        inGood(data){
            this.$router.push(`/goodinfo/${data.id}`)
        }
    },
    components:{
        goods
    }
};
</script>
<style lang="scss">
    .lotGoods{
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #f6f6f6;
    }
</style>