import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')
const initData = Object.assign({}, basicInitObj)

export const loginLog = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
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
