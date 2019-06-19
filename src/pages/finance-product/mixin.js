import { basicInitObj, tableInitObj, dialogInitObj } from '@/components/basicObj'
import { authMoreBtn } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

// 产品管理
export const productManage = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(dialogInitObj)))
  },
  created () {
    let configDialogItem = [
      { productName: { label: '产品名称' } },
      { productColor: { label: '产品颜色', type: 'select', options: [{ label: '蓝色(#335EFE)', value: '#335EFE' }, { label: '天蓝色(#86A0FF)', value: '#86A0FF' }, { label: '紫色(#6D52E4)', value: '#6D52E4' }, { label: '玫红色(#B772FF)', value: '#B772FF' }, { label: '黄色(#F7BF5E)', value: '#F7BF5E' }] } },
      { creater: { label: '创建人', type: 'docs', show: false } },
      { gmtCreate: { label: '创建时间', type: 'docs', show: false } }
    ]
    let dialogItem = this.dialogItem = this.$setItem([], configDialogItem, 'dialog')
    this.rules = {
      productName: [{ required: true, message: dialogItem[0].placeholder, trigger: 'blur' }],
      productColor: [{ required: true, validator: this.validateProductColor, trigger: 'blur' }]
    }
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
      'id',
      { productFormStatus: { label: '状态', type: 'select', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    let configTableItem = {
      productFormName: { width: 100, clsName: 'cm-btn-color' },
      productFormVersionName: 80,
      productFormObject: 120,
      sceneName: 80,
      productFormStatusName: { width: 80, clsName: 'productFormStatusName' },
      btn: 120
    }
    this.searchItem = this.$setItem(tybeObj['shape-manage'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['shape-manage'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
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
      { label: '版本号', prop: 'productFormVersion', type: 'cell', width: 80 },
      { label: '创建人', prop: 'createrName', type: 'cell', width: 80 },
      { label: '创建时间', prop: 'gmtCreate', type: 'cell', width: 80 },
      { label: '操作', prop: 'btn', type: 'btn', width: 80 }
    ]
  }
}
