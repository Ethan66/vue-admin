import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/element.ts'
import axios from 'axios'
import systemConfig from '@/config/system'
import '@/assets/less/index.less'

Vue.prototype.$axios = axios
Vue.prototype.$systemConfig = systemConfig

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
