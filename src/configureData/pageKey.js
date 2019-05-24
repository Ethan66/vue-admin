const config = {
  'version_3.0.0': {
    page: [
      { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '页面管理', pageCode: 'page-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '页面管理', pageCode: 'tybe-manage1', pageName: '字段管理', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '页面管理', pageCode: 'tybe-manage2', pageName: '快速生成字段', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '功能权限管理', pageCode: 'function-limit1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '访问控制', pageCode: 'visit-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '访问控制', pageCode: 'visit-manage1', pageName: 'IP控制', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '访问控制', pageCode: 'visit-manage1', pageName: '账户控制', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '员工管理', pageCode: 'staff-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '组织架构', pageCode: 'organization-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '登录日志', pageCode: 'log-login1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '异常日志', pageCode: 'error-log1', pageName: '', pageUrl: '/default-url', pageStatus: 1 }
    ],
    'tybe': [
      // 菜单管理
      { pageCode: 'menu-manage1', fieldName: '菜单名称', fieldValue: 'menuName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '类型', fieldValue: 'menuType', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '层级', fieldValue: 'menuLevel', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '编码', fieldValue: 'code', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '显示排序', fieldValue: 'sortNo', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '状态', fieldValue: 'status', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '请求地址', fieldValue: 'menuUrl', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 页面管理
      { pageCode: 'page-manage1', fieldName: '页面名称', fieldValue: 'pageName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '页面编码', fieldValue: 'pageCode', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '地址', fieldValue: 'pageUrl', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '关联菜单编码', fieldValue: 'menuCode', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '创建人', fieldValue: 'creater', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '描述', fieldValue: 'remark', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '状态', fieldValue: 'pageStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 字段管理
      { pageCode: 'tybe-manage1', fieldName: '字段名称', fieldValue: 'fieldName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '字段', fieldValue: 'fieldValue', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '在此之前固定列', fieldValue: 'fixedStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '是否允许用户设置', fieldValue: 'setStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '是否隐藏', fieldValue: 'displayStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '是否必填', fieldValue: 'fieldRequired', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage1', fieldName: '显示排序', fieldValue: 'fieldSort', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 快速生成字段
      { pageCode: 'tybe-manage2', fieldName: '字段名称', fieldValue: 'fieldName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage2', fieldName: '字段', fieldValue: 'fieldValue', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage2', fieldName: '是否必填', fieldValue: 'fieldRequired', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage2', fieldName: '是否允许用户设置', fieldValue: 'setStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'tybe-manage2', fieldName: '是否隐藏', fieldValue: 'displayStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 组织架构
      { pageCode: 'organization-manage1', fieldName: '部门名称', fieldValue: 'departmentName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'organization-manage1', fieldName: '人数', fieldValue: 'departmentCount', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'organization-manage1', fieldName: '类型', fieldValue: 'departmentType', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'organization-manage1', fieldName: '显示排序', fieldValue: 'fieldSortNo', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'organization-manage1', fieldName: '负责人', fieldValue: 'directorName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'organization-manage1', fieldName: '状态', fieldValue: 'departmentStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 登陆日志
      { pageCode: 'log-log1', fieldName: '姓名', fieldValue: 'userName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '部门', fieldValue: 'departmentName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '终端', fieldValue: 'terminalType', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '操作系统', fieldValue: 'operateSystem', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: 'IP', fieldValue: 'loginIp', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '状态', fieldValue: 'loginStatus', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '操作信息', fieldValue: 'remark', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'log-log1', fieldName: '登录时间', fieldValue: 'gmtCreate', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 异常日志
      { pageCode: 'error-log1', fieldName: '姓名', fieldValue: 'realName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'error-log1', fieldName: '操作类型', fieldValue: 'opTypeDesc', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'error-log1', fieldName: 'IP', fieldValue: 'id', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'error-log1', fieldName: '状态', fieldValue: 'opStatusDesc', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'error-log1', fieldName: '操作信息', fieldValue: 'opResult', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'error-log1', fieldName: '创建时间', fieldValue: 'gmtCreate', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 账户控制
      { pageCode: 'visit-manage1', fieldName: '姓名', fieldValue: 'userRealName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '部门', fieldValue: 'departmentName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '创建人', fieldValue: 'createrName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '授权时间', fieldValue: 'gmtModified', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '描述', fieldValue: 'remark', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '状态', fieldValue: 'isDeleteMsg', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '创建时间', fieldValue: 'gmtCreate', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // IP控制
      { pageCode: 'visit-manage1', fieldName: 'IP地址', fieldValue: 'addressIp', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '创建人', fieldValue: 'creater', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '状态', fieldValue: 'isDeleteName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '描述', fieldValue: 'remark', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'visit-manage1', fieldName: '创建时间', fieldValue: 'gmtCreate', fieldRequired: 1, displayStatus: 0, setStatus: 0 }
    ]
  }
}

const version = '3.0.0'
export default config[`version_${version}`]
