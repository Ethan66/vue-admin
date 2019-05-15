import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { buttonTest, ipTableItem, accountTableItem } from '@/test/auth-config'

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
      { buttonName: '按钮名称', placeholder: '请输入按钮名称' }
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
    let configDialogItem = [
      ['id', 'buttonMenuName'],
      {
        buttonMenuName: { type: 'select',
          options: [
            { label: '成功', value: '1' },
            { label: '失败', value: '2' }
          ]
        }
      }
    ]
    this.searchItem = this.$setItem(ipTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(ipTableItem, configTableItem, 'table')
    this.dialogItem = this.$setItem(ipTableItem, configDialogItem, 'dialog')
    console.log(this.dialogItem)
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

// 账户控制
export const account = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = ['buttonName']
    let configTableItem = {
      id: 80,
      buttonName: 200,
      buttonMenuName: 100,
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80
    }
    let configDialogItem = ['buttonName', 'buttonCode']
    this.searchItem = this.$setItem(accountTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(accountTableItem, configTableItem, 'table')
    this.dialogItem = this.$setItem(accountTableItem, configDialogItem, 'dialog')
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
