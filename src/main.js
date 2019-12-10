import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/index.less'
import App from './App'
import router from './router'
import store from './store'
import { adminModule } from '@/components'
import { format, disposeTreeData, purifyParams } from '@/config/utils'
import { initEditData, setItem, setBtnConfig, authBtn } from '@/components/methods'
// import InitObj from '@/components/basicObj1'
import systemObj from './config/system'
import handleBasicObj from 'vue-admin-methods'
import { tableBtn, dialogBtn } from '@/components/table-module/config/defaultBtnData'

Vue.use(ElementUI)
Vue.use(adminModule)

Vue.prototype.$initEditData = initEditData
Vue.prototype.$setItem = setItem
Vue.prototype.$setBtnConfig = setBtnConfig
Vue.prototype.$disposeTreeData = disposeTreeData
Vue.prototype.$purifyParams = purifyParams
Vue.prototype.$format = format
Vue.prototype.$authBtn = authBtn
// Vue.prototype.$InitObj = InitObj
Vue.prototype.$InitObj = handleBasicObj({ defaultTableBtn: tableBtn, defaultDialogBtn: dialogBtn })
Vue.prototype.$systemObj = systemObj
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
