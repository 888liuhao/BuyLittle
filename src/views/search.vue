<template lang="">
    <div>
        <van-popup v-model="show" @click="pop" @click-overlay="overlay" position="top" :style="{ height: '30%' }" >
            <van-search v-model="value" placeholder="请输入搜索关键词" />
        </van-popup>
    </div>
</template>
<script>
export default {
    name:'search',
    data(){
        return {
            show:true,
            value:''
        }
    },
    methods:{
        pop(){
            // this.show = !this.show
        },
        overlay(){
            event.stopPropagation()
            this.$router.back()
        }
    }
}
</script>
<style lang="">
    
</style>