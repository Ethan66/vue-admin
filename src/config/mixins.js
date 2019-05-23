export default {
  watch: {
    showAll () {
      this.$nextTick(() => {
        this.$refs.table.handleSetTableHeight()
      })
    }
  },
  methods: {
    // 点击搜索按钮
    handleSearch (val) {
      this.handleGetTableData(this.getTableDataApi, val)
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
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
        }
      })
    },
    // 选择页面跳转
    handleJump (currentPage) {
      this.handleGetTableData(this.getTableDataApi, this.searchValues, currentPage)
    },
    // 接口：创建表格数据
    apiCreateData (createDataApi, obj, getTableDataApi) {
      return createDataApi(obj).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, res.message)
          getTableDataApi && this.handleGetTableData(getTableDataApi)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 接口：编辑表格数据
    apiEditData (editDataApi, obj, getTableDataApi) {
      return editDataApi(obj).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, res.message)
          getTableDataApi && this.handleGetTableData(getTableDataApi)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 接口：删除表格数据
    apiDeleteData (deleteDataApi, id, getTableDataApi) {
      return deleteDataApi({ id: id }).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, '删除成功')
          getTableDataApi && this.handleGetTableData(getTableDataApi)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 自动打开表格树
    handleOpenTableTree (tableData) {

    }
  }
}
