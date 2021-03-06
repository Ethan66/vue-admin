import { basicInitObj, searchTableInitObj, tableInitObj } from '@/components/basicObj'
import { authMoreBtn } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

const menuMoreList = authMoreBtn([
  { code: 'menu-add-same-level', clickFn: 'handleCreateLevelMenu' },
  { code: 'menu-add-next-level', clickFn: 'handleCreateNextLevelMenu' },
  { code: 'menu-show-menu', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'menu-hide-menu', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'menu-delete', clickFn: 'handleDeleteData' },
  { code: 'menu-detail', clickFn: 'handleShowDetailDialog' }
])

// 菜单管理
export const menu = {
  data () {
    return new this.$InitObj({
      modules: 'All',
      btnConfig: {
        tableBtn: [{ edit: { code: 'menu-edit-menu' } }, { more: { list: menuMoreList, code: 'menu-more' } }]
      },
      items: {
        search: {
          menuName: { label: '菜单名称' },
          status: { label: '状态', type: 'select', options: [{ label: '显示', value: 1 }, { label: '隐藏', value: 0 }] }
        },
        table: {
          menuName: { label: '菜单名称', type: 'tree', width: 200 },
          menuType: { label: '菜单类型', width: 90 },
          menuLevel: { label: '菜单等级', width: 100 },
          menuUrl: { label: '菜单链接', width: 200, textTip: '改页面的链接地址' },
          sortNo: { label: '排序', width: 70 },
          code: { label: '菜单编码', width: 100 },
          status: { label: '状态', width: 80, clsName: 'menuStatus' },
          btn: { width: 118 }
        },
        dialog: {
          menuParentName: { label: '上级菜单', show: false },
          menuParentId: { label: '上级菜单', type: 'selectTree', defaultProps: { children: 'list', label: 'menuName' }, dialogData: [] },
          menuName: { label: '菜单名称' },
          menuType: { label: '菜单类型', type: 'select', options: [{ label: '目录', value: 1 }, { label: '菜单', value: 2 }, { label: '按钮', value: 3 }] },
          code: { label: '菜单编码' },
          menuUrl: { label: '菜单链接' },
          menuIcon: { label: '菜单图标', width: 80 },
          sortNo: { label: '排序', type: 'number' },
          status: { label: '状态', type: 'radio', options: [{ label: '显示', value: 1 }, { label: '隐藏', value: 0 }] }
        }
      },
      rules: {
        menuName: [
          { required: true, trigger: 'blur', validator: this.validateMenuName }
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        code: [
          { required: true, trigger: 'blur', validator: this.validateCode }
        ],
        menuUrl: [
          { required: true, trigger: 'blur', validator: this.validateMenuUrl }
        ],
        sortNo: [
          { required: true, trigger: 'blur', validator: this.validateSortNo }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    })
  }
}

// 页面管理
export const pageManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ edit: { code: 'page-edit' } }])
  },
  created () {
    let configSearchItem = [
      { menuCode: { type: 'select', placeholder: '请选择菜单名称', label: '菜单名称', options: [] } },
      'pageName',
      { pageStatus: { type: 'select', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    let configTableItem = {
      pageName: { width: 100, clickFn: 'handleGoTybe', clsName: 'cm-btn-color' },
      pageCode: 80,
      menuCode: 120,
      userName: 80,
      pageStatus: { width: 80, clsName: 'pageStatus' },
      remark: 80,
      pageUrl: 200,
      btn: 70
    }
    let configDialogItem = [
      'pageName', 'pageCode', 'pageUrl', 'menuCode',
      { pageStatus: { type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } },
      { userName: { label: '创建人', type: 'docs', show: false } },
      { gmtCreate: { label: '创建时间', type: 'docs', show: false } },
      { remark: { label: '描述', type: 'textarea', rows: 4, show: false, placeholder: '100字以内' } }
    ]
    this.searchItem = this.$setItem(tybeObj['page-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['page-manage1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
    let dialogItem = this.dialogItem = this.$setItem(tybeObj['page-manage1'], configDialogItem, 'dialog')
    this.rules = {
      pageName: [
        { required: true, trigger: 'blur', validator: this.validatePageName }
      ],
      pageCode: [
        { required: true, trigger: 'blur', validator: this.validatePageCode }
      ],
      pageUrl: [
        { required: true, trigger: 'blur', validator: this.validatePageUrl }
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
    return this.$setBtnConfig(JSON.parse(JSON.stringify(searchTableInitObj)), [{ edit: { code: 'tybe-edit' } }, { cancel: { show: false } }, { delete: { code: 'tybe-delete', show: false } }])
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
      btn: 116
    }
    this.searchItem = this.$setItem(tybeObj['tybe-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['tybe-manage1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}

// 快速创建字段
export const fastCreateType = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(tableInitObj)), [{ edit: { noClickFn: true } }, { cancel: { show: false } }, { delete: { noClickFn: true, show: false } }])
  },
  created () {
    let configTableItem = {
      selection: 50,
      fieldValue: { width: 80, clickFn: 'handleGoPage', clsName: 'cm-btn-color', type: 'input', canEdit: 1 },
      fieldName: { width: 100, type: 'input', canEdit: 1 },
      fieldRequired: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      displayStatus: { width: 80, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      setStatus: { width: 120, type: 'select', canEdit: 1, options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] },
      btn: 112
    }
    this.tableItem = this.$setItem(tybeObj['tybe-manage2'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
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
