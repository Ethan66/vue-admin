import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/index.less'
import App from './App'
import router from './router'
import store from './store'
import { adminModule } from '@/components'
import { getSuccessMsg, format, disposeTreeData } from '@/config/utils'
import { initEditData, setItem, setBtnConfig } from '@/components/methods'

Vue.use(ElementUI)
Vue.use(adminModule)

Vue.prototype.$initEditData = initEditData
Vue.prototype.$setItem = setItem
Vue.prototype.$setBtnConfig = setBtnConfig
Vue.prototype.$getSuccessMsg = getSuccessMsg
Vue.prototype.$disposeTreeData = disposeTreeData
Vue.prototype.$format = format
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
