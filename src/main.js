import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import Loading from '@/components/loading'
import MyHeader from '@/components/myHeader'

Vue.config.productionTip = false

Vue.component('my-header', MyHeader)  // 页头组件
Vue.component('loading', Loading)  // 加载中组件

// 设置API公共路径
axios.defaults.baseURL = 'http://localhost:5050/'
Vue.prototype.axios = axios

// 价格过滤器
Vue.filter('PF', p => `￥${p.toFixed(2)}`)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
