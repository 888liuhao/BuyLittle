<template lang="">
    <div>
        <van-search v-model.trim="value" placeholder="请输入搜索关键词" @search="inSearch" show-action @cancel="$router.back()" />

        <!-- 筛选 -->
        <van-dropdown-menu>
            <van-dropdown-item @change="isChange" v-model="sort" :options="option1" />
        </van-dropdown-menu>

        <!-- 商品 -->
        <div class="sen">
            <goods v-for="good in Goods" :key="good.id" :data="good" @goodinfo="goodinfo" />
        </div>

        <van-empty v-if="Goods.length === 0" description="暂无搜索结果" />
    </div>
</template>
<script>
import {gitSearchValue} from '../api/Home.js'
import goods from '../componets/goods.vue'
export default {
    name: 'seResult',
    data() {
        return {
            value: this.$route.params.seValue,
            sort: 'buy',
            order:'asc',
            page:1,
            pagesize:10,
            option1: [
                { text: '全部商品', value: 'buy' },
                { text: '好评', value: 'likes' },
                { text: '价格', value: 'sell_price' },
                ],
            Goods:[]
            }
    },
    created(){
        this.inSearch()
    },
    methods: {
        async inSearch() {
            let data = {
                value:this.value,
                sort:this.sort,
                order:this.order,
                page:this.page,
                pagesize:this.pagesize
            }
            const result =  await gitSearchValue(data)
            this.Goods = result
        },
        //点击商品跳转详情页
        goodinfo(data){
            let {id} = data
            this.$router.push('/goodinfo/' + id)
        },
        isChange(value){
            this.sort = value
            this.inSearch()
        }
    },
    components:{
        goods
    }
}
</script>
<style lang="scss" scoped>
.sen{
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #f6f6f6;
}
</style>