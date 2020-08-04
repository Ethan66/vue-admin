import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import utils from 'vue-admin-methods'
import SubSidebar from './subSidebar'

@Component({
  components: { SubSidebar }
})
export default class Sidebar extends Vue {
  menuList = JSON.parse(sessionStorage.getItem('menuList'))

  private mounted(): void {
    const changeSidebar: Function = utils.debounce(() => {
      if (+this.$systemConfig.minScreenWidth > document.documentElement.offsetWidth) {
        AppModule.TOGGLE_SIDEBAR(false)
      } else {
        AppModule.TOGGLE_SIDEBAR(true)
      }
    })
    changeSidebar()
    window.addEventListener('resize', changeSidebar())
  }

  render() {
    return (
      <div class="layout-index">
        {this.$scopedSlots.default({})}
        <div class="el-scrollbar">
          <div class="scrollbar-wrapper el-scrollbar__wrap" style="margin-bottom: -6px; margin-right: -6px;">
            <div class="el-scrollbar__view">
              <el-menu
                show-timeout={200}
                default-active={this.$route.path}
                collapse={!AppModule.sidebar.opened}
                text-color="#fff"
                active-text-color="#fff"
              >
                {this.menuList.map((menu) => {
                  return <SubSidebar key={menu.menuCode} menu-item={menu} />
                })}
              </el-menu>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
