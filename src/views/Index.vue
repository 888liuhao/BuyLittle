<template lang="">
    <div>
        <!-- index为首、购、个人的父页面，给其三展示 -->
        
        <router-view></router-view>
        
        <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" >分类</van-tabbar-item>
        <van-tabbar-item icon="cart"  :badge="$store.getters.totalNumber" to="/home/shops">购物车</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/home/personalname">我的</van-tabbar-item>
        </van-tabbar>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:0
        }
    },
    watch:{
        "$route":{
            handler:function(newRoute){
            let {name} = newRoute.meta
            const nameMap = {
                'Home':0,
                'shops':2,
                'personalname':3,
            }
            this.active = nameMap[name]
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss">
    
</style>