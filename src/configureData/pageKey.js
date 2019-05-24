const config = {
  'version_3.0.0': {
    page: [
      { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '页面管理', pageCode: 'page-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '功能权限管理', pageCode: 'function-limit1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '访问控制', pageCode: 'visit-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '员工管理', pageCode: 'staff-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '组织架构', pageCode: 'organization-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '登录日志', pageCode: 'log-login1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
      { menuName: '异常日志', pageCode: 'error-log1', pageName: '', pageUrl: '/default-url', pageStatus: 1 },
    ],
    'tybe': [
      // 菜单管理
      { pageCode: 'menu-manage1', fieldName: '菜单名称', fieldValue: 'menuName', fieldRequired: 1, fieldSort: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '类型', fieldValue: 'menuType', fieldRequired: 1, fieldSort: 2, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '层级', fieldValue: 'menuLevel', fieldRequired: 1, fieldSort: 3, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '编码', fieldValue: 'code', fieldRequired: 1, fieldSort: 4, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '显示排序', fieldValue: 'sortNo', fieldRequired: 1, fieldSort: 5, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '状态', fieldValue: 'status', fieldRequired: 1, fieldSort: 6, displayStatus: 0, setStatus: 0 },
      { pageCode: 'menu-manage1', fieldName: '请求地址', fieldValue: 'menuUrl', fieldRequired: 1, fieldSort: 7, displayStatus: 0, setStatus: 0 },
      // 页面管理
      { pageCode: 'page-manage1', fieldName: '页面名称', fieldValue: 'pageName', fieldRequired: 1, fieldSort: 1, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '页面编码', fieldValue: 'pageCode', fieldRequired: 1, fieldSort: 2, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '地址', fieldValue: 'pageUrl', fieldRequired: 1, fieldSort: 3, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '关联菜单编码', fieldValue: 'menuCode', fieldRequired: 1, fieldSort: 4, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '创建人', fieldValue: 'creater', fieldRequired: 1, fieldSort: 5, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '描述', fieldValue: 'remark', fieldRequired: 1, fieldSort: 6, displayStatus: 0, setStatus: 0 },
      { pageCode: 'page-manage1', fieldName: '状态', fieldValue: 'pageStatus', fieldRequired: 1, fieldSort: 7, displayStatus: 0, setStatus: 0 }
    ]
  }
}

const version = '2.0.0'
export default config[`version_${version}`]
