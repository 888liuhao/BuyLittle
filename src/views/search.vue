<template lang="">
    <div class="search-container">
        <van-popup v-model="show" @click-overlay="overlay" position="top" :style="{ height: '50%' }" >
            <van-search v-model.trim="value" placeholder="请输入搜索关键词" @search="inSearch" />

            <div class="searchWrap">
                <div class="card">
                    <div class="header">
                        <h2>搜索历史</h2>
                        <i  class="iconfont icon-trash" @click="empty"></i>
                    </div>
                    <div class="footer" v-if="historyData.length > 0">
                        <span v-for="item in historyData" @click="$router.push('/seResult/' + item)">{{item}}</span>
                    </div>
                </div>

                <van-divider />

                <div class="card">
                    <div class="header">
                        <h2>热门搜索</h2>
                        <i :class="['iconfont',className]" @click="isEyeOpen = !isEyeOpen"></i>
                    </div>
                    <div class="footer" v-if="isEyeOpen">
                        <span v-for="item in hotGoods" @click="$router.push('/seResult/' + item)">{{item}}</span>
                    </div>
                    <div v-else class="text-center">已隐藏热门搜索</div>
                </div>
            </div>


        </van-popup>
    </div>
</template>
<script>
export default {
  name: 'search',
  data() {
    return {
      historyData:'',
      isEyeOpen: true,
      hotGoods: ['相机', '小米', '华为', '联想'],
      show: true,
      value: ''
    }
  },
  computed: {
    className() {
      return this.isEyeOpen ? 'icon-yanjing' : 'icon-guanbi-yanjing';
    }
  },
  mounted(){
    //获取本地存储历史搜索
      this.historyData = JSON.parse(localStorage.getItem('historyData') || '[]')
  },
  methods: {
    //点击遮盖层回退
    overlay() {
      this.$router.back()
    },
    //搜索框确认时
    inSearch() {
        //判断本地存储里是否有重复的值
        if(this.historyData.includes(this.value)){
            this.$router.push('/seResult/' + this.value)
            return
        }
        if(this.historyData.length > 4){
            this.historyData.pop()
        }
      //获取到value的值存储到本地储存
      this.historyData.unshift(this.value)
      //JSON.stringify 转为数组的形式存入
      localStorage.setItem('historyData', JSON.stringify(this.historyData))
      //携带值跳转
      this.$router.push('/seResult/' + this.value)
    },
    //清除搜索历史记录
    empty(){
        this.historyData = []
        localStorage.removeItem('historyData')
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  .searchWrap {
    .card {
      padding: 6px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;

        span {
          height: 30px;
          line-height: 30px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 4px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
        }
      }
    }
  }
}
</style>