import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { staffRoleTest } from '@/test/auth-config'

const initData = Object.assign({}, basicInitObj)

export const staffRole = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), ['edit', 'delete'])
  },
  created () {
    let configSearchItem = ['real_name', {
      department: { type: 'selectTree',
        treeOptions: []
      }
    }]
    let configTableItem = {
      selection: 50,
      real_name: 40,
      telephone: 60,
      department: 60,
      position: 60,
      role_name: 60,
      btn: 120
    }
    let configDialogItem = [
      ['id', 'buttonMenuName'],
      {
        buttonMenuName: { type: 'select', options: [] }
      }
    ]
    this.searchItem = this.$setItem(staffRoleTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(staffRoleTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(staffRoleTest, configDialogItem, 'dialog')

    this.rules = {
      id: [
        { required: true, message: '请输入IP地址', trigger: 'blur' }
      ],
      buttonName: [
        { required: true, message: '请输入按钮编码', trigger: 'blur' }
      ]
    }
  }
}
