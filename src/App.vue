<template>
    <div class="app">
        <!-- 头部栏 -->
            <van-nav-bar
                :title="title"
                left-text="返回"
                right-text="按钮"
                left-arrow
                v-show="isShnav"
                @click-left="$router.back()"
                />

        
        
        <keep-alive>
        <router-view></router-view>
        </keep-alive>
        
    </div>
</template>

<script>
    export default {
        name:"app",
        data(){
            return {
                title:'买亿点',
                isShnav:false
            }
        },
        watch:{
            "$route":{
                handler:function(newRoute){
                    let {isShownav,title} = newRoute.meta
                    this.title = title
                    if(isShownav){
                        this.isShnav = false
                    }else{
                        this.isShnav = true
                    }
                },
                immediate:true
            }
        }
    }
</script>
<style lang="scss">
    .app{
        min-width: 320px;
        max-width: 750px;
        margin: auto;
    }
</style>

