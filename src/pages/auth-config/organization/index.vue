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
      :table-btn="tableBtn">
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
      selectTreekey="parentId"
      @handleSelectTreeValue="handleSelectTreeValue"
      @handleClearSelectTree="handleClearSelectTree"
    />
  </div>
</template>

<script>
import { organization } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiQueryDepartmentList, apiStopDepartment, apiEditDepartment, apiDelDepartment, apiAddDepartment, apiQueryDepartmentTree } from '@/api/authority'

export default {
  mixins: [basicMethod, organization],
  data () {
    return {
      allDepartmentTree: [],
      selectTreeCheckedValue: []
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
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.selectTreeCheckedValue = []
      this.handleClearSelectTree()
      this.isEdit = 0
      this.dialogTitle = '新增部门'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.departmentStatus = this.editData.departmentStatusStash
      this.editData.departmentType = this.editData.departmentTypeStash
      this.selectTreeCheckedValue = [this.editData.parentId]
      this.handleClearSelectTree()
      this.isEdit = 1
      this.dialogTitle = '编辑部门'
      this.showDialogForm = true
    },
    // 选择菜单树的值后
    handleSelectTreeValue (row) {
      if (!row) return false
      this.editData.departmentType = Number(row.departmentType) + 1
      let list = this.dialogItem[2].options.map(item => {
        if (item.value <= row.departmentType) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.$set(this.dialogItem[2], 'options', list)
    },
    // 新建平级部门
    handleCreateDepartment (row) {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[2].disabled = true
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
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[2].disabled = true
      this.editData.parentIdStash = row.id
      this.editData.parentId = row.departmentName
      this.editData.departmentType = Number(row.departmentTypeStash) + 1
      this.isEdit = 0
      this.dialogTitle = '新建部门'
      this.showDialogForm = true
    },
    // 清空菜单树的值
    handleClearSelectTree () {
      let list = this.dialogItem[2].options.map(item => {
        item.disabled = false
        return item
      })
      this.$set(this.dialogItem[2], 'options', list)
    },
    // 点击表格停用按钮
    handleStop (row) {
      apiStopDepartment({ id: row.id }).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, res.message)
        }
      })
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDelDepartment, row.id, apiQueryDepartmentList)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let edit = this.editData
      this.$refs.dialog.showDialogForm1 = false
      let obj = {
        departmentName: edit.departmentName,
        directorId: edit.directorId,
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
      this.getTableDataApi = api
      this.tableLoading = true
      api(val).then(res => {
        if (res.code === '208999') {
          this.tablePages.current = currentPage
          this.allData = res.resultMap.data
          this.tableData = this.allData
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.departmentStatusStash = item.departmentStatus
        switch (item.departmentStatus) {
          case 0:
            item.departmentStatus = '正常'
            break
          case 1:
            item.departmentStatus = '停用'
            break
        }
        item.departmentTypeStash = item.departmentType
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
      this.tableData = menuRelation(tableData, 'id', 'parentId', 'departmentLevel', 'sortNo')
      this.handleOpenTableTree(this.tableData)
    },
    // 获取部门树
    handleGetAllDepartmentTree () {
      return apiQueryDepartmentTree({ isWhole: true, hasStop: false }).then(res => {
        if (res.code === '208999') {
          this.allDepartmentTree = res.resultMap.data.filter(item => item.departmentType !== 3)
          this.dialogItem[0].dialogData = menuRelation(JSON.parse(JSON.stringify(this.allDepartmentTree)), 'id', 'parentId', 'departmentLevel', 'sortNo')
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
