import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import Sidebar from './components/Sidebar'

@Component({
  components: { Sidebar }
})
export default class Layout extends Vue {
  logo = ''
  render() {
    import(`@/${this.$systemConfig.logo}.png`).then((res) => {
      this.logo = res.default
    })
    const systemName = AppModule.sidebar.opened ? <span>{this.$systemConfig.fullName}</span> : ''
    return (
      <div class="app-wrapper">
        <sidebar class={['sidebar-container el-scrollbar', { collapse: !AppModule.sidebar.opened }]}>
          <h1>
            <img src={this.logo} />
            {systemName}
          </h1>
        </sidebar>
        <div class="main-container">{/* <navbar/><app-main/> */}</div>
      </div>
    )
  }
}
