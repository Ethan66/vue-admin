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
      id: 100,
      opStatusDesc: { clsName: 'opStatusDesc', width: 80 },
      opResult: 80,
      gmtCreate: 80
    }
    this.searchItem = this.$setItem(errorTableItem, configSearchItem, 'search')
    this.tableItem = this.$setItem(errorTableItem, configTableItem, 'table')
    if (this.tableBtn.filter(item => item.show).length === 0) {
      this.tableItem.splice(this.tableItem.length - 1, 1)
    }
  }
}
