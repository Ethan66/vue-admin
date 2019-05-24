const config = {
  'version_2.0.0': {
    catalogue: [
      { menuName: '批量目录1', code: '3piliangmulu1', menuUrl: '/piliangmulu1', sortNo: 1 },
      { menuName: '批量目录2', code: '3piliangmulu2', menuUrl: '/piliangmulu2', sortNo: 2 },
      { menuName: '批量目录3', code: '3piliangmulu3', menuUrl: '/piliangmulu3', sortNo: 3 }
    ],
    menu: [
      { menuName: '批量菜单1-1', menuParentName: '批量目录1', code: '2piliangcaidan1-1', menuUrl: '/piliangcaidan1-1', sortNo: 1 },
      { menuName: '批量菜单1-2', menuParentName: '批量目录1', code: '2piliangcaidan1-2', menuUrl: '/piliangcaidan1-2', sortNo: 1 },
      { menuName: '批量菜单2-1', menuParentName: '批量目录2', code: '2piliangcaidan2-1', menuUrl: '/piliangcaidan2-1', sortNo: 1 },
      { menuName: '批量菜单2-2', menuParentName: '批量目录2', code: '2piliangcaidan2-2', menuUrl: '/piliangcaidan2-2', sortNo: 1 },
    ],
    btn: [
      { menuName: '批量按钮1-1', menuParentName: '批量菜单1-1', code: '2pilianganniu1-1', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '批量按钮1-2', menuParentName: '批量菜单1-2', code: '2pilianganniu1-2', menuUrl: '/pilianganniu1-2', sortNo: 2 },
      { menuName: '批量按钮2-1', menuParentName: '批量菜单2-1', code: '2pilianganniu2-1', menuUrl: '/pilianganniu2-1', sortNo: 1 },
      { menuName: '批量按钮2-2', menuParentName: '批量菜单2-2', code: '2pilianganniu2-2', menuUrl: '/pilianganniu2-2', sortNo: 2 },
    ]
  },
  'version_3.0.0': {
    catalogue: [
      { menuName: '权限管理', code: 'auth-config', menuUrl: '/auth-config', sortNo: 1 },
      { menuName: '开发中心', code: 'develop-center', menuUrl: '/develop-center', sortNo: 2 },
      { menuName: '日志管理', code: 'log-manage', menuUrl: '/log', sortNo: 3 }
    ],
    menu: [
      // 权限管理
      { menuName: '组织架构', menuParentName: '权限管理', code: 'organization', menuUrl: '/auth-config/organization/index', sortNo: 1 },
      { menuName: '员工管理', menuParentName: '权限管理', code: 'staff-manage', menuUrl: '/auth-config/staff/index', sortNo: 2 },
      { menuName: '功能权限管理', menuParentName: '权限管理', code: 'config-manage', menuUrl: '/auth-config/funclimit/index', sortNo: 3 },
      { menuName: '访问控制', menuParentName: '权限管理', code: 'visit-config', menuUrl: '/auth-config/visit-control/ip-control/index', sortNo: 4 },
      // 开发中心
      { menuName: '菜单管理', menuParentName: '开发中心', code: 'menu-manage', menuUrl: '/develop-center/menu-manage/index', sortNo: 1 },
      { menuName: '页面管理', menuParentName: '开发中心', code: 'page-manage', menuUrl: '/develop-center/page-manage/index', sortNo: 2 },
      // 日志管理
      { menuName: '登录日志', menuParentName: '日志管理', code: 'login-log', menuUrl: '/log/login-log', sortNo: 1 },
      { menuName: '异常日志', menuParentName: '日志管理', code: 'error-log', menuUrl: '/log/error-log', sortNo: 2 }
    ]
  }
}

const version = '2.0.0'

export default config[`version_${version}`]
