class BtnList {
  constructor () {
    this.setBtnList()
  }

  // 重新设置btnList
  setBtnList (btnList) {
    this.btnList = btnList // 刷新更新，不取本地
    sessionStorage.setItem('btnList', JSON.stringify(btnList || []))
  }

  // 获取用户授权按钮
  getBtnName (btnCode) {
    let btnList = this.btnList
    if (!btnList) return false
    let obj = btnList.find(item => item.btnCode === btnCode)
    return obj && obj.btnName
  }

  // 获取表格或对话框授权按钮
  getConfigBtns (list) {
    let btnList = this.btnList
    if (!btnList) return []
    return list.map(item => {
      const result = { code: item.code, clickFn: item.clickFn }
      const tmp = btnList.find(btn => btn.btnCode === item.code)
      tmp && Object.assign(result, { name: tmp.btnName })
      return result
    })
  }
}

export default new BtnList()
