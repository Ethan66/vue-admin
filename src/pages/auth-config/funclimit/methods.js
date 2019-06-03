import { apiGetAllRoleRequestTree, apiPageQueryUserRole, apiGrantUserRole, apiDelUserRole, apiQueryDepartmentList, apiGetConsoleRoleById } from '@/api/role'
import { apiQueryDepartmentTree, apiListConsoleUser } from '@/api/staff'

export default {
  methods: {
    handleApiGetConsoleRoleById (id) {
      let params = {
        id: id
      }
      apiGetConsoleRoleById(params).then(res => {
        if (res.code === '208999') {
          let data = res.resultMap.data
          if (typeof data === 'object') {
            this.formData = JSON.parse(JSON.stringify(data))
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取角色分类树
    handleApiGetAllRoleRequestTree (callback) {
      let params = {
        withUserFlag: 1,
        withRoleFlag: 1
      }
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {
          this.classifyList = this.$disposeTreeData(res.resultMap.list, 'resourceParentId', 0)
          callback && callback(this.$disposeTreeData(res.resultMap.list, 'resourceParentId', 0))
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取角色配置
    getRoleConfig (callback) {
      this.handleApiGetAllRoleRequestTree(callback)
    },
    // 查询部门树
    handleApiQueryDepartmentTree () {
      let params = {
        isWhole: true,
        hasStop: true
      }
      apiQueryDepartmentTree(params).then(res => {
        if (res.code === '208999') {
          this.searchItem.map(item => {
            if (item.key === 'departmentId') {
              // item.treeOptions = this.$disposeTreeData(res.resultMap.data)
              item.dialogData = this.$disposeTreeData(res.resultMap.data)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询系统用户列表
    handleApiListConsoleUser () {
      let list = []
      let treeList = []
      let params = {
        isWhole: true,
        hasStop: true
      }
      apiListConsoleUser({
        pageSize: 0,
        currentPage: 0
      }).then(res => {
        if (res.code === '208999') {
          list = res.resultMap.page.list
          list.map(item => {
            item.parentId = item.departmentId
            item.departmentName = item.realName
            item.id = 'a' + item.id
          })
          apiQueryDepartmentTree(params).then(res => {
            if (res.code === '208999') {
              treeList = res.resultMap.data
              this.treeList = this.$disposeTreeData(treeList.concat(list))
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询部门列表
    handleApiQueryDepartmentList () {
      apiQueryDepartmentList({}).then(res => {
        if (res.code === '208999') {
          console.log('res', res)
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
      Object.assign(params, this.staffDialogFormData)
      if (!params.userIds) {
        this.$message.error('请选择员工')
        this.flag = true
        return
      }
      if (params.roleIds.length <= 0) {
        this.$message.error('请选择角色')
        this.flag = true
        return
      }
      if (Array.isArray(params.roleIds)) {
        params.roleIds = params.roleIds.join(',')
      }
      apiGrantUserRole(params).then(res => {
        this.flag = true
        if (res.code === '208999') {
          this.handleDialogClose('staffDialog', 'staffDialogVisible')
          this.handleApiGetAllRoleRequestTree()
          this.handleGetTableData(apiPageQueryUserRole)
          this.$emit('getClassifyList')
          this.$refs.staffDialog.clearNodes()
          this.resetFormData('staffDialogFormData')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 刪除账号某个角色
     * @param {String} roleIds 要删除的角色，逗号分割
     * @param {String} id 要删除用户的id
     */
    handleApiDelUserRole (id, roleIds) {
      let params = {
        delUserId: id,
        roleIds: roleIds
      }
      apiDelUserRole(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
          this.handleGetTableData(apiPageQueryUserRole)
          this.$emit('getClassifyList')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 关闭弹框
     * dialog: 弹框名；
     * visible: 操作弹框关闭的变量；
     */
    handleDialogClose (dialog, visible) {
      try {
        this.$refs[dialog][visible] = false
      } catch (error) {
        console.log('dialog-close' + error)
      }
    },
    /**
     * 初始化表单数据
     * @param {String} formData 要初始化的formData名
     */
    resetFormData (formData) {
      try {
        this[formData] = this.$options.data()[formData]
      } catch (error) {
        console.log('resetFormData' + error)
      }
    },
    /**
     * 过滤出需要的item
     * @param {Array} globleItem 全部的formitem
     * @param {Array} keys 需要的formitemkey
     */
    filterFormItem (globleItem, keys) {
      let formItem = []
      formItem = globleItem.filter(item => keys.includes(item.key))
      return formItem
    }
  }
}
