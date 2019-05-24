export const tableItemList = [
  { label: '姓名', key: 'userName', displayStatus: 0, setStatus: 1, fieldSort: 1, fix: 1 },
  { label: '部门', key: 'departmentName', displayStatus: 0, setStatus: 1, fieldSort: 2, fix: 0 },
  { label: '终端', key: 'terminalType', displayStatus: 0, setStatus: 1, fieldSort: 3, fix: 0 },
  { label: '操作系统', key: 'operateSystem', displayStatus: 0, setStatus: 4, fieldSort: 5, fix: 0 },
  { label: 'IP', key: 'loginIp', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '状态', key: 'loginStatus', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '操作信息', key: 'remark', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 },
  { label: '登录时间', key: 'gmtCreate', displayStatus: 0, setStatus: 1, fieldSort: 5, fix: 0 }
]

export const errorTableItem = [
  { label: '姓名', key: 'realName', hide: 0, canSet: 1, sort: 1, fix: 1 },
  { label: '操作类型', key: 'opTypeDesc', hide: 0, canSet: 4, sort: 5, fix: 0 },
  { label: 'IP', key: 'id', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '状态', key: 'opStatusDesc', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '操作信息', key: 'opResult', hide: 0, canSet: 1, sort: 5, fix: 0 },
  { label: '登录时间', key: 'gmtCreate', hide: 0, canSet: 1, sort: 5, fix: 0 }
]
