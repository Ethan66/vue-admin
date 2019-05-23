export const buttonTest = [
  { label: '按钮id', key: 'id', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 1 },
  { label: '按钮名称', key: 'buttonName', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '所属菜单名称', key: 'buttonMenuName', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '按钮编码', key: 'buttonCode', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '修改时间', key: 'gmtModified', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '状态', key: 'isDelete', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]

export const staffTest = [
  { label: '昵称', key: 'userName', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 1 },
  { label: '姓名', key: 'realName', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 0 },
  { label: '手机号', key: 'telephone', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '部门名称', key: 'departmentName', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '职位', key: 'position', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: '汇报对象', key: 'reportToName', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '状态', key: 'statusMsg', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '状态',
    type: 'select',
    options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 },
      { label: '禁止登录', value: 2 }
    ],
    key: 'status',
    displayStatus: 1,
    setStatus: 1,
    fieldSort: 5,
    fix: 0 },
  { label: '角色', key: 'roleName', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]

export const ipTableItem = [
  { label: 'IP地址', key: 'addressIp', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 1 },
  { label: '创建人', key: 'modifier', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '状态', key: 'isDelete', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '描述', key: 'remark', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]

export const accountTableItem = [
  { label: 'IP地址', key: 'addressIp', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 1 },
  { label: '创建人', key: 'modifier', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '状态', key: 'isDelete', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '描述', key: 'remark', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: '创建时间', key: 'gmtCreate', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]

export const organizationTest = [
  { label: '部门名称', key: 'departmentName', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 1 },
  { label: '人数', key: 'departmentCount', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '类型', key: 'departmentType', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '显示排序', key: 'fieldSortNo', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '负责人', key: 'directorName', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '状态', key: 'departmentStatus', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 }
]

export const staffRoleTest = [
  { label: '姓名', key: 'realName', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 0 },
  { label: '手机号', key: 'telephone', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '部门', key: 'departmentName', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '职位', key: 'position', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: '角色', key: 'roleName', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]
