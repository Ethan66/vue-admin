<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container el-scrollbar">
      <h1>新百凌后台管理系统</h1>
    </sidebar>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components/index'

export default {
  name: 'Layout',
  components: {
    Navbar, Sidebar, AppMain
  },
  computed: {
    mainTabs: {
      get () { return this.$store.state.app.mainTabs },
      set (val) { this.$store.commit('UPDATETABS', val) }
    },
    mainActivedTab: {
      get () { return this.$store.state.app.mainActivedTab },
      set (val) { this.$store.commit('UPDATEMINACTIVEDTAB', val) }
    }
  },
  methods: {
    // handleGoHome () {
    //   this.$router.push({ name: 'home' })
    //   this.mainTabs = [{ name: '首页', url: '/' }]
    //   this.mainActivedTab = this.mainTabs[0]
    //   sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
    // }
  }
}
</script>

<style lang="less">
 .main-container{
  width: calc(100% - 225px);
  margin-left: 225px;
  background: #e8e8e8;
}
</style>
