/* import { setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')
const initData = Object.assign({}, basicInitObj)

// 登录日志
export const loginLog = {
  data () {
    return new this.$InitObj({
      modules: ['search', 'table'],
      items: {
        search: {
          userName: { label: '姓名' },
          loginStatus: { label: '状态', type: 'select', options: [{ label: '成功', value: '0' }, { label: '失败', value: '1' }] }
        },
        table: {
          userName: { label: '姓名', width: 80 },
          terminalType: { label: '终端', width: 100 },
          operateSystem: { label: '操作系统', width: 100 },
          loginIp: { label: 'IP', width: 100 },
          loginStatus: { label: '状态', width: 80, clsName: 'loginStatus' },
          loginTime: { label: '登录时间', width: 90 }
        }
      }
    })
    // return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = [
      'userName',
      { loginStatus:
        { type: 'select',
          options: [{ label: '成功', value: '0' }, { label: '失败', value: '1' }]
        }
      }
    ]
    let configTableItem = {
      userName: 80,
      buttonName: 100,
      terminalType: 100,
      operateSystem: 100,
      loginIp: 100,
      gmtModified: 80,
      loginStatus: { clsName: 'loginStatus', width: 80 },
      gmtCreate: 90
    }
    this.searchItem = this.$setItem(tybeObj['log-login1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['log-login1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}

// 错误日志
export const errorLog = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = [
      { 'menuCode':
        { type: 'select',
          label: '菜单名称',
          placeholder: '请输入菜单名称',
          options: [{ label: '成功', value: '0' }, { label: '失败', value: '1' }]
        }
      },
      'realName',
      { opStatus:
        { type: 'select',
          label: '状态',
          options: [{ label: '成功', value: '0' }, { label: '失败', value: '1' }]
        }
      }
    ]
    let configTableItem = {
      realName: 80,
      menuName: 100,
      menuCode: 70,
      opTypeDesc: 100,
      opStatusDesc: { clsName: 'opStatusDesc', width: 80 },
      opResult: 90,
      gmtCreate: 90
    }
    this.searchItem = this.$setItem(tybeObj['error-log1'], configSearchItem, 'search')
    this.tableItem = this.$setItem(tybeObj['error-log1'], configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}
 */