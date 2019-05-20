import { apiCreateConsoleRole, apiGetConsoleRoleById, apiEditeConsoleRole, apiDelConsoleRole, apiGetAllRoleRequestTree, apiPageQueryUserRole } from '@/api/role'
import { apiQueryDepartmentTree } from '@/api/staff'
export default {
  methods: {
    handleApiGetConsoleRoleById () {
      let params = {}
      apiGetConsoleRoleById(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiCreateConsoleRole () {
      let params = {
        departmentId: '', // 部门id
        roleName: '', // 角色或者分类名称
        resourceType: this.isRole // 资源类型 0:角色，1:角色分类
      }
      apiCreateConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiEditeConsoleRole () {
      let params = {
        resourceType: this.isRole
      }
      Object.assign(params, this.formData)
      apiEditeConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiDelConsoleRole () {
      let params = {
        departmentId: '', // 部门id
        id: '', // 记录id
        resourceType: this.isRole // 资源类型
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
        withUserFlag: 1
      }
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {
          this.classifyList = res.resultMap.list || []
          this.roleCount = res.resultMap.total || 0
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
          this.searchItem.map(item => {
            if (item.key === 'department_type') {
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
        departmentId: '',
        id: '',
        roleName: '',
        resourceType: this.isRole
      }
      apiPageQueryUserRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
