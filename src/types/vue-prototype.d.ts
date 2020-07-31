import { AxiosInstance, AxiosResponse } from 'axios'
import { IsystemConfig } from '@/config/system'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
    $systemConfig: IsystemConfig
  }
}

declare module 'axios' {
  interface AxiosResponse {
    code: string
  }
}
