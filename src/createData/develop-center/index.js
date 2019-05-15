import { basicInitObj } from '@/components/basicObj'
import { menuTest } from '@/test/develop-center'

const initData = Object.assign({}, basicInitObj)

const menuMoreList = [
  { name: '新建平级菜单', clickFn: 'handleCreateLevelMenu' },
  { name: '新建下级菜单', clickFn: 'handleCreateNextLevelMenu' },
  { name: '删除', clickFn: 'handleDelete' },
  { name: '详情', clickFn: 'handleGoDetail' }
]

export const menu = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(initData)), ['edit', { more: { list: menuMoreList } }])
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
      'menuName', 'menuLevel', 'menuCode', 'menuUrl', 'sort', 'status'
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
