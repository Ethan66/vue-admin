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
      :table-item="tableItem"
      :table-btn="tableBtn">
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd">新增菜单</el-button>
        <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button>
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
    />
  </div>
</template>

<script>
import { organization } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiQueryDepartmentList, apiStopDepartment, apiEditDepartment, apiDelDepartment, apiAddDepartment, apiQueryDepartmentTree } from '@/api/authority'
import { debuglog } from 'util';

export default {
  mixins: [basicMethod, organization],
  created () {
    this.tablePages.pageSize = 10000
    apiQueryDepartmentTree({ isWhole: true, hasStop: false }).then(res => {
      if (res.code === '208999') {
        
      }
    })
    this.handleGetTableData(apiQueryDepartmentList)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.dialogTitle = '新增部门'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.dialogTitle = '编辑部门'
      this.showDialogForm = true
    },
    // 点击表格停用按钮
    handleStop (row) {
      apiStopDepartment({id: row.id}).then(res => {
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
        this.apiCreateData(apiAddDepartment, obj, apiQueryDepartmentList)
      } else {
        this.apiEditData(apiEditDepartment, obj, apiQueryDepartmentList)
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
      this.tybeArr.forEach(item => {
        if (item.key === 'departmentChType') {
          this.searchItem[1].label = item.label
          this.dialogItem[2].label = item.label
          this.rules.departmentType[0].message = `请输入${item.label}`
        }
        if (item.key === 'departmentChStatus') {
          this.dialogItem[5].label = item.label
          this.rules.departmentStatus[0].message = `请输入${item.label}`
        }
      })
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        switch (item.departmentStatus) {
          case 0:
            item.departmentChStatus = '正常'
            break
          case 1:
            item.departmentChStatus = '停用'
            break
        }
        switch (item.departmentType) {
          case 0:
            item.departmentChType = '集团'
            break
          case 1:
            item.departmentChType = '公司'
            break
          case 2:
            item.departmentChType = '事业部'
            break
          case 3:
            item.departmentChType = '部门'
            break
        }
      })
      this.tableData = menuRelation(tableData, 'id', 'parentId', 'departmentLevel', 'sortNo')
    }
  }
}
</script>
