import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pageSearchValues'])
  },
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
      let obj = this.handleSaveSearchValues(val, currentPage)
      val = obj.val || val
      currentPage = obj.currentPage || currentPage
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {
        currentPage: this.tablePages.current, pageSize: this.tablePages.pageSize
      }
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '000000') {
          const { list, page } = res.data
          this.allData = list
          if (page) {
            this.tablePages.current = page.currentPage
            this.tablePages.total = page.total
          }
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        } else {
          this.$message.error(res.msg)
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
        if (res.code === '000000') {
          this.$refs.dialog.showDialogForm1 = false
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 接口：编辑表格数据
    apiEditData (editDataApi, obj, getTableDataApi) {
      return editDataApi(obj).then(res => {
        if (res.code === '000000') {
          this.$refs.dialog && (this.$refs.dialog.showDialogForm1 = false)
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 接口：删除表格数据
    apiDeleteData (deleteDataApi, id, getTableDataApi) {
      return deleteDataApi({ id: id }).then(res => {
        if (res.code === '000000') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          getTableDataApi && this.handleGetTableData(getTableDataApi, this.searchValues, this.tablePages.current)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // searchValues vuex缓存
    handleSaveSearchValues (val, currentPage) {
      if (this.keepAlive) return { val, currentPage }
      let lowName
      if (this.$options.name) {
        lowName = this.$options.name.toLowerCase()
      } else {
        lowName = {}
      }
      let savedSearchValues = this.pageSearchValues[lowName]
      if (this.pageSearchValues) {
        if (this.pageSearchValues[lowName]) {
          savedSearchValues = this.pageSearchValues[lowName]
        } else {
          let obj = sessionStorage.getItem('activedSearchValues')
          if (obj) {
            if (JSON.parse(obj)[lowName]) {
              savedSearchValues = JSON.parse(obj)[lowName]
            }
          }
        }
      }
      if (!this.searched && savedSearchValues) { // 第一次读缓存
        let obj = savedSearchValues
        this.searchValues = val = JSON.parse(JSON.stringify(obj.searchValues))
        Object.assign(this.searchValues, this.searchDefaultObj)
        this.tablePages.current = currentPage = obj.currentPage
        this.activeTabName = obj.activeTabName
      }
      this.searched = true
      this.$store.commit('UPDATE_PAGE_SEARCH_VALUES', {
        name: lowName,
        value: { searchValues: val, currentPage, activeTabName: this.activeTabName } // 将搜索等数据缓存
      })
      return { val, currentPage }
    },
    // 编辑后展示已打开的树
    handleOpenTree (tableData, saveExpendIdList) {
      let result = []
      function open (result, data, idList) {
        data.forEach(item => {
          result.push(item)
          if (idList.includes(item.id)) {
            item.expand = true
            if (item.list) {
              open(result, item.list, idList)
            }
          }
        })
      }
      open(result, tableData, saveExpendIdList)
      this.tableData = result
    }
  }
}
