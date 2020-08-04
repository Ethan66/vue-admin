import { Component, Vue, Prop } from 'vue-property-decorator'

export interface FItem {
  menuUrl: string
  list?: FItem[]
  menuIcon?: string
  menuName: string
  code: string
}

@Component
export default class SubSidebar extends Vue {
  @Prop() readonly menuItem!: FItem
  @Prop({ default: false }) readonly isNest: boolean

  // 点击菜单清空缓存
  private handleChooseMenu(item: FItem): void {
    console.log(11, item)
  }

  render() {
    let html
    if (!this.menuItem.list || !this.menuItem.list.length) {
      /* 只有一级菜单 */
      html = (
        <router-link to={this.menuItem.menuUrl}>
          <el-menu-item
            index={this.menuItem.menuUrl}
            class={{ 'nosubmenu-arrow': !this.isNest }}
            onClick={this.handleChooseMenu.bind(this, this.menuItem)}
          >
            <template slot="title">
              {this.menuItem.menuIcon && <i class={['iconfont', this.menuItem.menuIcon]} />}
              <span slot="title">{this.menuItem.menuName}</span>
            </template>
          </el-menu-item>
        </router-link>
      )
    } else {
      /* 二级菜单 */
      html = (
        <el-submenu index={this.menuItem.code}>
          <template slot="title">
            {this.menuItem.menuIcon && <i class={['iconfont', this.menuItem.menuIcon]} />}
            <span slot="title">{this.menuItem.menuName}</span>
          </template>
          {this.menuItem.list.map((child) => {
            if (child.list && child.list.length) {
              return (
                <SubSidebar
                  is-nest={true}
                  menu-item={child}
                  key={child.menuUrl}
                  base-path={child.menuUrl}
                  class="nest-menu"
                />
              )
            } else {
              return (
                <router-link to={child.menuUrl} key={child.code}>
                  <el-menu-item index={child.menuUrl} onClick={this.handleChooseMenu.bind(this, child)}>
                    <template slot="title">
                      {child.menuIcon && <i class={['iconfont', child.menuIcon]} />}
                      <span slot="title">{child.menuName}</span>
                    </template>
                  </el-menu-item>
                </router-link>
              )
            }
          })}
        </el-submenu>
      )
    }
    return <div class="sidebarContent">{html}</div>
  }
}
