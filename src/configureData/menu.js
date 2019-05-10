export default {
  'version_3.0.1': {
    parentMenu: [
      // { menuName: '权限管理', menuCode: 'auth-manage', menuUrl: '/main/auth-manage', menuSort: 1 },
      // { menuName: '开发中心', menuCode: 'develop-center', menuUrl: '/main/develop-center', menuSort: 2 },
      { menuName: '日志管理', menuCode: 'log-manage', menuUrl: '/main/log-manage', menuSort: 3 }
    ],
    childMenu: [
      { menuParentName: '权限管理', menuName: '组织架构', menuCode: 'organization', menuUrl: '/main/auth-manage/organization', menuSort: 1 },
      { menuParentName: '权限管理', menuName: '员工管理', menuCode: 'staff-manage', menuUrl: '/main/auth-manage/staff-manage', menuSort: 2 },
      { menuParentName: '权限管理', menuName: '员工角色分配', menuCode: 'staff-role', menuUrl: '/main/auth-manage/staff-role', menuSort: 3 },
      { menuParentName: '权限管理', menuName: '角色权限设置', menuCode: 'staff-role-auth', menuUrl: '/main/auth-manage/staff-role-auth', menuSort: 4 },
      { menuParentName: '权限管理', menuName: 'IP授权', menuCode: 'ip-auth', menuUrl: '/main/auth-manage/ip-auth', menuSort: 5 },
      { menuParentName: '权限管理', menuName: '账号授权', menuCode: 'account-auth', menuUrl: '/main/auth-manage/account-auth', menuSort: 6 },

      // { menuParentName: '开发中心', menuName: '菜单管理', menuCode: 'menu-manage', menuUrl: '/main/develop-center/menu-manage/index', menuSort: 1 },
      { menuParentName: '开发中心', menuName: '页面管理', menuCode: 'page-manage', menuUrl: '/main/develop-center/page-manage', menuSort: 2 },

      { menuParentName: '日志管理', menuName: '登录日志', menuCode: 'login-log', menuUrl: '/main/log-manage/login-log', menuSort: 2 },
      { menuParentName: '日志管理', menuName: '异常日志', menuCode: 'unusual-log', menuUrl: '/main/log-manage/unusual-log', menuSort: 2 }

    ]
  }
}
