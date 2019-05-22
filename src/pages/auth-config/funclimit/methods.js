import { apiCreateConsoleRole, apiEditeConsoleRole, apiDelConsoleRole, apiGetAllRoleRequestTree, apiPageQueryUserRole, apiGrantUserRole, apiDelUserRole } from '@/api/role'
import { apiQueryDepartmentTree } from '@/api/staff'
export default {
  methods: {
    handleApiCreateConsoleRole () {
      let params = {
        resourceType: this.isClassify // 资源类型 0:角色，1:角色分类
      }
      Object.assign(params, this.formData)
      params.cloneRoleIds = params.cloneRoleIds.join(',')
      apiCreateConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiEditeConsoleRole () {
      let params = {
        resourceType: this.isClassify
      }
      Object.assign(params, this.formData)
      apiEditeConsoleRole(params).then(res => {
        if (res.code === '208999') {
          console.log(res);
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiDelConsoleRole (id) {
      let params = {
        id: id, // 记录id
        resourceType: this.isClassify // 资源类型
      }
      apiDelConsoleRole(params).then(res => {
        if (res.code === '208999') {
          console.log(res);
          // this.classifyList = []
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取角色分类树
    handleApiGetAllRoleRequestTree () {
      let params = {
        withUserFlag: 1,
        withRoleFlag: 1
      }
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {
          this.classifyList = this.$disposeTreeData(res.resultMap.list, 'resourceParentId', 0)
          this.staffDialogFormItem = this.classifyList
          this.roleCount = res.resultMap.total || 0
          this.formItem.map(item => {
            if (item.key === 'cloneRoleIds') {
              item.options = this.classifyList
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取所属分类
    handleGetClassify () {
      let params = {}
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {
          this.formItem.map(item => {
            if (item.key === 'resourceParentId') {
              item.options = res.resultMap.list
            }
          })
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
          this.treeList = this.$disposeTreeData(res.resultMap.data)
          this.searchItem.map(item => {
            if (item.key === 'department') {
              item.treeOptions = this.$disposeTreeData(res.resultMap.data)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取表格数据
    handleApiPageQueryUserRole () {
      let params = {
        id: '',
        roleName: '',
        resourceType: this.isClassify
      }
      apiPageQueryUserRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 账号分配角色
    handleApiGrantUserRole () {
      let params = {}
      this.staffDialogFormData.roleIds = this.staffDialogFormData.roleIds.join(',')
      Object.assign(params, this.staffDialogFormData)
      apiGrantUserRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 刪除账号某个角色
     * roleIds: 要删除的角色，逗号分割
     * id: 要删除用户的id
     */
    handleApiDelUserRole (id, roleIds) {
      let params = {
        delUserId: id,
        roleIds: roleIds
      }
      apiDelUserRole(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
