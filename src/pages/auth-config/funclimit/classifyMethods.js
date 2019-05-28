import { apiCreateConsoleRole, apiEditeConsoleRole, apiDelConsoleRole, apiGetAllRoleRequestTree, apiGetConsoleRoleById } from '@/api/role'
import { savePageData } from '@/components/methods'

export default {
  methods: {
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleClassify (type, item) {
      this.isClassify = 1
      if (type === 'add') {
        this.handleAddClass(item)
      } else if (type === 'del') {
        this.handleDelClass(item)
      } else if (type === 'edit') {
        this.handleEditClass(item)
      }
    },
    getClassifyList () {
      // 获取角色分类树
      this.handleApiGetAllRoleRequestTree()
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleRole (type, item) {
      this.isClassify = 0
      if (type === 'add') {
        this.handleAddRole(item)
      } else if (type === 'del') {
        this.handleDelRole(item)
      } else if (type === 'edit') {
        this.handleEditRole(item)
      }
    },
    /**
     * 单击角色，更新表格数据
     * type: role: 单击的角色； all: 单击的全部用户； 否则就是单击的分类
     * item:
     */
    handleRoleClick (type, item) {
      if (type === 'role') {
        this.isClassify = 0
      } else if (type === 'all') {
        this.isClassify = ''
      } else {
        this.isClassify = 1
      }
      if (this.activeName === 'first') {
        this.$refs.staffRole.roleClick({ resourceType: this.isClassify, roleId: item.id })
      } else {
        this.$refs.roleLimit.roleClick(type, item)
      }
    },
    handleEditClass (row) {
      this.handleApiGetConsoleRoleById(row.id)
      this.handleInitTypeDialog('编辑类型', ['roleName', 'sortNo', 'createrName', 'gmtModified'], true)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '分类名称'
        }
      })
    },
    handleAddClass (row) {
      this.handleInitTypeDialog('新建类型', ['roleName', 'sortNo'], false)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '分类名称'
        }
      })
    },
    handleDelClass (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', 'handleApiDelConsoleRole')
    },
    handleEditRole (row) {
      this.handleApiGetConsoleRoleById(row.id)
      this.handleInitTypeDialog('编辑角色', ['resourceParentId', 'roleName', 'sortNo', 'createrName', 'gmtModified'], true)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '角色名称'
        }
      })
      this.handleGetClassify()
    },
    handleAddRole (row) {
      this.handleInitTypeDialog('新建角色', ['resourceParentId', 'roleName', 'sortNo', 'cloneRoleIds'], false)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '角色名称'
        }
      })
      this.handleGetClassify()
      this.handleApiGetAllRoleRequestTree()
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
    handleDelRole (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', 'handleApiDelConsoleRole')
    },
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
    handleTypeDialogRefuse () {
      this.handleDialogClose('typeDialog', 'typeVisible')
    },
    handleTypeDialogSubmit () {
      if (!this.flag) return
      this.flag = false
      if (this.isEdit) {
        // 编辑角色或角色分类，根据isClassify判断
        this.handleApiEditeConsoleRole()
      } else {
        // 添加角色或角色分类，根据isClassify判断
        this.handleApiCreateConsoleRole()
      }
    },
    handleApiCreateConsoleRole () {
      let params = {
        resourceType: this.isClassify // 资源类型 0:角色，1:角色分类
      }
      Object.assign(params, this.formData)
      if (Array.isArray(params.cloneRoleIds)) {
        params.cloneRoleIds = params.cloneRoleIds.join(',')
      }
      apiCreateConsoleRole(params).then(res => {
        this.flag = true
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
        this.flag = true
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
    handleApiGetAllRoleRequestTree (callback) {
      let params = {
        withUserFlag: 1,
        withRoleFlag: 1
      }
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {
          this.classifyList = this.$disposeTreeData(res.resultMap.list, 'resourceParentId', 0)
          callback && callback(this.$disposeTreeData(res.resultMap.list, 'resourceParentId', 0))
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
    /**
     * 初始化弹框
     * @param {String} title 弹框标题
     * @param {Array} keys 需要的formItem的项
     * @param {Boolean} isEdit 是否是编辑
     * @param {Boolean} visible 是否显示弹框
     * @param {Object} row 需要反显的数据
     */
    handleInitTypeDialog (title, keys, isEdit) {
      this.typeDialogTitle = title
      this.resetFormData('formData')
      if (Array.isArray(keys)) {
        this.formItem = this.filterFormItem(this.globleItem, keys)
      }
      this.isEdit = isEdit
      this.typeDialogVisible = true
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
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      let lowName
      if (this.$options.name) {
        lowName = this.$options.name.split('-').join('').toLowerCase()
      } else {
        lowName = {}
      }
      if (!this.searched && sessionStorage.getItem(lowName)) { // 第一次读缓存
        let obj = JSON.parse(sessionStorage.getItem(lowName))
        this.searchValues = val = obj.searchValues
        Object.assign(this.searchValues, this.searchDefaultObj)
        this.tablePages.current = currentPage = obj.currentPage
        this.activeTabName = obj.activeTabName
      }
      this.searched = true
      savePageData(lowName, val, currentPage, this.activeTabName) // 将搜索等数据缓存
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {
        currentPage: currentPage, pageSize: this.tablePages.pageSize
      }
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '208999') {
          this.tablePages.current = currentPage
          this.allData = res.resultMap.page.list
          this.tablePages.total = res.resultMap.page.total
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}