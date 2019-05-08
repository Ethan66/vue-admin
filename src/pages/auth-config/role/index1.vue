<template>
  <div class="catalog">
    <search-module
      class="searchContent"
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    />
    <table-module
      :table-data="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @table-jump="handleJump">
      <div class="btn-content" slot="btn">
        <span>已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleAdd">新 增</el-button>
        <el-button @click="$router.push({ path: '/main/auth-config/menu/newpage' })">跳 转</el-button>
      </div>
      <div class="total-content" slot="total">
        <b>统计数据</b>
        <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
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
import { role } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { apiGetListSysRole, apiCreateSysRole, apiEditeSysRole, apiDeleteSysRole } from '@/api/authority'

export default {
  mixins: [basicMethod, role],
  created () {
    this.handleGetTableData(apiGetListSysRole)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.editData.roleSuper = 1
      this.isEdit = 0
      this.dialogTitle = '新增角色'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.dialogTitle = '编辑角色'
      this.showDialogForm = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteSysRole, row.id, apiGetListSysRole)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateSysRole, this.editData, apiGetListSysRole)
      } else {
        this.apiEditData(apiEditeSysRole, this.editData, apiGetListSysRole)
      }
    }
  }
}
</script>
