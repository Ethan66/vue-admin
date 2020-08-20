import { Component, Vue } from 'vue-property-decorator'
import userNameJpg from '@/assets/img/username.png'
import { AppModule, FTab } from '@/store/modules/app'

@Component
export default class Navbar extends Vue {
  private userName = ''
  private showDialogForm = false
  private currentUrl = ''

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
    AppModule.UPDATEMAINACTIVEDTAB(val)
  }

  private created(): void {
    this.userName = JSON.parse(localStorage.getItem('userInfo')).userName
    if (!this.mainTabs.length) {
      this.mainTabs = [JSON.parse(sessionStorage.getItem('mainActivedTab'))]
      this.mainActivedTab = JSON.parse(sessionStorage.getItem('mainActivedTab'))
    }
    this.currentUrl = this.mainTabs[0].url
  }

  private clickTab(): void {
    console.log(1)
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
