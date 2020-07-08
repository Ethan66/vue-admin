import { authBtn } from '@/config/methods.js'

// 菜单管理
export const menu = {
  data () {
    return new this.$InitObj({
      items: {
        search: {
          menuName: { label: '菜单名称' },
          status: { label: '状态', type: 'select', options: [] }
        },
        table: {
          menuName: { label: '菜单名称', slot: 'tree', width: 200, headerAlign: 'left' },
          menuType: { label: '菜单类型', width: 90 },
          menuLevel: { label: '菜单等级', width: 100 },
          menuUrl: { label: '菜单链接', width: 250 },
          sortNo: { label: '排序', width: 70 },
          code: { label: '菜单编码', width: 150 },
          status: { label: '状态', width: 80 },
          btn: { width: 118, slot: 'btn' }
        },
        dialog: {
          menuParentId: { label: '父级菜单', slot: 'tree' },
          menuName: { label: '菜单名称' },
          menuType: { label: '菜单类型', type: 'select', options: [] },
          code: { label: '菜单编码' },
          menuUrl: { label: '菜单链接' },
          menuIcon: { label: '菜单图标', width: 80 },
          sortNo: { label: '排序' },
          status: { label: '状态', type: 'radio', options: [] }
        }
      },
      rules: {
        menuName: [
          { required: true, trigger: 'blur', validator: this.validateMenuName }
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        code: [
          { required: true, trigger: 'blur', validator: this.validateCode }
        ],
        menuUrl: [
          { required: true, trigger: 'blur', validator: this.validateMenuUrl }
        ],
        sortNo: [
          { required: true, trigger: 'blur', validator: this.validateSortNo }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    })
  },
  created () {
    this.tableBtn = authBtn.getConfigBtns([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
  }
}
