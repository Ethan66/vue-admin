const getters = {
  sidebar: state => state.app.sidebar,
  keepAliveList: state => state.pageCashe.keepAliveList,
  pageSearchValues: state => state.pageCashe.pageSearchValues
}
export default getters
