export const search = {
  data () {
    return new this.$InitObj({
      modules: 'search',
      items: {
        search: {
          account: { label: '账号' },
          demo: { label: '账号2' },
          date1: { label: '日期', type: 'date', key: ['start', 'end'] },
          demo2: { label: '账号2' },
          date2: { label: '日期', type: 'date', key: ['start2', 'end2'] },
          demo3: { label: '账号2' },
          name: { label: '用户名', changeFn: 'handleChangeName' },
          tree: { label: '选择树结构', type: 'selectTree', checkStrictly: true, treeMultiple: true, data: [{ id: 1, name: '一级 1', noClick: true, children: [{ id: 4, name: '二级 1-1', children: [{ id: 9, name: '三级 1-1-1' }, { id: 10, name: '三级 1-1-2' }] }] }], defaultProps: { label: 'name', children: 'children', disabled: 'noClick' } },
          status: { label: '状态', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }], changeFn: 'handleChangeStatus' },
          tree2: { label: '选择树结构', type: 'selectTree', checkStrictly: true, treeMultiple: true, data: [{ id: 1, name: '一级 1', noClick: true, children: [{ id: 4, name: '二级 1-1', children: [{ id: 9, name: '三级 1-1-1' }, { id: 10, name: '三级 1-1-2' }] }] }], defaultProps: { label: 'name', children: 'children', disabled: 'noClick' } },
        }
      }
    })
  }
}