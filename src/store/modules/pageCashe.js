const pageCashe = {
  state: {
    keepAliveList: [],
    pageSearchValues: {},
    subTabObj: {} // 副标签
  },
  mutations: {
    UPDATE_KEEP_ALIVE_LIST: (state, payload) => {
      let { type, name } = payload
      let i = state.keepAliveList.indexOf(name)
      if (type === 'deleteAll') {
        state.keepAliveList = []
        return true
      }
      if (type === 'delete') {
        i >= 0 && state.keepAliveList.splice(i, 1)
        return true
      }
      i === -1 && state.keepAliveList.push(name)
    },
    UPDATE_PAGE_SEARCH_VALUES: (state, payload) => {
      let { type, name, value } = payload
      let data = state.pageSearchValues
      if (type === 'deleteAll') {
        data = []
        return true
      }
      if (data[name]) {
        if (type === 'delete') {
          delete data[name]
          return true
        }
      }
      if (!value.searchValues) value.searchValues = {}
      data[name] = value
      let obj = {}
      obj[name] = value
      sessionStorage.setItem('activedSearchValues', JSON.stringify(obj))
    },
    SAVE_SUBTABS_OBJ: (state, data) => {
      state.subTabObj = data
    }
  }
}

export default pageCashe
