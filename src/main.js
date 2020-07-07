import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/index.less'
import App from './App'
import router from './router'
import store from './store'
import { disposeTreeData, purifyParams } from '@/config/utils'
import { authBtn } from '@/config/methods'
import systemObj from './config/system'
import { dialogBtn } from '@/config/defaultBtnData'
import 'vue-admin-ui-lib/lib/style/index.css'
import {
  adminMethods,
  searchModule,
  tableModule,
  dialogModule
} from 'vue-admin-ui-lib'

import { formatDate } from 'vue-admin-methods'

Vue.use(ElementUI)
  .use(searchModule)
  .use(tableModule)
  .use(dialogModule)

Vue.prototype.$disposeTreeData = disposeTreeData
Vue.prototype.$purifyParams = purifyParams
Vue.prototype.$format = formatDate
Vue.prototype.$authBtn = authBtn
Vue.prototype.$InitObj = adminMethods.onCreateBasicData({ defaultDialogBtn: dialogBtn })
Vue.prototype.$setItem = adminMethods.setItemProp
Vue.prototype.$systemObj = systemObj
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
