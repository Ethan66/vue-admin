<template>
  <section class="app-main">
    <subTabs v-if="showSubTabs" />
    <keep-alive :include="keepAliveList">
      <router-view class="transition-group"></router-view>
    </keep-alive>
  </section>
</template>

<script>
import subTabs from './subTabs'
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  components: { subTabs },
  data () {
    return {
      showSubTabs: false,
      transitionKey: 0
    }
  },
  watch: {
    $route (val) {
      this.transitionKey++
      this.handleIsShowSubTabs(val)
    }
  },
  computed: {
    ...mapGetters(['keepAliveList'])
  },
  created () {
    this.handleIsShowSubTabs(this.$route, true)
  },
  methods: {
    handleIsShowSubTabs (val, isRefresh = false) {
      let { title, level } = val.meta
      let index = -1
      let subTabsArr = JSON.parse(sessionStorage.getItem('subTabs')) || []
      if (isRefresh && level && Number(level) > 2) {
        this.showSubTabs = true
      } else if (level && Number(level) > 2) {
        this.showSubTabs = false
        index = subTabsArr.findIndex(item => item.path === val.path)
        index > -1 ? subTabsArr.pop() : subTabsArr.push({ title, path: val.path })
        sessionStorage.setItem('subTabs', JSON.stringify(subTabsArr))
        this.$nextTick(() => {
          this.showSubTabs = true
        })
      } else if (subTabsArr.length > 0) {
        this.showSubTabs = false
        sessionStorage.removeItem('subTabs')
      }
    }
  }
}
</script>

<style lang="less">
.app-main {
  min-height: calc(100vh - 55px);
  padding: 0 15px 0;
  position: relative;
  overflow: hidden;
  .transition-group{
    margin-top: 15px;
  }
  .substance{
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 70px);
    padding-bottom: 15px;
  }
}
</style>
