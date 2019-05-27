import { basicInitObj } from '@/components/basicObj'
import { buttonTest, ipTableItem, accountTableItem } from '@/test/auth-config'
import { showBtn, getBtnName, setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')

const initData = Object.assign({}, basicInitObj)

export const button = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = ['buttonName']
    let configTableItem = {
      selection: 50,
      id: 80,
      buttonName: 200,
      buttonMenuName: 100,
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80
    }
    let configDialogItem = ['buttonName', 'buttonCode']
    this.searchItem = this.$setItem(buttonTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(buttonTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(buttonTest, configDialogItem, 'dialog')
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

// IP控制
export const ipControl = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), ['edit', { cancel: { name: '启 用', clickFn: 'handleOpen', show: false } }, { cancel: { name: '停 用', clickFn: 'handleStop', show: false } }])
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
      isDelete: { clsName: 'isDelete', width: 80 },
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
    this.searchItem = this.$setItem(ipTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(ipTableItem, configTableItem, 'table')
    this.dialogItem = this.$setItem(ipTableItem, configDialogItem, 'dialog')
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
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ cancel: { name: '失 效', clickFn: 'handleInvalid', code: 'visit-c-stop' } }])
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
      gmtModified: 120,
      remark: 100,
      isDeleteMsg: { clsName: 'isDeleteMsg', width: 80 },
      gmtCreate: 160,
      btn: 70
    }
    this.searchItem = this.$setItem(accountTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(accountTableItem, configTableItem, 'table')
  }
}

// 组织架构
const organizationMoreList = [
  { name: getBtnName('organization-add-same-level'), clickFn: 'handleCreateDepartment', show: showBtn('organization-add-same-level') },
  { name: getBtnName('organization-add-next-level'), clickFn: 'handleCreateNextLevelDepartment', show: showBtn('organization-add-next-level') },
  { name: getBtnName('organization-stop'), clickFn: 'handleStop', show: showBtn('organization-stop') },
  { name: getBtnName('organization-delete'), clickFn: 'handleDeleteData', show: showBtn('organization-delete'), deleteTip: '确定删除该部门吗，删除后该部门的所有下属部门也被删除' }
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
      sortNo: 60,
      departmentName: { type: 'tree', width: 200 },
      directorName: 80,
      departmentStatus: { clsName: 'departmentStatus', width: 80 },
      departmentType: 100,
      btn: 120
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
      'directorName',
      { departmentStatus: { type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    this.searchItem = this.$setItem(tybeObj['organization-manage1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['organization-manage1'], configTableItem, 'table')
    let dialogItem = this.dialogItem = this.$setItem(tybeObj['organization-manage1'], configDialogItem, 'dialog')
    this.rules = {
      departmentName: [
        { required: true, trigger: 'blur', validator: this.validateDepartmentName }
      ],
      departmentType: [
        { required: true, message: dialogItem[2].placeholder, trigger: 'change' }
      ],
      sortNo: [
        { required: true, message: dialogItem[3].placeholder, trigger: 'blur' }
      ],
      departmentStatus: [
        { required: true, message: dialogItem[4].placeholder, trigger: 'change' }
      ]
    }
  }
}
