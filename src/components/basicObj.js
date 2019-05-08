const searchObj = {
  searchItem: null, // 搜索的配置
  searchValues: {} // 用户搜索的内容
}

const tableObj = {
  allData: [], // 请求接口获取的表格数据
  tableData: [], // 展示到页面的表格数据，比如allData一级菜单表示为1，展示到页面的时候需要将1变为中文一级菜单
  tableItem: [],
  tableLoading: true, // 表格刷新
  isEdit: 0, // 用户是编辑还是新增，0表示新增
  tableBtn: [], // 展示到表格的按钮
  tablePages: {
    total: 0, current: 1, pageSize: 20 // 表格的页数
  },
  chooseDataArr: [] // 用户选择了表格的哪些数据
}

const dialogObj = {
  editData: {}, // 新增或编辑展开对话框，保存用户编辑的内容
  dialogTitle: '新增菜单', // 对话框的标题
  dialogItem: null, // 对话框的配置
  dialogBtn: [], // 对话框的按钮
  showDialogForm: false, // 是否展示对话框
  allRead: false // 点击编辑时对话框里的全部数据都是只读，不能编辑
}

const basicObj = Object.assign({}, searchObj, tableObj, dialogObj)

export {
  searchObj, tableObj, dialogObj, basicObj
}
