<template>
  <div class="nav">
    <el-tabs v-model="currentUrl" type="card" closable @tab-click="clickTab" @tab-remove="removeTab">
       <el-tab-pane
        v-for="item in mainTabs"
        :key="item.url"
        :label="item.name"
        :name="item.url"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="iconfont ad-user"></i> {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item class="width100">修改密码</el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout" class="width100">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { apiUserLoginOut } from '@/api/login'

export default {
  data () {
    return {
      userName: ''
    }
  },
  watch: {
    $route (val) {
      this.handleJudgeNowRoute(val)
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
    },
    currentUrl: {
      get () { return this.mainActivedTab.url || '' },
      set () {}
    }
  },
  created () {
    this.userName = JSON.parse(sessionStorage.getItem('userInfo')).consoleName
    if (!this.mainActivedTab.name) {
      this.mainActivedTab = JSON.parse(sessionStorage.getItem('mainActivedTab')) || {}
      this.mainTabs = this.mainActivedTab.name ? [].concat(this.mainActivedTab) : []
    }
  },
  methods: {
    clickTab (tab) {
      if (this.mainTabs.length > 1 && this.currentUrl !== tab.name) {
        this.mainActivedTab = { name: tab.label, url: tab.name }
        sessionStorage.setItem('mainActivedTab', JSON.stringify(this.mainActivedTab))
        this.$router.push({ name: tab.name })
      }
    },
    removeTab (tab) {
      if (this.mainTabs.length > 1) {
        const index = this.mainTabs.findIndex(item => item.url === tab)
        if (index !== -1) {
          const arr = [].concat(this.mainTabs)
          arr.splice(index, 1)
          this.mainTabs = arr
          if (tab === this.currentUrl) {
            this.mainActivedTab = index === this.mainTabs.length ? this.mainTabs[this.mainTabs.length - 1] : this.mainTabs[index]
            this.$router.push({ name: this.mainActivedTab.url })
          }
        }
      }
    },
    handleJudgeNowRoute (nowRoute) {
      if (nowRoute.meta.isTab) {
        const nowUrl = nowRoute.name
        const label = nowRoute.meta.title
        if (!this.mainTabs.some(item => item.url === nowUrl)) {
          const tab = { name: label, url: nowUrl }
          const arr = [].concat(this.mainTabs)
          arr.push(tab)
          this.mainTabs = arr
          this.mainActivedTab = tab
          sessionStorage.setItem('mainActivedTab', JSON.stringify(tab))
        } else if (this.mainTabs.some(item => item.url === nowUrl) && this.mainActivedTab.url !== nowUrl) {
          this.clickTab({ label, name: nowUrl })
        }
      }
    },
    logout () {
      this.$confirm(`确定退出?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiUserLoginOut().then((res) => {
          if (res.code === '208999') {
            sessionStorage.removeItem('userInfo')
            this.$router.push({ path: '/login' })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>
