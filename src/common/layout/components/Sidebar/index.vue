<template>
  <div class="layout-index">
    <slot></slot>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        text-color="#fff"
        active-text-color="#fff"
      >
        <sub-sidebar v-for="(menu, i) in menuList" :key="menu.menuCode" :index="i" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import subSidebar from './subSidebar'

export default {
  components: { subSidebar },
  data () {
    return {
      menuList: JSON.parse(sessionStorage.getItem('menuList'))
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
