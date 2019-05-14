import { basicInitObj } from '@/components/basicObj'
import { menuTest } from '@/test/develop-center'

const initData = Object.assign({}, basicInitObj)

const menuMoreList = [
  { name: '新建平级部门', clickFn: 'handleCreateLevelDepartment' },
  { name: '新建下级部门', clickFn: 'handleCreateNextLevelDepartment' },
  { name: '停用', clickFn: 'handleStop' },
  { name: '删除', clickFn: 'handleDelete' }
]

export const menu = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(initData)), ['edit', { more: { list: menuMoreList } }])
  },
  created () {
    let configSearchItem = ['id', 'menuName', 'menuLevel', 'parentMenuName', 'menuUrl']
    let configTableItem = {
      id: 80,
      menuName: { type: 'tree', width: 200 },
      menuLevel: { clsName: 'menuLevel', width: 100 },
      parentMenuName: 100,
      menuUrl: 200,
      btn: 120
    }
    let configDialogItem = [
      [ 'parentMenuName', 'menuName', 'menuCode', 'menuSort', 'menuUrl' ],
      {
        parentMenuName: { type: 'select' }
      }
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
