import { AxiosInstance } from 'axios'
import { IsystemConfig } from '@/config/system'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
    $systemConfig: IsystemConfig
  }
}
