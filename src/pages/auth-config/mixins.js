import { basicInitObj } from '@/components/basicObj'
import { authBtn, setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')
const initData = Object.assign({}, basicInitObj)

// IP控制
export const ipControl = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ edit: { code: 'visit-ip-edit' } }, { cancel: { name: '启 用', clickFn: 'handleOpen', show: false, code: 'visit-ip-open' } }, { cancel: { name: '停 用', clickFn: 'handleStop', show: false, code: 'visit-ip-stop' } }])
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
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ cancel: { name: '失 效', clickFn: 'handleInvalid', show: false, code: 'visit-c-stop' } }])
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
      btn: 70
    }
    this.searchItem = this.$setItem(tybeObj['visit-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['visit-manage1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}

// 组织架构
const organizationMoreList = [
  { name: authBtn('organization-add-same-level'), clickFn: 'handleCreateDepartment', show: authBtn('organization-add-same-level', 'show') },
  { name: authBtn('organization-add-next-level'), clickFn: 'handleCreateNextLevelDepartment', show: authBtn('organization-add-next-level', 'show') },
  { name: authBtn('organization-stop'), clickFn: 'handleStop', show: authBtn('organization-stop', 'show') },
  { name: authBtn('organization-delete'), clickFn: 'handleDeleteData', show: authBtn('organization-delete', 'show'), deleteTip: '确定删除该部门吗，删除后该部门的所有下属部门也被删除' }
]

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

// 员工管理
export const staffRole = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ edit: { code: 'config-manage-edit' } }, { cancel: { noTip: false, code: 'config-manage-delete', clickFn: 'handleDeleteBtn' } }])
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
