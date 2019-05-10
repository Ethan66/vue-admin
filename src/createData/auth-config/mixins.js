import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { buttonTest } from '@/test/auth-config'

const initData = Object.assign({}, basicInitObj)

/* export const menu = {
  data () {
    return setBtnConfig({ ...tableObj, ...dialogObj }, ['edit', 'delete', { setting: { name: '按钮管理', clickFn: 'handleBtnManage' } }])
  },
  created () {
    // 表格配置
    this.tableItem = [ // type: 'selection: 选择框可显示隐藏'，width: 单元格宽度, prop: '数据的key'
      { type: 'selection', width: '55', show: true },
      { id: '菜单id', width: '80' },
      { menuName: '菜单名称', type: 'tree', width: '200' },
      { menuLevel: '类型', width: '100' },
      { parentMenuName: '父菜单名称', width: '100' },
      { menuUrl: '菜单链接', width: '200' },
      { type: 'btn', width: '96' }
    ]
    // 对话框配置
    this.dialogItem = [
      {
        menuParentId: '父菜单名称',
        placeholder: '父菜单名称',
        type: 'select',
        options: []
      },
      { menuName: '菜单名称', placeholder: '菜单名称' },
      { menuCode: '菜单编码', placeholder: '菜单编码' },
      { menuSort: '排序', placeholder: '排序' },
      { menuUrl: 'url', placeholder: '菜单链接' }
    ]
    this.rules = {
      id: [
        {required: true, message: '请输入菜单id', trigger: 'blur'}
      ],
      menuName: [
        {required: true, message: '请输入菜单名称', trigger: 'blur'}
      ],
      menuLevel: [
        {required: true, message: '请选择菜单类型', trigger: 'change'}
      ]
    }
  }
} */

export const button = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = ['buttonName']
    let configTableItem = {
      id: 80,
      buttonName: 200,
      buttonMenuName: 100,
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80
    }
    let configDialogItem = ['buttonName', 'buttonCode']
    this.searchItem = this.$setItem(buttonTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(buttonTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(buttonTest, configDialogItem, 'dialog')
    this.rules = {
      buttonName: [
        {required: true, message: '请输入按钮名称', trigger: 'blur'}
      ],
      buttonCode: [
        {required: true, message: '请输入按钮编码', trigger: 'blur'}
      ]
    }
  }
}

export const role = {
  data () {
    return setBtnConfig(basicObj)
  },
  created () {
    // 搜索配置
    this.searchItem = [ // type/disabled/placeholder/changeFn可不填
      { buttonName: '按钮名称', placeholder: '请输入按钮名称' }
    ]
    // 表格配置
    this.tableItem = [ // type: 'selection: 选择框可显示隐藏'，width: 单元格宽度, prop: '数据的key'
      { roleName: '角色名', width: '80' },
      { roleCode: '角色编码', width: '200' },
      { gmtCreate: '创建时间', width: '200' },
      { gmtModified: '修改时间', width: '80' },
      { type: 'btn', width: '80' }
    ]
    // 对话框配置
    this.dialogItem = [
      { roleName: '角色名称', placeholder: '角色名称' },
      { roleCode: '角色编码', placeholder: '角色编码' }
    ]
    this.rules = {
      roleName: [
        {required: true, message: '请输入角色名称', trigger: 'blur'}
      ],
      roleCode: [
        {required: true, message: '请输入角色编码', trigger: 'blur'}
      ]
    }
  }
}
