import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

const initData = Object.assign({}, basicInitObj)

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [
      { edit: { code: 'staff-admin-edit' } },
      { cancel: { name: '停用', clickFn: 'handleStop', show: false, code: 'staff-admin-stop' } },
      { cancel: { name: '启用', clickFn: 'handleStart', show: false, code: 'staff-admin-open' } },
      { cancel: { name: '禁止登录', clickFn: 'handleForbidLogin', show: false, code: 'staff-admin-nologin' } },
      { cancel: { name: '允许登录', clickFn: 'handleAllowLogin', show: false, code: 'staff-admin-login' } },
      { cancel: { name: '重置密码', clickFn: 'handleResetPassword', code: 'staff-admin-reset' } }
    ])
  },
  created () {
    let configSearchItem = [{
      status: { type: 'select',
        label: '状态',
        options: [
          { label: '正常', value: 0 },
          { label: '停用', value: 1 },
          { label: '禁止登录', value: 2 }
        ]
      }
    }, 'realName']
    let configTableItem = {
      selection: 50,
      realName: { width: 80, clickFn: 'handleShowInfo', clsName: 'cm-btn-color' },
      telephone: 120,
      departmentName: 100,
      position: 100,
      reportToName: 100,
      statusMsg: 100,
      roleName: 120,
      btn: 260
    }
    this.searchItem = this.$setItem(tybeObj['staff-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['staff-manage1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
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
