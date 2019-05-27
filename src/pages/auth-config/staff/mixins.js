import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { staffTest } from '@/test/auth-config'

const initData = Object.assign({}, basicInitObj)

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [
      { edit: { code: 'staff-admin-edit' } },
      { cancel: { name: '停 用', clickFn: 'handleStop', show: false, code: 'staff-admin-stop' } },
      { cancel: { name: '启 用', clickFn: 'handleStart', show: false, code: 'staff-admin-open' } },
      { cancel: { name: '禁止登录', clickFn: 'handleForbidLogin', show: false, code: 'staff-admin-nologin' } },
      { cancel: { name: '允许登录', clickFn: 'handleAllowLogin', show: false, code: 'staff-admin-login' } },
      { cancel: { name: '重置密码', clickFn: 'handleResetPassword', show: true, code: 'staff-admin-reset' } }
    ])
  },
  created () {
    let configSearchItem = ['department_id', 'status']
    let configTableItem = {
      selection: 50,
      realName: { width: 100, clickFn: 'handleShowInfo', clsName: 'cm-btn-color' },
      telephone: 100,
      departmentName: 100,
      position: 100,
      reportToName: 80,
      statusMsg: 100,
      roleName: 80,
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
