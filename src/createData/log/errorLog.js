import { basicInitObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'

const tybeObj = JSON.parse(sessionStorage.getItem('tybeObj') || '{}')
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
