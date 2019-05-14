import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { buttonTest, staffTest } from '@/test/auth-config'

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

export const role = {
  data () {
    return setBtnConfig(basicInitObj)
  },
  created () {
    // 搜索配置
    this.searchItem = [ // type/disabled/placeholder/changeFn可不填
      { buttonName: '部门名称', placeholder: '请输入' }
    ]
    // 表格配置
    this.tableItem = [ // type: 'selection: 选择框可显示隐藏'，width: 单元格宽度, prop: '数据的key'
      { roleName: '角色名', width: '80' },
      { roleCode: '角色编码', width: '200' },
      { gmtCreate: '创建时间', width: '200' },
      { gmtModified: '修改时间', width: '80' },
      { type: 'btn', width: '80' }
    ]
    // 对话框配置
    this.dialogItem = [
      { roleName: '角色名称', placeholder: '角色名称' },
      { roleCode: '角色编码', placeholder: '角色编码' }
    ]
    this.rules = {
      roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' }
      ],
      roleCode: [
        { required: true, message: '请输入角色编码', trigger: 'blur' }
      ]
    }
  }
}

export const staff = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = ['department', 'status']
    let configTableItem = {
      selection: 60,
      name: 80,
      phone: 200,
      department: 100,
      position: 100,
      report: 200,
      status: 80,
      role: 80
    }
    let configDialogItem = ['nickname', 'name', 'phone', 'email', 'password', '']
    this.searchItem = this.$setItem(staffTest, configSearchItem, 'search')
    this.tableItem = this.$setItem(staffTest, configTableItem, 'table')
    this.dialogItem = this.$setItem(staffTest, configDialogItem, 'dialog')
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
