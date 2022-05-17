import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

//导入normalize规范
import './assets/css/Normalize.css'

//导入vantui
import './vantui.js'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')