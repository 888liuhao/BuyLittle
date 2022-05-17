<template lang="">
    <div>
        <!-- index为首、购、个人的父页面，给其三展示 -->
        <keep-alive>
        <router-view></router-view>
        </keep-alive>

        <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
        <van-tabbar-item icon="cart"  badge="9" to="/home/shops">购物车</van-tabbar-item>
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
                'shops':1,
                'personalname':2,
            }
            this.active = nameMap[name]
            },
            immediate:true
        }
    }
}
</script>
<style lang="">
    
</style>