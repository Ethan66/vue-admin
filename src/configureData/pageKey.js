const configTybe = {
  'version_2.0.0': {
    page: [
      { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '菜单管理', pageUrl: '/menu-manage', pageStatus: 1 },
      { menuName: '页面管理', pageCode: 'page-manage1', pageName: '页面管理', pageUrl: '/page-manage', pageStatus: 1 },
      { menuName: '功能权限管理', pageCode: 'page-manage1', pageName: '页面管理', pageUrl: '/page-manage', pageStatus: 1 },
    ],
    '菜单管理': [
      { pageCode: 'menu-config1', fieldName: '菜单名称', fieldValue: 'menuName', displayStatus: 0, setStatus: 0, fieldSort: 1 },
      { pageCode: 'menu-config1', fieldName: '类型', fieldValue: 'menuType', displayStatus: 0, setStatus: 0, fieldSort: 2 },
      { pageCode: 'menu-config1', fieldName: '层级', fieldValue: 'menuLevel', displayStatus: 0, setStatus: 0, fieldSort: 3 },
      { pageCode: 'menu-config1', fieldName: '编码', fieldValue: 'code', displayStatus: 0, setStatus: 0, fieldSort: 4 },
      { pageCode: 'menu-config1', fieldName: '显示排序', fieldValue: 'sortNo', displayStatus: 0, setStatus: 0, fieldSort: 5 },
      { pageCode: 'menu-config1', fieldName: '状态', fieldValue: 'status', displayStatus: 0, setStatus: 0, fieldSort: 6 },
      { pageCode: 'menu-config1', fieldName: '请求地址', fieldValue: 'menuUrl', displayStatus: 0, setStatus: 0, fieldSort: 7 }
    ]
  }
}

const version = '2.0.0'
export default configTybe[`version_${version}`]

