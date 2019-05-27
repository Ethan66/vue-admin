import { apiCreateConsoleUser, apiQueryLowerLevelList, apiEditConsoleUser, apiListConsoleUser, apiQueryConsoleUserInfo, apiEditConsoleUserStatus, apiResetConsoleUserPassword, apiQueryDepartmentTree } from '@/api/staff'
import MD5 from 'js-md5'
export const methods = {
  methods: {
    // 查询用户部门及下级部门列表和人员列表
    handleApiQueryLowerLevelList () {
      apiQueryLowerLevelList().then(res => {
        if (res.code === '208999') {
          this.staffFormItem[1].formItem.map(item => {
            if (item.key === 'departmentId') {
              let list = res.resultMap.departmentTree || []
              item.dialogData = this.$disposeTreeData(list)
            }
            if (item.key === 'reportTo') {
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
      let params = {}
      Object.assign(params, this.staffFormData)
      params.password = MD5(params.password)
      apiCreateConsoleUser(params).then(res => {
        if (res.code === '208999') {
          this.handleGetTableData(apiListConsoleUser)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑员工
    handleApiEditConsoleUser () {
      let params = {}
      Object.assign(params, this.staffFormData)
      if (params.userType === '百凌管理平台用户') {
        params.userType = 0
      } else if (params.userType === '商户系统用户') {
        params.userType = 1
      } else {
        params.userType = 2
      }
      apiEditConsoleUser(params).then(res => {
        if (res.code === '208999') {
          this.handleGetTableData(apiListConsoleUser)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询系统用户列表
    hanldeApiListConsoleUser () {
      let params = {
        departmentId: this.departmentId
      }
      apiListConsoleUser(params).then(res => {
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
     * @param {*} status 0:正常；2:禁止登陆',
     * @param {*} isDelete 0:启用 ； 1：停用
     */
    handleApiEditConsoleUserStatus (id, status, isDelete) {
      let params = {
        id: id,
        status: status,
        isDelete: Number(isDelete)
      }
      apiEditConsoleUserStatus(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
          this.handleGetTableData(apiListConsoleUser)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 重置系统用户密码
    handleApiResetConsoleUserPassword (id) {
      let params = {
        id: id
      }
      apiResetConsoleUserPassword(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询部门数
    handleApiQueryDepartmentTree () {
      let params = {
        isWhole: true,
        hasStop: true
      }
      apiQueryDepartmentTree(params).then(res => {
        if (res.code === '208999') {
          this.treeData = this.$disposeTreeData(res.resultMap.data)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
