export interface IsystemConfig {
  logo: string
  fullName: string
  name: string
  minScreenWidth: string
  theme: string
}

const systemConfig: IsystemConfig = {
  logo: 'assets/img/logo',
  fullName: '后台管理系统',
  name: '管理系统',
  minScreenWidth: '1000', // 少于屏幕宽度的时候隐藏侧边栏
  theme: 'blue'
}

export default systemConfig
