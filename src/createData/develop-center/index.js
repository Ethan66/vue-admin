import { basicInitObj, searchTableInitObj, tableInitObj } from '@/components/basicObj'
import { menuTest, pageManageTest, tybeManageTest, fastCreateTybeTest } from '@/test/develop-center'

const menuMoreList = [
  { name: '新建平级菜单', clickFn: 'handleCreateLevelMenu' },
  { name: '新建下级菜单', clickFn: 'handleCreateNextLevelMenu' },
  { name: '删除', clickFn: 'handleDeleteData' },
  { name: '详情', clickFn: 'handleShowDetailDialog' }
]

// 菜单管理
export const menu = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), ['edit', { more: { list: menuMoreList } }])
  },
  created () {
    let configSearchItem = [
      'menuName',
      { status: { type: 'select', options: [{ label: '显示', value: 0 }, { label: '隐藏', value: 1 }] } }
    ]
    let configTableItem = {
      menuName: { type: 'tree', width: 200 },
      menuType: 80,
      menuLevel: 100,
      menuUrl: 200,
      sortNo: 80,
      code: 100,
      status: { width: 80, clsName: 'menuStatus' },
      remark: 100,
      btn: 120
    }
    let configDialogItem = [
      {
        menuParentId: {
          label: '上级菜单',
          type: 'selectTree',
          defaultProps: { children: 'list', label: 'menuName' },
          dialogData: []
        }
      },
      'menuName',
      { menuType: { type: 'select', options: [{ label: '目录', value: 0 }, { label: '菜单', value: 1 }, { label: '按钮', value: 2 }] } },
      'code', 'menuUrl', 'sortNo',
      { status: { type: 'radio', options: [{ label: '显示', value: 0 }, { label: '隐藏', value: 1 }] } },
      { remark: { label: '描述', type: 'textarea', rows: 4 } }
    ]
    this.searchItem = this.$setItem(menuTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(menuTest, configTableItem, 'table')
    let dialogItem = this.dialogItem = this.$setItem(menuTest, configDialogItem, 'dialog')
    this.rules = {
      menuName: [
        { required: true, message: dialogItem[1].placeholder, trigger: 'blur' }
      ],
      menuType: [
        { required: true, message: dialogItem[2].placeholder, trigger: 'change' }
      ],
      code: [
        { required: true, message: dialogItem[3].placeholder, trigger: 'blur' }
      ],
      menuUrl: [
        { required: true, message: dialogItem[4].placeholder, trigger: 'blur' }
      ],
      sortNo: [
        { required: true, message: dialogItem[5].placeholder, trigger: 'blur' }
      ],
      status: [
        { required: true, message: dialogItem[6].placeholder, trigger: 'change' }
      ]
    }
  }
}

// 页面管理
export const pageManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), ['edit'])
  },
  created () {
    let configSearchItem = [
      'pageName',
      { pageStatus: { type: 'select', options: [{ label: '正常', value: 1 }, { label: '停用', value: 0 }] } }
    ]
    let configTableItem = {
      pageName: { width: 100, clickFn: 'handleGoTybe', clsName: 'cm-btn-color' },
      pageCode: 80,
      menuCode: 120,
      creater: 80,
      pageStatus: 80,
      remark: 80,
      pageUrl: 200,
      btn: 70
    }
    let configDialogItem = [
      'pageName', 'pageCode', 'pageUrl', 'menuCode',
      { pageStatus: { type: 'radio', options: [{ label: '正常', value: 1 }, { label: '停用', value: 0 }] } },
      { creater: { label: '创建人', type: 'docs', show: false } },
      { gmtCreate: { label: '创建时间', type: 'docs', show: false } },
      { remark: { label: '描述', type: 'textarea', rows: 4, show: false } }
    ]
    this.searchItem = this.$setItem(pageManageTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(pageManageTest, configTableItem, 'table')
    let dialogItem = this.dialogItem = this.$setItem(pageManageTest, configDialogItem, 'dialog')
    this.rules = {
      pageName: [
        { required: true, message: dialogItem[0].placeholder, trigger: 'blur' }
      ],
      pageCode: [
        { required: true, message: dialogItem[1].placeholder, trigger: 'blur' }
      ],
      pageUrl: [
        { required: true, message: dialogItem[2].placeholder, trigger: 'blur' }
      ],
      menuCode: [
        { required: true, message: dialogItem[3].placeholder, trigger: 'blur' }
      ],
      pageStatus: [
        { required: true, message: dialogItem[4].placeholder, trigger: 'change' }
      ]
    }
  }
}

// 字段管理
export const tybeManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(searchTableInitObj)), ['edit', 'cancel', 'delete'])
  },
  created () {
    let configSearchItem = ['fieldName', 'fieldValue']
    let configTableItem = {
      selection: 50,
      fieldValue: { clsName: 'cm-btn-color', width: 80 },
      fieldName: { width: 90, type: 'input', canEdit: 1 },
      displayStatus: { width: 90, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      fieldRequired: { width: 100, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      setStatus: { width: 140, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      fieldSort: { width: 90, type: 'input', canEdit: 1 },
      fixedStatus: { width: 140, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      btn: 160
    }
    this.searchItem = this.$setItem(tybeManageTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeManageTest, configTableItem, 'table')
  }
}

// 快速创建字段
export const fastCreateType = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(tableInitObj)), [{ edit: { noClickFn: true } }, 'cancel', { delete: { noClickFn: true } }])
  },
  created () {
    let configTableItem = {
      selection: 50,
      fieldValue: { width: 80, clickFn: 'handleGoPage', clsName: 'cm-btn-color', type: 'input', canEdit: 1 },
      fieldName: { width: 100, type: 'input', canEdit: 1 },
      fieldRequired: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      displayStatus: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      setStatus: { width: 120, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      btn: 160
    }
    this.tableItem = this.$setItem(fastCreateTybeTest, configTableItem, 'table')
    this.rules = {
      id: [
        { required: true, message: '请输入菜单id', trigger: 'blur' }
      ],
      menuName: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' }
      ],
      menuLevel: [
        { required: true, message: '请选择菜单类型', trigger: 'change' }
      ]
    }
  }
}
