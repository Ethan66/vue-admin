export const buttonTest = [
  { label: '按钮id', key: 'id', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '按钮名称', key: 'buttonName', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '所属菜单名称', key: 'buttonMenuName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '按钮编码', key: 'buttonCode', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '修改时间', key: 'gmtModified', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '状态', key: 'isDelete', hide: 0, canSet: 1, sort: 5, fix: 0 }
]

export const staffTest = [
  { label: '昵称', key: 'nickname', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '姓名', key: 'name', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '手机号', key: 'phone', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '部门', key: 'department', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '职位', key: 'position', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '汇报对象', key: 'report', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '状态',
    type: 'select',
    options: [
      { label: 'a', value: 1 },
      { label: 'b', value: 2 }
    ],
    key: 'status',
    hide: 0,
    canSet: 1,
    sort: 5,
    fix: 0 },
  { label: '角色', key: 'role', hide: 0, canSet: 1, sort: 5, fix: 0 }
]
