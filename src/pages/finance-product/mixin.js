import { basicInitObj, searchTableInitObj, tableInitObj, dialogInitObj } from '@/components/basicObj'
import { authMoreBtn } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

// 产品管理
export const productManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(dialogInitObj)))
  },
  created () {
    let configDialogItem = [
      { name: { label: '产品名称' } },
      { creater: { label: '创建人', type: 'docs', show: false } },
      { gmtCreate: { label: '创建时间', type: 'docs', show: false } }
    ]
    let dialogItem = this.dialogItem = this.$setItem([], configDialogItem, 'dialog')
    this.rules = {}
  }
}

// 形态管理

const shapeMoreList = authMoreBtn([
  { code: 'product-shape-edit', clickFn: 'handleEditData' },
  { code: 'product-shape-startup', clickFn: 'handleStartupShape', config: { inlineShow: false } },
  { code: 'product-shape-stop', clickFn: 'handleStartupShape', config: { inlineShow: false } },
  { code: 'product-shape-delete', clickFn: 'handleDeleteData', config: { deleteTip: '确定删除该形态？删除前请选确认已停用该形态' } },
  { code: 'product-shape-history', clickFn: 'handleShowHistory' }
])

export const shapeManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ detail: { code: 'product-shape-watch' } }, { more: { list: shapeMoreList, code: 'product-shape-more' } }])
  },
  created () {
    let configSearchItem = [
      { menuCode: { type: 'select', placeholder: '请选择菜单名称', label: '菜单名称', options: [] } },
      { pageStatus: { type: 'select', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    let configTableItem = {
      pageName: { width: 100, clsName: 'cm-btn-color' },
      pageCode: 80,
      menuCode: 120,
      userName: 80,
      pageStatus: { width: 80, clsName: 'pageStatus' },
      remark: 80,
      pageUrl: 200,
      btn: 120
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

// 形态历史版本
export const shapeHistory = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(tableInitObj)), [{ detail: { name: '查看', clickFn: 'handleShowHistory' } }])
  },
  created () {
    this.tableItem = [
      { label: '版本号', prop: 'pageName', type: 'cell', width: 80 },
      { label: '创建人', prop: 'pageName', type: 'cell', width: 80 },
      { label: '创建时间', prop: 'pageName', type: 'cell', width: 80 },
      { label: '操作', prop: 'btn', type: 'btn', width: 80 }
    ]
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
