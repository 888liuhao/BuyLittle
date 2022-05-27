<template>
    <div v-show="isShow" class="backTop" @click="goBackTop">
            <slot>
            <img :src="backTopPng">
            </slot>
    </div>
</template>
<script>
import {throttle} from '../utils/tools.js'
import backTopPng from '../assets/imgs/backtop.png'
export default {
    data() {
        return {
            backTopPng,
            isShow: false
        }
    },
    props: {
        scrollTop: {
            type: Number,
            default: 700
        }
    },
    methods: {
        topBack(e) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= this.scrollTop) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        goBackTop() {
            document.documentElement.scrollTop = document.body.scrollTop = 0
        }
    },
    mounted() {
        document.addEventListener('scroll',throttle(this.topBack,500))  //绑定滚轮事件   throttle节流优化
    },
    destroyed() {
        document.removeEventListener('scroll', this.topBack)  //解绑滚轮事件，切换页面的时候要解绑
    }
}


</script>
<style lang="scss" scoped>
.backTop {
    position: fixed;
    right: 8px;
    bottom: 120px;
    width: 38px;
    height: 38px;

    img {
        width: 100%;
    }
}
</style>