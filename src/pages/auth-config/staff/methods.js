import { apiCreateConsoleUser, apiQueryLowerLevelList, apiEditConsoleUser, apiListConsoleUser, apiQueryConsoleUserInfo, apiEditConsoleUserStatus, apiResetConsoleUserPassword } from '@/api/staff'
export const methods = {
  methods: {
    // 查询用户部门及下级部门列表和人员列表
    handleApiQueryLowerLevelList () {
      apiQueryLowerLevelList().then(res => {
        if (res.code === '208999') {
          this.staffFormItem[0].formItem.map(item => {
            item.dialogData = item.departmentTree
          })
          this.staffFormItem[1].formItem.map(item => {
            if (item.key === 'report') {
              item.options = res.resultMap.userlist || []
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 新建员工
    handleApiCreateConsoleUser () {
      let params = {
        telephone: '', // 电话
        password: '', // 初始密码
        position: '', // 职位
        reportTo: '', // 汇报对象id
        departmentId: '', // 所属部门id
        mailbox: '', // 邮箱
        userName: '', // 用户名
        realName: '' // 用户真实姓名
      }
      apiCreateConsoleUser(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑员工
    handleApiEditConsoleUser () {
      let params = {
        id: '', // 账号id
        telephone: '', // 电话
        password: '', // 初始密码
        position: '', // 职位
        reportTo: '', // 汇报对象id
        departmentId: '', // 所属部门id
        mailbox: '', // 邮箱
        userName: '', // 用户名
        realName: '' // 用户真实姓名
      }
      apiEditConsoleUser(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询系统用户列表
    hanldeApiListConsoleUser () {
      apiListConsoleUser().then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查看员工信息
    handleApiQueryConsoleUserInfo (id) {
      let params = {
        id: id // 用户id
      }
      apiQueryConsoleUserInfo(params).then(res => {
        if (res.code === '208999') {
          this.staffInfoData = res.resultMap.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 编辑系统用户状态
     * @param {*} id 表格id
     * @param {*} status 0:正常; 1:停用，2:禁止登陆',
     */
    handleApiEditConsoleUserStatus (id, status = 0) {
      let params = {
        id: id,
        status: status
      }
      apiEditConsoleUserStatus(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 重置系统用户密码
    handleApiResetConsoleUserPassword () {
      apiResetConsoleUserPassword().then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
