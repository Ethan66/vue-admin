import { Component, Vue, Watch } from 'vue-property-decorator'
import userNameJpg from '@/assets/img/username.png'
import { AppModule, FTab } from '@/store/modules/app'

interface FElTabs {
  label: string
  name: string
}
@Component
export default class Navbar extends Vue {
  private userName = ''
  private showDialogForm = false
  private currentUrl = ''

  @Watch('$route', { immediate: true })
  protected onJudgeNowRoute(nowRoute): void {
    if (nowRoute.meta.isTab) {
      const tab = { name: nowRoute.meta.title, url: nowRoute.path }
      // tabs数组中没有tab
      if (!this.mainTabs.some((item) => item.url === tab.url)) {
        this.mainTabs = this.mainTabs.concat(tab)
      }
      // 当前url不是tab的url
      if (this.mainActivedTab.url !== tab.url) {
        this.clickTab({ name: tab.name, url: tab.url }, false)
      }
    }
  }

  private get mainTabs(): FTab[] {
    return AppModule.mainTabs
  }

  private set mainTabs(val: FTab[]) {
    AppModule.UPDATETABS(val)
  }

  private get mainActivedTab(): FTab {
    return AppModule.mainActivedTab
  }

  private set mainActivedTab(val: FTab) {
    this.currentUrl = val.url
    AppModule.UPDATEMAINACTIVEDTAB(val)
  }

  private created(): void {
    this.userName = JSON.parse(localStorage.getItem('userInfo')).userName
    if (!this.mainTabs.length) {
      this.mainTabs = [JSON.parse(sessionStorage.getItem('mainActivedTab'))]
      this.mainActivedTab = JSON.parse(sessionStorage.getItem('mainActivedTab'))
    }
  }

  private clickTab(tab: FTab | FElTabs, jump = true): void {
    const result: FTab = { name: '', url: '' }
    if (tab.label) {
      result.name = tab.label as string
      result.url = tab.name
    } else {
      result.url = (tab as FTab).url
      result.name = tab.name
    }
    this.mainActivedTab = result
    jump && this.$router.push(result.url)
  }

  private removeTab(): void {
    console.log(2)
  }

  private logout(): void {
    console.log(3)
  }

  render() {
    return (
      <div class="nav">
        <el-tabs
          v-model={this.currentUrl}
          type="card"
          closable
          onTab-click={this.clickTab}
          onTab-remove={this.removeTab}
        >
          {this.mainTabs.map((item) => (
            <el-tab-pane label={item.name} name={item.url}></el-tab-pane>
          ))}
        </el-tabs>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img style="margin-right: 5px; width: 14px; vertical-align: middle;" src={userNameJpg} />
            {this.userName}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span onClick={(this.showDialogForm = true)}>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span onClick={this.logout}>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    )
  }
}
