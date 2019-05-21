import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { errorTableItem } from '@/test/log'

const initData = Object.assign({}, basicInitObj)

export const errorLog = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = [
      'userName',
      { opStatus:
        { type: 'select',
          options: [{ label: '成功', value: '0' }, { label: '失败', value: '1' }]
        }
      }
    ]
    let configTableItem = {
      userName: 80,
      opResult: 100,
      terminalType: 100,
      opType: 100,
      id: 100,
      opStatusDesc: 80,
      opTypeDesc: { clsName: 'opTypeDesc', width: 80 },
      gmtCreate: 80
    }
    this.searchItem = this.$setItem(errorTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(errorTableItem, configTableItem, 'table')
  }
}
