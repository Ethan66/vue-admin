import { apiCreateConsoleRole, apiEditeConsoleRole, apiDelConsoleRole, apiGetAllRoleRequestTree, apiPageQueryUserRole, apiGrantUserRole, apiDelUserRole, apiQueryDepartmentList } from '@/api/role'
import { apiQueryDepartmentTree, apiListConsoleUser } from '@/api/staff'

export default {
  methods: {
    handleApiCreateConsoleRole () {
      let params = {
        resourceType: this.isClassify // 资源类型 0:角色，1:角色分类
      }
      Object.assign(params, this.formData)
      if (Array.isArray(params.cloneRoleIds)) {
        params.cloneRoleIds = params.cloneRoleIds.join(',')
      }
      apiCreateConsoleRole(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
          this.handleApiGetAllRoleRequestTree()
          this.handleDialogClose('typeDialog', 'typeVisible')
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
          this.$message.success(res.message)
          this.handleApiGetAllRoleRequestTree()
          this.handleDialogClose('typeDialog', 'typeVisible')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiDelConsoleRole () {
      let params = {
        id: this.delId, // 记录id
        resourceType: this.isClassify // 资源类型
      }
      apiDelConsoleRole(params).then(res => {
        if (res.code === '208999') {
          this.$message.success(res.message)
          this.handleApiGetAllRoleRequestTree()
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
    // 查询部门树
    handleApiQueryDepartmentTree () {
      let params = {
        isWhole: true,
        hasStop: true
      }
      apiQueryDepartmentTree(params).then(res => {
        if (res.code === '208999') {
          // this.treeList = this.$disposeTreeData(res.resultMap.data)
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
              console.log(this.treeList);
              // this.treeList.map(item => {
              //   console.log(item.id);
              //   if (item.childIdList.length > 0) {
              //     item.childIdList.map(item2 => {
              //       console.log(item2.id);
              //     })
              //   }
              // })
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
          console.log('res', res);
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
          this.handleDialogClose('staffDialog', 'staffDialogVisible')
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
    },
    /**
     * 初始化弹框
     * @param {String} title 弹框标题
     * @param {Array} keys 需要的formItem的项
     * @param {Boolean} isEdit 是否是编辑
     * @param {Boolean} visible 是否显示弹框
     * @param {Object} row 需要反显的数据
     */
    handleInitTypeDialog (title, keys, isEdit, row) {
      this.typeDialogTitle = title
      this.resetFormData('formData')
      if (Array.isArray(keys)) {
        this.formItem = this.filterFormItem(this.globleItem, keys)
      }
      if (typeof row === 'object') {
        this.formData = JSON.parse(JSON.stringify(row))
      }
      this.isEdit = isEdit
      this.typeDialogVisible = true
    }
  }
}
