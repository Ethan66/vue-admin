const pageCashe = {
  state: {
    keepAliveList: []
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
    }
  }
}

export default pageCashe
