import { basicObj } from '@/components/basicObj'
import { setBtnConfig } from '@/components/methods'

export const merchant = {
  data () {
    return setBtnConfig(basicObj)
  },
  created () {
    // 搜索配置
    this.searchItem = [ // type/disabled/placeholder/changeFn可不填
      { buttonName: '商户名称', placeholder: '请输入商户名称' },
      { buttonName: '商户编号', placeholder: '请输入商户编号' },
      { buttonName: '公司名称', placeholder: '请输入公司名称' },
      { buttonName: '所属行业', placeholder: '请输入所属行业' }
    ]
    // 表格配置
    this.tableItem = [ // type: 'selection: 选择框可显示隐藏'，width: 单元格宽度, prop: '数据的key'
      { type: 'selection', width: '55', show: true },
      { id: '商户名称', width: '80' },
      { menuName: '商户编号', type: 'tree', width: '140' },
      { menuLevel: '合作状态', width: '100' },
      { parentMenuName: '联系方式', width: '120' },
      { menuUrl: '公司全称', width: '120' },
      { menuName: '所属行业', type: 'tree', width: '120' },
      { menuLevel: '统一社会信用代码/营业执照编号', width: '190' },
      { parentMenuName: '创建时间', width: '160' },
      { menuUrl: '创建人', width: '110' },
      { menuUrl: '修改人', width: '110' },
      { type: 'btn', width: '96' }
    ]
    // 对话框配置
    this.dialogItem = [
      {
        parentMenuName: '父菜单名称',
        placeholder: '父菜单名称',
        type: 'select',
        options: []
      },
      { menuName: '菜单名称', placeholder: '菜单名称' },
      { menuCode: '菜单编码', placeholder: '菜单编码' },
      { menuSort: '排序', placeholder: '排序' },
      { menuUrl: 'url', placeholder: '菜单链接' }
    ]
    this.rules = {
      id: [
        { required: true, message: '请输入菜单id', trigger: 'blur' }
      ],
      menuName: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' }
      ],
      menuLevel: [
        { required: true, message: '请选择菜单类型', trigger: 'change' }
      ]
    }
  }
}
