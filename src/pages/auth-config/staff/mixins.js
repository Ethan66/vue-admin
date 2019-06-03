import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig, authBtn } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

const initData = Object.assign({}, basicInitObj)

// 员工管理
const organizationMoreList = [
  { name: authBtn('staff-admin-stop'), clickFn: 'handleStop', show: authBtn('staff-admin-stop', 'show') },
  { name: authBtn('staff-admin-open'), clickFn: 'handleStart', show: authBtn('staff-admin-open', 'show') },
  { name: authBtn('staff-admin-login'), clickFn: 'handleAllowLogin', show: authBtn('staff-admin-login', 'show') },
  { name: authBtn('staff-admin-nologin'), clickFn: 'handleForbidLogin', show: authBtn('staff-admin-nologin', 'show') },
  { name: authBtn('staff-admin-reset'), clickFn: 'handleResetPassword', show: authBtn('staff-admin-reset', 'show') }
]

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [
      { edit: { code: 'staff-admin-edit' } }, { more: { list: organizationMoreList, code: 'organization-more' } }
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
      statusMsg: { clsName: 'statusMsg', width: 100 },
      roleName: 120,
      btn: 120
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
