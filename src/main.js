import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

//导入normalize规范
import './assets/scss/Normalize.css'
//导入vantui
import './vantui.js'
//引入响应进度条css文件
import "../node_modules/nprogress/nprogress.css"


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')