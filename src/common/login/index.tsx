import { Component, Vue } from 'vue-property-decorator'
import Login from './login'
import { apiGetIp } from '@/api/login'
import utils from 'vue-admin-methods'
import './index.less'

export interface IsystemObj {
  system: string
  browser: string
}

type vueModule = typeof Login

@Component({
  components: { Login }
})
export default class extends Vue {
  component = Login
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
    // this.$store.commit('UPDATE_KEEP_ALIVE_LIST', { type: 'deleteAll' })
    // this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', { type: 'deleteAll' })
    this.onCheckIp()
  }

  private onChangeComponent(val: vueModule) {
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
        <Login systemObj={this.systemObj} ipAddress={this.ipAddress} onChangeComponent={this.onChangeComponent} />
      </div>
    )
  }
}
