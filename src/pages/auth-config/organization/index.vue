<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-tree-open-num.sync="tableTreeOpenNum"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :tree-init-level="initLevel"
      :get-tree-data-by-post="getDataByPost"
      @clickGetTreeData="handleClickGetTreeData">
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd" v-if="$showBtn('organization-add')">{{ $getBtnName('organization-add') }}</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
      :select-tree-checked-value="selectTreeCheckedValue"
      :select-tree-checked-value-two="selectTreeCheckedValue2"
      :selectTreeWidth="selectTreeWidth1"
      :selectTreeWidth2="selectTreeWidth2"
      selectTreekey="parentId"
      selectTreekey2="directorId"
      @handleSelectTreeValue="handleSelectTreeValue"
      @handleSelectTreeValue2="handleSelectTreeValue2"
      @handleClearSelectTree="handleClearSelectTree"
      @handleClearSelectTree2="handleClearSelectTree2"
    />
  </div>
</template>

<script>
import { organization } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { savePageData } from '@/components/methods'
import { apiListConsoleUser } from '@/api/staff'
import { apiQueryDepartmentList, apiStopDepartment, apiEditDepartment, apiDelDepartment, apiAddDepartment, apiQueryDepartmentTree } from '@/api/authority'

export default {
  name: 'organization',
  mixins: [basicMethod, organization],
  data () {
    return {
      allDepartmentTree: [],
      selectTreeWidth1: 304,
      selectTreeWidth2: 304,
      selectTreeCheckedValue: [],
      selectTreeCheckedValue2: [],
      allPeople: [],
      initLevel: 0,
      getDataByPost: true,
      saveExpendIdList: []
    }
  },
  created () {
    this.tablePages.pageSize = 10000
    this.handleGetAllDepartmentTree()
    this.handleGetTableData(apiQueryDepartmentList)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.dialogItem[0].disabled = false
      // this.dialogItem[2].disabled = false
       this.dialogItem[0].type = 'selectTree'
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.editData.departmentStatus = 0
      this.selectTreeCheckedValue = []
      this.selectTreeCheckedValue2 = []
      this.handleClearSelectTree()
      this.isEdit = 0
      this.dialogTitle = '新增部门'
      this.dialogItem[5].show = true
      this.showDialogForm = true
      this.$nextTick(() => {
        this.$refs.dialog.$refs.editData.clearValidate()
      })
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.dialogItem[0].disabled = false
      // this.dialogItem[2].disabled = false
      this.dialogItem[0].type = 'selectTree'
      this.editData.departmentStatus = this.editData.departmentStatusStash
      this.editData.departmentType = this.editData.departmentTypeStash
      this.selectTreeCheckedValue = [this.editData.parentId]
      if (this.editData.directorId) {
        this.selectTreeCheckedValue2 = ['a' + this.editData.directorId]
      }
      this.isEdit = 1
      /* let list = this.dialogItem[2].options.map(item => {
        if (item.value <= Number(this.editData.departmentType) - 1) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.$set(this.dialogItem[2], 'options', list) */
      this.dialogTitle = '编辑部门'
      this.dialogItem[5].show = false
      this.showDialogForm = true
      this.$nextTick(() => {
        this.$refs.dialog.$refs.editData.clearValidate()
      })
    },
    // 选择菜单树的值后
    handleSelectTreeValue (row) {
      if (!row) return false
      /* this.editData.departmentType = Number(row.departmentType) + 1
      let list = this.dialogItem[2].options.map(item => {
        if (item.value <= row.departmentType) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.$set(this.dialogItem[2], 'options', list) */
    },
    handleSelectTreeValue2 (row) {
      console.log(row)
    },
    // 新建平级部门
    handleCreateDepartment (row) {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.editData.departmentStatus = 0
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[5].show = true
      this.editData.parentIdStash = row.parentId
      let obj = this.allDepartmentTree.find(item => item.id === row.parentId)
      obj && (this.editData.parentId = obj.departmentName)
      this.editData.departmentType = row.departmentTypeStash
      this.isEdit = 0
      this.dialogTitle = '新建部门'
      this.showDialogForm = true
    },
    // 新建下级部门
    handleCreateNextLevelDepartment (row) {
      if (Number(row.departmentType) === 3) {
        this.$message.error('部门不能创建下级部门')
        return false
      }
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.editData.departmentStatus = 0
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[5].show = true
      this.editData.parentIdStash = row.id
      this.editData.parentId = row.departmentName
      this.editData.departmentType = Number(row.departmentTypeStash)
      this.isEdit = 0
      this.dialogTitle = '新建部门'
      this.showDialogForm = true
    },
    // 清空菜单树的值
    handleClearSelectTree (val) {
      if (!val) {
        this.editData.parentId = ''
      }
      /* let list = this.dialogItem[2].options.map(item => {
        item.disabled = false
        return item
      })
      this.$set(this.dialogItem[2], 'options', list) */
    },
    handleClearSelectTree2 (val) {
       if (!val) {
        this.editData.directorId = ''
      }
    },
    // 点击表格停用按钮
    handleStop (row) {
      this.$confirm(
      '确定停用该部门吗，停用后该部门下属所有人员账号将无法使用',
      '温馨提醒',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      apiStopDepartment({ id: row.id }).then(res => {
        if (res.code === '208999') {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.handleGetTableData(apiQueryDepartmentList, this.searchValues)
        } else {
          this.$message.error(res.message)
        }
      })
    })
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDelDepartment, row.id, apiQueryDepartmentList)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let edit = this.editData
      if (edit.directorId && String(edit.directorId).slice(0, 1) !== 'a') {
        this.$message.error('负责人请选择员工')
      }
      edit.directorId && (edit.directorId = edit.directorId.slice(1))
      if (!edit.parentId) edit.parentId = undefined
      let obj = {
        departmentName: edit.departmentName,
        directorId: Number(edit.directorId),
        departmentType: edit.departmentType,
        id: edit.id,
        sortNo: edit.sortNo,
        parentId: edit.parentId,
        departmentStatus: edit.departmentStatus
      }
      if (this.isEdit === 0) {
        if (this.editData.parentIdStash) {
          obj.parentId = this.editData.parentIdStash
        }
        this.apiCreateData(apiAddDepartment, obj, apiQueryDepartmentList).then(() => {
          this.handleGetAllDepartmentTree()
        })
      } else {
        this.apiEditData(apiEditDepartment, obj, apiQueryDepartmentList).then(() => {
          this.handleGetAllDepartmentTree()
        })
      }
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      let lowName = this.$options.name.split('-').join('').toLowerCase()
      if (!this.searched && sessionStorage.getItem(lowName)) { // 第一次读缓存
        let obj = JSON.parse(sessionStorage.getItem(lowName))
        this.searchValues = val = obj.searchValues
        this.tablePages.current = currentPage = obj.currentPage
        this.activeTabName = obj.activeTabName
      }
      this.searched = true
      savePageData(lowName, val, currentPage, this.activeTabName) // 将搜索等数据缓存
      this.getTableDataApi = api
      /* if (val && val.departmentName) {
        this.getDataByPost = true
      } else {
        this.getDataByPost = false
      } */
      this.tableLoading = true
      api(val).then(res => {
        if (res.code === '208999') {
          this.tablePages.current = currentPage
          this.allData = res.resultMap.data
          this.tableData = this.allData
          this.tableData.forEach(item => {
            if (item.hasLower) {
              item.list = []
            }
          })
          this.handleTableData && this.handleTableData(this.tableData || [])
          if (this.saveExpendIdList.length > 0) {
            this.handleOpenTree(this.tableData)
          }
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData, getDataByPost) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        if (item.departmentStatusStash === undefined) {
          item.departmentStatusStash = item.departmentStatus
        }
        switch (item.departmentStatus) {
          case 0:
            item.departmentStatus = '正常'
            break
          case 1:
            item.departmentStatus = '停用'
            break
        }
        if (item.departmentTypeStash === undefined) {
          item.departmentTypeStash = item.departmentType
        }
        switch (item.departmentType) {
          case 0:
            item.departmentType = '集团'
            break
          case 1:
            item.departmentType = '公司'
            break
          case 2:
            item.departmentType = '事业部'
            break
          case 3:
            item.departmentType = '部门'
            break
        }
      })
      if (!getDataByPost) {
        this.tableData = menuRelation(tableData, 'id', 'parentId', 'departmentLevel', 'sortNo')
      }
      this.initLevel = this.tableData[0].departmentLevel
      this.allData.forEach(item => {
        if (item.departmentLevel < this.initLevel) {
          this.initLevel = item.departmentLevel
        }
      })
      this.handleOpenTableTree(this.tableData)
    },
    // 获取部门树
    handleGetAllDepartmentTree () {
      return apiQueryDepartmentTree({ isWhole: true, hasStop: false }).then(res => {
        if (res.code === '208999') {
          this.allDepartmentTree = res.resultMap.data
          this.dialogItem[0].dialogData = menuRelation(JSON.parse(JSON.stringify(this.allDepartmentTree)), 'id', 'parentId', 'departmentLevel', 'sortNo')
          apiListConsoleUser({ pageSize: 0, currentPage: 0 }).then(res => {
            if (res.code === '208999') {
              let list = res.resultMap.page.list
              list.map(item => {
                item.parentId = item.departmentId
                item.departmentName = item.realName
                item.id = 'a' + item.id
              })
              this.dialogItem[4].dialogData = this.$disposeTreeData(this.allDepartmentTree.concat(list))
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击获取子数据
    handleClickGetTreeData (row, index) {
      if (row.expand) {
        let i = this.saveExpendIdList.indexOf(row.id)
        if ( i > 0) {
          this.saveExpendIdList.splice(i, 1)
        }
        let length = 0
        function findLength (list, expand) {
          let length = list.length
          list.forEach(item => {
            if (item[expand] && item.list) {
              length += findLength(item.list, expand)
            }
            item.expand = false
          })
          return length
        }
        if (row.list) {
          length = findLength(row.list, 'expand')
        }
        this.tableData = this.tableData.splice(0, index + 1).concat(this.tableData.slice(length))
        this.handleTableData && this.handleTableData(this.tableData || [], true)
        row.expand = false
        return
      }
      this.saveExpendIdList.push(row.id)
      apiQueryDepartmentList({ parentId: row.id }).then((res) => {
        if (res.code === '208999') {
          res.resultMap.data.forEach(item => {
            item.level = item.departmentLevel
            if (item.hasLower) {
              item.list = []
            }
          })
          let list = res.resultMap.data
          if (!row.expand) {
            list.sort((v1, v2) => (v1.sortNo - v2.sortNo))
            this.tableData = this.tableData.splice(0, index + 1).concat(list).concat(this.tableData)
            this.tableData[index].expand = true
            this.tableData[index].list = list
          }
          this.handleTableData && this.handleTableData(this.tableData || [], true)
        } else {
          this.$message.error(res.message)
        }
      })
      console.log(row)
    },
    handleOpenTree (tableData) {
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
      open(result, tableData, this.saveExpendIdList)
      this.tableData = result
    },
    validateDepartmentName (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[1].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validateSortNo (rule, value, callback) {
      if (value < 0 || !Number(value)) {
        return callback(new Error('排序必须为正整数'))
      }
      callback()
    }
  }
}
</script>
