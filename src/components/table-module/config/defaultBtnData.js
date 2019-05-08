export const dialogBtn = {
  cancel: { name: '取消', type: 'delete', clickFn: '', disabled: false, show: true },
  confirm: { name: '确认', type: 'edit', color: 'primary', clickFn: 'handleSubmit', disabled: false, show: true }
}

export const tableBtn = {
  edit: { name: '编辑', icon: 'edit', clickFn: 'handleEditData', disabled: false, show: true },
  delete: { name: '删除', icon: 'delete', clickFn: 'handleDeleteData', disabled: false, show: true },
  cancel: { name: '取消', icon: 'refresh', disabled: false, show: true },
  setting: { name: '管理', icon: 'setting', disabled: false, show: true }
}
