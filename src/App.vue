<template>
  <div class="app">
    <!-- 头部栏   right-text="按钮"  -->
    <van-nav-bar :title="title" left-text="" left-arrow v-show="isShnav" @click-left="$router.back()" />

    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      title: '买亿点',
      isShnav: false,
      network: window.navigator.onLine
    }
  },
  watch: {
    "$route": {
      handler: function (newRoute) {
        let { isShownav, title } = newRoute.meta
        this.title = title
        if (isShownav) {
          this.isShnav = false
        } else {
          this.isShnav = true
        }
      },
      immediate: true
    },
    network(){
        if(this.network === true){
            this.$toast('网络连接成功')
        }else{
            this.$toast('网络断开，请检查网络')
        }
    }
  },
  methods: {
      //判断是否有网络
    onNetwork(e) {
      this.network = e.type === "online" ? true : false
    }
  },
  mounted() {
    window.addEventListener('online', this.onNetwork)
    window.addEventListener('offline', this.onNetwork)
  }
}
</script>
<style lang="scss">
//导入scss公共样式
@import "./assets/scss/Public.scss";
html {
  scroll-behavior: smooth; //滚动动画变的丝滑
}
* {
  box-sizing: border-box;
  font-size: 14px;
}
.app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
}
</style>

