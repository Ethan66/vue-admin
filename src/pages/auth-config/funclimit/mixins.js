import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { staffRoleTest } from '@/test/auth-config'

const initData = Object.assign({}, basicInitObj)

export const staffRole = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ edit: { code: 'config-manage-edit' } }, { delete: { code: 'config-manage-delete' } }])
  },
  created () {
    let configSearchItem = ['realName', {
      departmentId: {
        label: '部门',
        type: 'selectTree',
        treeOptions: []
      }
    }]
    let configTableItem = {
      selection: 50,
      realName: 40,
      telephone: 60,
      departmentName: 60,
      position: 60,
      roleName: 60,
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
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
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
