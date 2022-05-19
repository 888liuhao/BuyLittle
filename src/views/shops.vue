<template lang="">
    <div>
        <div>购物车</div>
        <van-submit-bar :price="3050" button-text="提交订单">
            <van-checkbox v-model="checked">全选</van-checkbox>
            <template #tip>
            支持微信、支付宝付款
            </template>
        </van-submit-bar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            checked:false
        }
    }
}
</script>
<style lang="scss">
    .van-submit-bar{
        margin-bottom: 50px;
    }
</style>