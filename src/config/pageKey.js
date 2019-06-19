const config = {
  'version_3.0.0': {
    page: [
      // { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 0 },
      ['测试菜单1-1', 'test-page1-1', '测试页面1-1'],
      ['测试菜单1-2', 'test-page1-2', '测试页面1-2']
    ],
    'tybe': [
      // 菜单管理
      // { pageCode: 'menu-manage1', fieldName: '菜单名称', fieldValue: 'menuName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      ['test-page1-1', '字段1-1-1', 'tybe1-1-1'],
      ['test-page1-1', '字段1-1-2', 'tybe1-1-2'],
      ['test-page1-1', '字段1-1-3', 'tybe1-1-3'],
      ['test-page1-2', '字段1-2-1', 'tybe1-2-1'],
      ['test-page1-2', '字段1-2-2', 'tybe1-2-2'],
      ['test-page1-2', '字段1-2-3', 'tybe1-2-3']
    ]
  },
  'version_3.0.1': {
    page: [
      // { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 0 },
      ['产品管理', 'shape-manage', '形态管理'],
      ['数据权限管理', 'data-auth', '数据权限管理'],
      ['数据权限管理', 'data-share', '数据权限共享']
    ],
    'tybe': [
      // 菜单管理
      // { pageCode: 'menu-manage1', fieldName: '菜单名称', fieldValue: 'menuName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
      // 形态管理
      // ['shape-manage', 'ID', 'id'],
      // ['shape-manage', '形态名称', 'productFormName'],
      // ['shape-manage', '版本号', 'productFormVersionName'],
      // ['shape-manage', '对象', 'productFormObject'],
      // ['shape-manage', '适用场景', 'sceneName'],
      // ['shape-manage', '状态', 'productFormStatus'],
      // ['shape-manage', '状态', 'productFormStatusName'],
      // ['data-auth', '菜单名称', 'menuName'],
      // ['data-auth', '权限', 'sharePermission'],
      // ['data-share', '数据来源', 'dataFrom'],
      // ['data-share', '共享菜单', 'menuNames'],
      // ['data-share', '共享范围', 'dataTo'],
      // ['data-share', '共享权限', 'dataPermission'],
      // ['data-share', '状态', 'ruleStatus'],
      // ['', '', ''],
    ]
  }
}

const version = '3.0.1'

function transformData (data) {
  data.page = data.page.map((item) => {
    return { menuName: item[0], pageCode: item[1], pageName: item[2], pageUrl: '/default-url', pageStatus: 0 }
  })
  data.tybe = data.tybe.map((item, i) => {
    return { pageCode: item[0], fieldName: item[1], fieldValue: item[2], fieldRequired: 1, displayStatus: 0, setStatus: 1 }
  })
  return data
}

export default transformData(config[`version_${version}`])
