<template lang="">
    <div class="oneGoods" @click="toInfoGood">
            <div class="pngGoods">
                <img v-lazy="data.img_url">
            </div>
            <div class="titleGoods ellipsis_line_2">{{data.title}}</div>
            <slot name="bottom">
                <div class="twoSpan">
                    <span class="leftjia">&yen;<em class="leftzi">{{data.sell_price}}</em></span>
                    <span class="rigzi">{{data.market_price}}条好评+</span>
                </div>
            </slot>
        </div>
</template>
<script>
export default {
    name:'goods',
    props:['data'],
    methods:{
        toInfoGood(){
            this.$emit('goodinfo',this.data)
        }
    }
}
</script>
<style lang="scss" scoped>
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
</style>