import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
//引入时间过滤器
import './utils/timeFiltering.js'
//导入normalize规范
import './assets/scss/Normalize.css'
//导入vantui
import './vantui.js'
//引入响应进度条css文件
import "../node_modules/nprogress/nprogress.css"
//引入文字图标文件
import "./assets/scss/iconfont.css"
//引入复制粘贴--vue-clipboard2
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')