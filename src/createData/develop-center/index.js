import { basicInitObj, searchTableInitObj, tableInitObj } from '@/components/basicObj'
import { menuTest, pageManageTest, tybeManageTest, fastCreateTybeTest } from '@/test/develop-center'

const menuMoreList = [
  { name: '新建平级菜单', clickFn: 'handleCreateLevelMenu' },
  { name: '新建下级菜单', clickFn: 'handleCreateNextLevelMenu' },
  { name: '删除', clickFn: 'handleDelete' },
  { name: '详情', clickFn: 'handleShowDetailDialog' }
]

export const menu = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), ['edit', { more: { list: menuMoreList } }])
  },
  created () {
    let configSearchItem = [
      'menuName',
      { status: { type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 2 }] } }
    ]
    let configTableItem = {
      selection: 50,
      id: 80,
      menuName: { type: 'tree', width: 200 },
      menuLevel: { clsName: 'menuLevel', width: 100 },
      parentMenuName: 100,
      menuUrl: 200,
      btn: 120
    }
    let configDialogItem = [
      { parentMenuName: { label: '上级菜单', type: 'select', options: [{ label: '一', value: 1 }, { label: '二', value: 2 }] } },
      'menuName', 'menuLevel', 'menuCode', 'menuUrl', 'sort',
      { status: { type: 'radio', options: [{ label: '正常', value: '1' }, { label: '停用', value: '0' }] } },
      { menuDesc: { label: '描述', type: 'textarea', rows: 4 } }
    ]
    this.searchItem = this.$setItem(menuTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(menuTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(menuTest, configDialogItem, 'dialog')
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

export const pageManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), ['edit'])
  },
  created () {
    let configSearchItem = [
      'menuName',
      { status: { type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 2 }] } }
    ]
    let configTableItem = {
      menuName: { width: 100, clickFn: 'handleGoTybe', clsName: 'cm-btn-color' },
      pageCode: 80,
      menuCode: 120,
      creater: 80,
      status: 80,
      parentMenuName: 100,
      menuDesc: 80,
      menuUrl: 200,
      btn: 70
    }
    let configDialogItem = [
      'menuName', 'menuCode', 'menuUrl',
      { status: { type: 'radio', options: [{ label: '正常', value: '1' }, { label: '停用', value: '0' }] } },
      { creater: { label: '创建人', type: 'docs' } },
      { gmtCreate: { label: '创建时间', type: 'docs' } },
      { menuDesc: { label: '描述', type: 'textarea', rows: 4 } }
    ]
    this.searchItem = this.$setItem(pageManageTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(pageManageTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(pageManageTest, configDialogItem, 'dialog')
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

export const tybeManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(searchTableInitObj)), ['edit', 'cancel', 'delete'])
  },
  created () {
    let configSearchItem = [
      'menuName',
      { status: { type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 2 }] } }
    ]
    let configTableItem = {
      menuName: { width: 100, clickFn: 'handleGoPage', clsName: 'cm-btn-color', type: 'input', canEdit: 1 },
      pageCode: 80,
      creater: { width: 120, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      status: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      parentMenuName: { width: 100, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      menuDesc: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      menuUrl: { width: 200, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      btn: 160
    }
    let configDialogItem = [
      { parentMenuName: { label: '上级菜单', type: 'select', options: [{ label: '一', value: 1 }, { label: '二', value: 2 }] } },
      'menuName', 'menuLevel', 'menuCode', 'menuUrl', 'sort',
      { status: { type: 'radio', options: [{ label: '正常', value: '1' }, { label: '停用', value: '0' }] } },
      { menuDesc: { label: '描述', type: 'textarea', rows: 4 } }
    ]
    this.searchItem = this.$setItem(tybeManageTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeManageTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(tybeManageTest, configDialogItem, 'dialog')
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

export const fastCreateType = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(tableInitObj)), ['edit', 'cancel', 'delete'])
  },
  created () {
    let configTableItem = {
      selection: 50,
      menuName: { width: 100, clickFn: 'handleGoPage', clsName: 'cm-btn-color', type: 'input', canEdit: 1 },
      pageCode: 80,
      creater: { width: 120, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
      menuDesc: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: '1' }, { label: '否', value: '0' }] },
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
