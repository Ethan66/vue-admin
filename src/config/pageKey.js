const config = {
  'version_3.0.0': {
    page: [
      // { menuName: '菜单管理', pageCode: 'menu-manage1', pageName: '', pageUrl: '/default-url', pageStatus: 0 },
    ],
    'tybe': [
      // 菜单管理
      // { pageCode: 'menu-manage1', fieldName: '菜单名称', fieldValue: 'menuName', fieldRequired: 1, displayStatus: 0, setStatus: 0 },
    ]
  }
}

const version = '3.0.0'
export default config[`version_${version}`]
