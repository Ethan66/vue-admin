import { Component, Vue } from 'vue-property-decorator'
import Login from './login'
import Register from './register'
import { apiGetIp } from '@/api/login'
import utils from 'vue-admin-methods'
import './index.less'
import { UserModule } from '@/store/modules/pageCashe'

export interface IsystemObj {
  system: string
  browser: string
}

type vueModule = typeof Login | typeof Register

@Component({
  components: { Login, Register }
})
export default class extends Vue {
  component: vueModule = Login
  systemObj: IsystemObj = {
    system: '',
    browser: 'IE'
  }

  ipAddress = ''

  ip = ''
  private created(): void {
    this.$route.meta.firstLogin = true
    localStorage.clear()
    sessionStorage.clear()
    UserModule.UPDATE_KEEP_ALIVE_LIST({ type: 'deleteAll' })
    UserModule.UPDATE_PAGE_SEARCH_VALUES({ type: 'deleteAll' })
    this.onCheckIp()
  }

  public onChangeComponent(val: vueModule) {
    this.component = val
  }

  private onCheckIp(): void {
    this.systemObj = utils.getSystemVersion()
    apiGetIp().then((res) => {
      if (res) {
        try {
          let city = res.match(/(?!当前).[\u4e00-\u9fa5]\s/g)
          const ip = res.match(/[\d.]+/g).join()
          this.ip = ip
          city.shift()
          city.pop()
          city = city.join('')
          this.ipAddress = `${ip} ${city}`
        } catch (error) {
          console.log('ipAddress' + error)
        }
      }
    })
  }

  private render() {
    return (
      <div class="bl-login">
        <this.component
          systemObj={this.systemObj}
          ipAddress={this.ipAddress}
          onChangeComponent={this.onChangeComponent}
        />
      </div>
    )
  }
}
