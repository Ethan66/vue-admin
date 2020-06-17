import { configBtn } from '@/config/methods.js'

// 用户管理
export const user = {
  data () {
    return new this.$InitObj({
      items: {
        search: {
          account: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          name: { label: '用户名' },
          status: { label: '状态', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          date: { label: '时间', key: 'str1,str2', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        },
        table: {
          selection: '',
          account: { label: '账号', width: 100, show: false },
          name: { label: '用户名', width: 100 },
          roleName: { label: '角色', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'userStatus', formatterFn: this.$InitObj.prototype.formmater(['禁止登录', '允许登录']) },
          loginTime: { label: '最近登录', width: 120 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118, slot: 'btn' }
        },
        dialog: {
          account: { label: '账号' },
          name: { label: '用户名' },
          roleId: { label: '角色', type: 'select', options: [] },
          password: { label: '密码', type: 'password' },
          status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] }
        }
      },
      rules: {
        account: [
          { required: true, trigger: 'blur', message: '请填写账号' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '请填写用户名' }
        ],
        roleId: [
          { required: true, trigger: 'change', message: '请选择角色' }
        ]
      }
    })
  },
  created () {
    this.tableBtn = configBtn([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
  }
}

// const roleMoreList = authMoreBtn([
//   { code: 'role-agree-role', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
//   { code: 'role-bin-role', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
//   { code: 'role-delete-role', clickFn: 'handleDeleteData' }
// ])

// 角色管理
export const role = {
  data () {
    return new this.$InitObj({
      items: {
        search: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        },
        table: {
          selection: '',
          roleName: { label: '角色名', width: 100 },
          roleId: { label: '角色Id', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'roleStatus', formatterFn: this.$InitObj.prototype.formmater(['失效', '正常']) },
          updateDate: { label: '更新时间', width: 100 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118 }
        },
        dialog: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'radio', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        }
      },
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名' }
        ]
      }
    })
  },
  created () {
    this.tableBtn = configBtn([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
  }
}

// 角色授权
export const roleAuth = {
  data () {
    return new this.$InitObj({
      items: {
        dialog: {
          roleName: { label: '角色名' },
          userIdList: { label: '所属用户', type: 'selectMore', options: [] },
          status: { label: '状态', type: 'radio', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        }
      },
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名' }
        ],
        userIdList: [
          { required: true, message: '请选择所属用户', trigger: 'change' }
        ]
      }
    })
  }
}
/*
// IP控制
export const ipControl = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ edit: { code: 'visit-ip-edit' } }, { cancel: { clickFn: 'handleOpen', inlineShow: false, code: 'visit-ip-open' } }, { cancel: { clickFn: 'handleStop', inlineShow: false, code: 'visit-ip-stop' } }])
  },
  created () {
    let configSearchItem = [
      'addressIp',
      { isDelete:
        { type: 'select',
          label: '状态',
          options: [{ label: '有效', value: '0' }, { label: '失效', value: '1' }]
        }
      }
    ]
    let configTableItem = {
      selection: 50,
      addressIp: 80,
      creater: 80,
      isDeleteName: { clsName: 'isDeleteName', width: 80 },
      remark: 100,
      gmtCreate: 160,
      btn: 120
    }
    let configDialogItem = [
      'addressIp',
      { isDelete:
        { type: 'radio',
          options: [{ label: '成功', value: '1' }, { label: '失败', value: '2' }]
        }
      }
    ]
    this.searchItem = this.$setItem(tybeObj['visit-manage2'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['visit-manage2'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
    this.dialogItem = this.$setItem(tybeObj['visit-manage2'], configDialogItem, 'dialog')
    this.rules = {
      addressIp: [
        { required: true, message: '请输入IP地址', trigger: 'blur' }
      ],
      isDelete: [
        { required: true, message: '请选择状态', trigger: 'change' }
      ],
      remark: [
        { required: true, message: '请输入描述内容', trigger: 'change' }
      ]
    }
  }
}

// 账户控制
export const account = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ cancel: { clickFn: 'handleInvalid', inlineShow: false, code: 'visit-c-stop' } }])
  },
  created () {
    let configSearchItem = [
      { userName:
        {
          label: '姓名'
        }
      },
      { isDelete:
        { type: 'select',
          label: '状态',
          options: [{ label: '有效', value: '0' }, { label: '失效', value: '1' }]
        }
      }
    ]
    let configTableItem = {
      selection: 50,
      userRealName: 60,
      departmentName: 80,
      createrName: 80,
      grandBegin: 120,
      remark: 100,
      isDeleteMsg: { clsName: 'isDeleteMsg', width: 80 },
      gmtCreate: 160,
      btn: 75
    }
    this.searchItem = this.$setItem(tybeObj['visit-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['visit-manage1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}
*/
