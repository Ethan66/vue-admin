const app = {
  state: {
    sidebar: {
      opened: true
    },
    mainTabs: [],
    mainActivedTab: {},
    subTabObj: {}, // 副标签
    isAddDynamicRoutes: false
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, boolean) => {
      state.sidebar.opened = boolean
    },
    UPDATETABS: (state, val) => {
      state.mainTabs = val
    },
    UPDATEMINACTIVEDTAB: (state, val) => {
      state.mainActivedTab = Object.assign({}, val)
      sessionStorage.setItem('mainActivedTab', JSON.stringify(val))
    },
    SAVE_SUBTABS_OBJ: (state, data) => {
      state.subTabObj = data
    },
    TOGGLE_ISADDDYNAMICROUTES: (state, boolean) => {
      state.isAddDynamicRoutes = boolean
    }
  }
}

export default app
