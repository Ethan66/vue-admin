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
  { label: '昵称', key: 'userName', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '姓名', key: 'realName', hide: 0, canSet: 1, sort: 1, fix: 0 },
  { label: '手机号', key: 'telephone', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '部门名称', key: 'departmentName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '职位', key: 'position', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '汇报对象', key: 'reportToName', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '状态',
    type: 'select',
    options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 },
      { label: '禁止登录', value: 2 }
    ],
    key: 'status',
    hide: 0,
    canSet: 1,
    sort: 5,
    fix: 0 },
  { label: '角色', key: 'roleName', hide: 0, canSet: 1, sort: 5, fix: 0 }
]

export const ipTableItem = [
  { label: 'IP地址', key: 'id', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '创建人', key: 'buttonName', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '状态', key: 'buttonMenuName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '描述', key: 'buttonCode', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', hide: 0, canSet: 1, sort: 5, fix: 0 }
]

export const accountTableItem = [
  { label: 'IP地址', key: 'id', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '创建人', key: 'buttonName', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '状态', key: 'buttonMenuName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '描述', key: 'buttonCode', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', hide: 0, canSet: 1, sort: 5, fix: 0 }
]

export const organizationTest = [
  { label: '部门名称', key: 'departmentName', hide: 0, canSet: 1, sort: 2, fix: 1 },
  { label: '人数', key: 'departmentCount', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '类型', key: 'departmentType', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '显示排序', key: 'sortNo', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '负责人', key: 'directorName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '状态', key: 'departmentStatus', hide: 0, canSet: 1, sort: 3, fix: 0 }
]

export const staffRoleTest = [
  { label: '姓名', key: 'realName', hide: 0, canSet: 1, sort: 1, fix: 0 },
  { label: '手机号', key: 'telephone', hide: 0, canSet: 1, sort: 2, fix: 0 },
  { label: '部门', key: 'departmentName', hide: 0, canSet: 1, sort: 3, fix: 0 },
  { label: '职位', key: 'position', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: '角色', key: 'roleName', hide: 0, canSet: 1, sort: 5, fix: 0 }
]
