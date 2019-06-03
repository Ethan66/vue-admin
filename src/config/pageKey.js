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
  }
}

const version = '3.0.0'

function transformData (data) {
  data.page = data.page.map((item) => {
    return { menuName: item[0], pageCode: item[1], pageName: item[2], pageUrl: '/default-url', pageStatus: 0 }
  })
  data.tybe = data.tybe.map((item, i) => {
    return { pageCode: item[0], fieldName: item[1], fieldValue: item[2], fieldRequired: 1, displayStatus: 0, setStatus: 0 }
  })
  return data
}

export default transformData(config[`version_${version}`])
