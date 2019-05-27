import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { errorTableItem } from '@/test/log'

const initData = Object.assign({}, basicInitObj)

export const errorLog = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    console.log(this.tableItem)
    let configSearchItem = [
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
      menuCode: 70,
      opTypeDesc: 100,
      id: 100,
      opStatusDesc: { clsName: 'opStatusDesc', width: 80 },
      opResult: 80,
      gmtCreate: 80
    }
    this.searchItem = this.$setItem(errorTableItem, configSearchItem, 'search')

    this.tableItem = this.$setItem(errorTableItem, configTableItem, 'table')
  }
}
