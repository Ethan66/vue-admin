const config = {
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
      { menuName: '登录日志', menuParentName: '日志管理', code: 'login-log', menuUrl: '/log/login-log/index', sortNo: 1 },
      { menuName: '异常日志', menuParentName: '日志管理', code: 'error-log', menuUrl: '/log/error-log/index', sortNo: 2 }
    ],
    btn: [
      // 菜单管理
      // { menuName: '新增菜单', menuParentName: '菜单管理', code: 'menu-add-menu', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '批量新建目录', menuParentName: '菜单管理', code: 'menu-add-catogue-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '批量新建菜单', menuParentName: '菜单管理', code: 'menu-add-menu-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '批量新建按钮', menuParentName: '菜单管理', code: 'menu-add-btn-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '编辑', menuParentName: '菜单管理', code: 'menu-edit-menu', menuUrl: '/pilianganniu1-2', sortNo: 2 },
      // { menuName: '更多', menuParentName: '菜单管理', code: 'menu-more', menuUrl: '/pilianganniu1-2', sortNo: 2 },
      // { menuName: '新建平级菜单', menuParentName: '菜单管理', code: 'menu-add-same-level', menuUrl: '/pilianganniu2-1', sortNo: 1 },
      // { menuName: '新建下级菜单', menuParentName: '菜单管理', code: 'menu-add-next-level', menuUrl: '/pilianganniu2-1', sortNo: 1 },
      // { menuName: '删除', menuParentName: '菜单管理', code: 'menu-delete', menuUrl: '/pilianganniu2-1', sortNo: 1 },
      // { menuName: '详情', menuParentName: '菜单管理', code: 'menu-detail', menuUrl: '/pilianganniu2-1', sortNo: 1 },
      // // 页面管理
      // { menuName: '新建页面', menuParentName: '页面管理', code: 'page-add-page', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '获取全部menuList', menuParentName: '页面管理', code: 'page-get-menu', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '批量新建页面', menuParentName: '页面管理', code: 'page-add-page-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '获取所有页面', menuParentName: '页面管理', code: 'page-get-page-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '批量新建字段', menuParentName: '页面管理', code: 'page-add-tybe-all', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '编辑', menuParentName: '页面管理', code: 'page-edit', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // 字段管理
      // { menuName: '快速生成', menuParentName: '页面管理', code: 'tybe-fast-create', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '手动添加', menuParentName: '页面管理', code: 'tybe-hand-create', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '删除', menuParentName: '页面管理', code: 'tybe-hand-delete', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '返回列表', menuParentName: '页面管理', code: 'tybe-go-back', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '编辑', menuParentName: '页面管理', code: 'tybe-edit', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '取消', menuParentName: '页面管理', code: 'tybe-cancel', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '删除', menuParentName: '页面管理', code: 'tybe-delete', menuUrl: '/pilianganniu1-1', sortNo: 1 },

      // // 组织架构
      // { menuName: '新增部门', menuParentName: '组织架构', code: 'organization-add', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '编辑', menuParentName: '组织架构', code: 'organization-edit', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '更多', menuParentName: '组织架构', code: 'organization-more', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '新建平级部门', menuParentName: '组织架构', code: 'organization-add-same-level', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '新建下级部门', menuParentName: '组织架构', code: 'organization-add-next-level', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '停用', menuParentName: '组织架构', code: 'organization-stop', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // { menuName: '删除', menuParentName: '组织架构', code: 'organization-delete', menuUrl: '/pilianganniu1-1', sortNo: 1 },
         
      // ip授权
      { menuName: '启 用', menuParentName: '访问控制', code: 'visit-ip-open', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '启 用', menuParentName: '访问控制', code: 'visit-ip-open-batch', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '停 用', menuParentName: '访问控制', code: 'visit-ip-stop', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '停 用', menuParentName: '访问控制', code: 'visit-ip-stop-batch', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '添加IP', menuParentName: '访问控制', code: 'visit-ip-add-ip', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      // 账号授权
      { menuName: '失 效', menuParentName: '访问控制', code: 'visit-c-stop', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '失 效', menuParentName: '访问控制', code: 'visit-c-stop-batch', menuUrl: '/pilianganniu1-1', sortNo: 1 },
      { menuName: '添加授权', menuParentName: '访问控制', code: 'visit-c-add', menuUrl: '/pilianganniu1-1', sortNo: 1 }
    ]
  }
}

const version = '3.0.0'

export default config[`version_${version}`]
