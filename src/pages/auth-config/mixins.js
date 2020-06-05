import { configBtn } from '@/components/methods.js'

// 用户管理
export const user = {
  data () {
    return new this.$InitObj({
      items: {
        search: {
          account: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          name: { label: '用户名' },
          status: { label: '状态', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          date: { label: '时间', key: 'str1', type: 'date', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        },
        table: {
          selection: '',
          account: { label: '账号', width: 100 },
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

// 组织架构
const organizationMoreList = authMoreBtn([
  { code: 'organization-add-same-level', clickFn: 'handleCreateDepartment' },
  { code: 'organization-add-next-level', clickFn: 'handleCreateNextLevelDepartment' },
  { code: 'organization-stop', clickFn: 'handleStop', config: { inlineShow: false } },
  { code: 'organization-open', clickFn: 'handleOpen', config: { inlineShow: false } },
  { code: 'organization-delete', clickFn: 'handleDeleteData', config: { deleteTip: '确定删除该部门吗，删除后该部门的所有下属部门也被删除' } }
])

export const organization = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ edit: { code: 'organization-edit' } }, { more: { list: organizationMoreList, code: 'organization-more' } }])
  },
  created () {
    let configSearchItem = [
      'departmentName',
      { departmentStatus: { type: 'select', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    let configTableItem = {
      departmentCount: 80,
      sortNo: 90,
      departmentName: { type: 'tree', width: 200 },
      directorName: 80,
      departmentStatus: { clsName: 'departmentStatus', width: 80 },
      departmentType: 100,
      btn: 130
    }
    let configDialogItem = [
      {
        parentId: {
          label: '上级部门',
          type: 'selectTree',
          defaultProps: { children: 'list', label: 'departmentName' },
          dialogData: []
        }
      },
      'departmentName',
      {
        departmentType: { type: 'select', options: [{ label: '集团', value: 0 }, { label: '公司', value: 1 }, { label: '事业部', value: 2 }, { label: '部门', value: 3 }] }
      },
      { sortNo: { type: 'number' } },
      { directorId: {
        label: '负责人',
        type: 'selectTree2',
        defaultProps: { children: 'childIdList', label: 'departmentName' },
        dialogData: [],
        textTip: '部门负责人即为部门管理人员'
      } },
      { departmentStatus: { type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    this.searchItem = this.$setItem(tybeObj['organization-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['organization-manage1'], configTableItem, 'table')
    let dialogItem = this.dialogItem = this.$setItem(tybeObj['organization-manage1'], configDialogItem, 'dialog')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
    this.rules = {
      departmentName: [
        { required: true, trigger: 'blur', validator: this.validateDepartmentName }
      ],
      departmentType: [
        { required: true, message: dialogItem[2].placeholder, trigger: 'change' }
      ],
      sortNo: [
        { required: true, validator: this.validateSortNo, trigger: 'blur' }
      ],
      departmentStatus: [
        { required: true, message: dialogItem[5].placeholder, trigger: 'change' }
      ]
    }
  }
}

// 员工角色分配
export const staffRole = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ edit: { code: 'config-manage-edit' } }, { cancel: { noTip: false, code: 'config-manage-delete', clickFn: 'handleDeleteBtn' } }])
  },
  created () {
    let configSearchItem = ['realName', {
      departmentId: {
        label: '部门',
        type: 'selectTree',
        dialogData: [],
        defaultProps: { children: 'childIdList', label: 'departmentName' }
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
    this.searchItem = this.$setItem(tybeObj['function-limit1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['function-limit1'], configTableItem, 'table')
    this.dialogItem = this.$setItem(tybeObj['function-limit1'], configDialogItem, 'dialog')
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

// 员工管理
const staffManageMoreList = authMoreBtn([
  { code: 'staff-admin-stop', clickFn: 'handleStop', config: { inlineShow: false } },
  { code: 'staff-admin-open', clickFn: 'handleStart', config: { inlineShow: false } },
  { code: 'staff-admin-login', clickFn: 'handleAllowLogin', config: { inlineShow: false } },
  { code: 'staff-admin-nologin', clickFn: 'handleForbidLogin', config: { inlineShow: false } },
  { code: 'staff-admin-reset', clickFn: 'handleResetPassword' }
])

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [
      { edit: { code: 'staff-admin-edit' } }, { more: { list: staffManageMoreList, code: 'organization-more' } }
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

// 基础数据权限
export const dataAuth = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(tableInitObj)))
  },
  created () {
    let configTableItem = {
      menuName: { width: 100, clsName: 'cm-btn-color' },
      sharePermission: { width: 200, type: 'radio', options: [{ label: '私有', value: 2 }, { label: '公开只读', value: 0 }, { label: '公开读写', value: 1 }], changeFn: 'handleChooseAuth' }
    }
    this.tableItem = this.$setItem(tybeObj['data-auth'], configTableItem, 'table')
  }
}

// 数据权限共享
const dataShareMoreList = authMoreBtn([
  { code: 'data-share-startup', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'data-share-stop', clickFn: 'handleChangeStatus', config: { inlineShow: false } },
  { code: 'data-share-delete', clickFn: 'handleDeleteData' }
])

export const dataShare = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), [{ edit: { code: 'data-share-edit' } }, { more: { list: dataShareMoreList, code: 'data-share-more' } }])
  },
  created () {
    let configSearchItem = [
      'dataFrom',
      { ruleStatus: { type: 'select', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    let configTableItem = {
      dataFrom: 200,
      menuNames: 100,
      dataTo: 100,
      dataPermission: 200,
      ruleStatus: { width: 90, clsName: 'ruleStatus' },
      btn: 118
    }
    let configDialogItem = [
      {
        dataFrom: {
          type: 'selectTree',
          defaultProps: { children: 'childIdList', label: 'departmentName' },
          dialogData: []
        }
      },
      { menuCode: { label: '共享菜单', type: 'selectMore', options: [] } },
      { dataTo: {
        type: 'selectTree2',
        defaultProps: { children: 'childIdList', label: 'departmentName' },
        dialogData: []
      } },
      { dataPermission: { type: 'radio', options: [{ label: '只读', value: 0 }, { label: '读写', value: 1 }] } }
    ]
    this.searchItem = this.$setItem(tybeObj['data-share'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['data-share'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
    let dialogItem = this.dialogItem = this.$setItem(tybeObj['data-share'], configDialogItem, 'dialog')
  }
}
 */
