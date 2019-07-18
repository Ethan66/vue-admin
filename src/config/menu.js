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
  },
  'version_3.0.1': {
    catalogue: [
      // { menuName: '权限管理', code: 'auth-config', menuUrl: '/auth-config', sortNo: 1 },
      // [ '开发中心', 'develop-center', '/develop-center' ],
      [ '权限管理', 'auth-config', '/auth-config' ],
      ['日志管理', 'log-manage', '/log-manage']
    ],
    menu: [
      // // 权限管理
      // { menuParentName: '权限管理', menuName: '组织架构', code: 'organization', menuUrl: '/auth-config/organization/index', sortNo: 1 },
      // ['开发中心', '菜单管理', 'menu-manage', '/develop-center/menu-manage/index'],
      ['日志管理', '登录日志', 'login-log', '/log/login-log/index'],
      ['日志管理', '异常日志', 'error-log', '/log/error-log/index']
    ],
    btn: [
      // // 功能权限管理
      // { menuParentName: '权限管理', menuName: '编 辑', code: 'config-manage-edit', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // ['菜单管理', '新增', 'menu-add-menu'],
      // ['菜单管理', '批量新建目录', 'menu-add-catogue-all'],
      // ['菜单管理', '批量新建菜单', 'menu-add-menu-all'],
      // ['菜单管理', '批量新建按钮', 'menu-add-btn-all'],
      // ['菜单管理', '编辑', 'menu-edit-menu'],
      // ['菜单管理', '更多', 'menu-more'],
      // ['菜单管理', '新建平级菜单', 'menu-add-same-level'],
      // ['菜单管理', '新建下级菜单', 'menu-add-next-level'],
      // ['菜单管理', '显示', 'menu-show-menu'],
      // ['菜单管理', '隐藏', 'menu-hide-menu'],
      // ['菜单管理', '删除', 'menu-delete'],
      // ['菜单管理', '详情', 'menu-detail'],
      ['', '', ''],
      ['', '', ''],
      // ['产品管理', '编辑', 'product-manage-edit'],
      // ['产品管理', '删除', 'product-manage-delete'],
      // ['产品管理', '查看', 'product-manage-watch'],
      // ['产品管理', '新建形态', 'product-shape-create'],
      // ['产品管理', '更多', 'product-shape-more'],
      // ['产品管理', '编辑', 'product-shape-edit'],
      // ['产品管理', '启动', 'product-shape-startup'],
      // ['产品管理', '停用', 'product-shape-stop'],
      // ['产品管理', '删除', 'product-shape-delete'],
      // ['产品管理', '历史版本', 'product-shape-history'],
      // ['产品管理', '查看', 'product-shape-watch'],
      // ['数据权限管理', '新建规则', 'data-share-create-rule'],
      // ['数据权限管理', '编辑', 'data-share-edit'],
      // ['数据权限管理', '更多', 'data-share-more'],
      // ['数据权限管理', '启用', 'data-share-startup'],
      // ['数据权限管理', '停用', 'data-share-stop'],
      // ['数据权限管理', '删除', 'data-share-delete']
    ]
  }
}

const version = '3.0.1'

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
