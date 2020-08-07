declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module 'vue-admin-ui-lib' {
  import vueAdminUiLib from 'vue-admin-ui-lib/lib/utils/index'
  export default vueAdminUiLib
}
