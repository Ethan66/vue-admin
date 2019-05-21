import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { buttonTest, ipTableItem, accountTableItem, organizationTest } from '@/test/auth-config'

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
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), ['edit', { cancel: { name: '启 用', clickFn: 'handleOpen' } }, { cancel: { name: '停 用', clickFn: 'handleStop' } }])
  },
  created () {
    let configSearchItem = [
      'id',
      { buttonMenuName:
        { type: 'select',
          options: [{ label: '成功', value: '1' }, { label: '失败', value: '2' }]
        }
      }
    ]
    let configTableItem = {
      selection: 50,
      id: 80,
      buttonName: 100,
      buttonMenuName: { clsName: 'buttonMenuName', width: 100 },
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80,
      btn: 120
    }
    let configDialogItem = ['id', 'buttonCode', 'gmtCreate']
    this.searchItem = this.$setItem(ipTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(ipTableItem, configTableItem, 'table')
    this.dialogItem = this.$setItem(ipTableItem, configDialogItem, 'dialog')
    this.rules = {
      id: [
        { required: true, message: '请输入IP地址', trigger: 'blur' }
      ],
      buttonCode: [
        { required: true, message: '请选择状态', trigger: 'change' }
      ],
      gmtCreate: [
        { required: true, message: '请输入描述内容', trigger: 'change' }
      ]
    }
  }
}

// 账户控制
export const account = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)), [{ cancel: { name: '失 效', clickFn: 'handleInvalid' } }])
  },
  created () {
    let configSearchItem = [
      'id',
      { buttonMenuName:
        { type: 'select',
          options: [{ label: '成功', value: '1' }, { label: '失败', value: '2' }]
        }
      }
    ]
    let configTableItem = {
      selection: 80,
      id: 80,
      buttonName: 200,
      buttonMenuName: 100,
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80,
      btn: 70
    }
    this.searchItem = this.$setItem(accountTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(accountTableItem, configTableItem, 'table')
  }
}

// 组织架构
const organizationMoreList = [
  { name: '新建平级部门', clickFn: 'handleCreateDepartment' },
  { name: '新建下级部门', clickFn: 'handleCreateNextLevelDepartment' },
  { name: '停用', clickFn: 'handleStop' },
  { name: '删除', clickFn: 'handleDeleteData' }
]

export const organization = {
  data () {
    return this.$setBtnConfig(JSON.parse(JSON.stringify(basicInitObj)), ['edit', { more: { list: organizationMoreList } }])
  },
  created () {
    this.tybeArr = organizationTest
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
      { parentMenuName: { label: '上级部门', type: 'select', options: [{ label: '一', value: 1 }, { label: '二', value: 2 }] } },
      'departmentName',
      {
        departmentType: { type: 'select', options: [{ label: '集团', value: 0 }, { label: '公司', value: 1 }, { label: '事业部', value: 2 }, { label: '部门', value: 3 }] }
      },
      'sortNo', 'directorName',
      { departmentStatus: { type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }] } }
    ]
    this.searchItem = this.$setItem(organizationTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(organizationTest, configTableItem, 'table')
    let dialogItem = this.dialogItem = this.$setItem(organizationTest, configDialogItem, 'dialog')
    this.rules = {
      departmentName: [
        { required: true, message: dialogItem[1].placeholder, trigger: 'blur' }
      ],
      departmentType: [
        { required: true, message: dialogItem[2].placeholder, trigger: 'change' }
      ],
      sortNo: [
        { required: true, message: dialogItem[3].placeholder, trigger: 'blur' }
      ],
      departmentStatus: [
        { required: true, message: dialogItem[5].placeholder, trigger: 'change' }
      ]
    }
  }
}
