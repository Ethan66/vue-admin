import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { staffTest } from '@/test/auth-config'

const initData = Object.assign({}, basicInitObj)

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [
      'edit',
      { cancel: { name: '停 用', clickFn: 'handleStop' } },
      { cancel: { name: '禁止登录', clickFn: 'handleForbidLogin' } },
      { cancel: { name: '重置密码', clickFn: 'handleResetPassword' } }
    ])
  },
  created () {
    let configSearchItem = ['department', 'status']
    let configTableItem = {
      selection: 50,
      name: 80,
      phone: 100,
      department: 100,
      position: 100,
      report: 100,
      status: 80,
      role: 80,
      btn: 260
    }
    this.searchItem = this.$setItem(staffTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(staffTest, configTableItem, 'table')
    this.rules = {
      buttonName: [
        { required: true, message: '请输入按钮名称', trigger: 'blur' }
      ],
      buttonCode: [
        { required: true, message: '请输入按钮编码', trigger: 'blur' }
      ]
    }
  }
}
