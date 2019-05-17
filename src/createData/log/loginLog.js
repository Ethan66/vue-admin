import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'
import { tableItemList } from '@/test/log'

const initData = Object.assign({}, basicInitObj)

export const button = {
  data () {
    return setBtnConfig(JSON.parse(JSON.stringify(initData)))
  },
  created () {
    let configSearchItem = [
      [ 'id', 'gmtModified' ],
      {
        gmtModified: { type: 'select',
          options: [
            { label: '成功', value: '1' },
            { label: '失败', value: '2' }
          ]
        }
      }
    ]
    let configTableItem = {
      id: 80,
      buttonName: 100,
      buttonMenuName: 100,
      buttonCode: 100,
      gmtCreate: 200,
      gmtModified: 80,
      isDelete: 80
    }
    this.searchItem = this.$setItem(tableItemList, configSearchItem, 'search')
    this.tableItem = this.$setItem(tableItemList, configTableItem, 'table')
  }
}
