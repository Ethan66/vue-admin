<template>
  <div class="sidebarContent">
    <!--只有一级菜单-->
    <template v-if="!item.list || item.list.length === 0">
      <router-link :to="item.menuUrl">
        <el-menu-item :index="item.menuUrl" :class="{'nosubmenu-arrow':!isNest}" @click="handleAddTabs(item)">
          <template>
            <i :class="item.menuIcon || ''" class="iconfont" />{{ item.menuName }}
          </template>
        </el-menu-item>
      </router-link>
    </template>

    <!--二级菜单-->
    <el-submenu v-else :index="item.menuCode">
      <template slot="title">
        <template>
          <i :class="item.menuIcon || ''" class="iconfont" />{{ item.menuName }}
        </template>
      </template>

      <template v-for="child in item.list">
        <my-sidebar
          v-if="child.list&&child.list.length>0"
          :is-nest="true"
          :item="child"
          :key="child.menuUrl"
          :base-path="child.menuUrl"
          class="nest-menu" />
        <router-link v-else :to="child.menuUrl" :key="child.name">
          <el-menu-item :index="child.menuUrl" @click="handleAddTabs(child)">
            <template>
              <i class="iconfont" :class="child.menuIcon" />{{ child.menuName }}
            </template>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'subSidebar',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      onlyChild: null
    }
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
    // 添加tab和设置mainActivedTab
    handleAddTabs (child) {
      const tab = { name: child.menuName, url: child.menuUrl, code: child.menuCode }
      if (!this.mainTabs.find(item => {
        if (item === null) {
          return false
        }
        return item.name === child.menuName
      })) {
        const arr = [].concat(this.mainTabs)
        arr.push(tab)
        this.mainTabs = arr
      }
      this.mainActivedTab = tab
      sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
    }
  }
}
</script>

<style lang="less">
  .sidebarContent{
    .iconfont {
      margin-right: 15px; vertical-align: top;
    }
  }
</style>
