const config = {
  'version_3.0.0': {
    catalogue: [
      // { menuName: '权限管理', code: 'auth-config', menuUrl: '/auth-config', sortNo: 1 },
      ['测试目录1', 'test-menu1', '/test-catalogue1'],
      ['测试目录2', 'test-menu2', '/test-catalogue2']
    ],
    menu: [
      // // 权限管理
      // { menuParentName: '权限管理', menuName: '组织架构', code: 'organization', menuUrl: '/auth-config/organization/index', sortNo: 1 },
      ['测试目录1', '测试菜单1-1', 'test-menu1-1', '/test-catalogue1/1'],
      ['测试目录1', '测试菜单1-2', 'test-menu1-2', '/test-catalogue1/2'],
      ['测试目录2', '测试菜单2-1', 'test-menu2-1', '/test-catalogue2/1'],
      ['测试目录2', '测试菜单2-2', 'test-menu2-2', '/test-catalogue2/2']
    ],
    btn: [
      // // 功能权限管理
      // { menuParentName: '权限管理', menuName: '编 辑', code: 'config-manage-edit', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      ['测试菜单1-1', '按钮1-1-1', 'btn1-1-1'],
      ['测试菜单1-1', '按钮1-1-2', 'btn1-1-2'],
      ['测试菜单1-1', '按钮1-1-3', 'btn1-1-3'],
      ['测试菜单1-2', '按钮1-2-1', 'btn1-2-1'],
      ['测试菜单1-2', '按钮1-2-2', 'btn1-2-2'],
      ['测试菜单1-2', '按钮1-2-3', 'btn1-2-3'],
      ['测试菜单2-1', '按钮2-1-1', 'btn2-1-1'],
      ['测试菜单2-1', '按钮2-1-2', 'btn2-1-2'],
      ['测试菜单2-1', '按钮2-1-3', 'btn2-1-3'],
      ['测试菜单2-2', '按钮2-2-1', 'btn2-2-1'],
      ['测试菜单2-2', '按钮2-2-2', 'btn2-2-2'],
      ['测试菜单2-2', '按钮2-2-3', 'btn2-2-3']
    ]
  }
}

const version = '3.0.0'

function transformData (data) {
  data.catalogue = data.catalogue.map((item, i) => {
    return { menuName: item[0], code: item[1], menuUrl: item[2], sortNo: i + 1 }
  })
  data.menu = data.menu.map((item, i) => {
    return { menuParentName: item[0], menuName: item[1], code: item[2], menuUrl: item[3], sortNo: i + 1 }
  })
  data.btn = data.btn.map((item, i) => {
    return { menuParentName: item[0], menuName: item[1], code: item[2], menuUrl: '/btn', sortNo: i + 1 }
  })
  return data
}

export default transformData(config[`version_${version}`])
