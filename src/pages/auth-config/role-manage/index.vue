<template>
  <div class="substance user-manage">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :table-data="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
    >
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd" v-if="$authBtn('role-create-role')">{{ $authBtn('role-create-role') }}</el-button>
        <el-button @click="handleDeleteMore" v-if="$authBtn('role-delete-batch')">{{ $authBtn('role-delete-batch') }}</el-button>
        <el-button @click="$router.push({ path: '/auth-config/role-manage/roleAuth' })" v-if="$authBtn('role-auth-role')">{{ $authBtn('role-auth-role') }}</el-button>
      </div>
    </table-module>
     <dialog-module
      ref="dialog"
      :dialog-title="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :edit-data="editData"
      :dialog-item="dialogItem"
      :dialog-btn="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { role } from '../mixins'
import basicMethod from '@/config/mixins'
import { apiAddRole, apiGetRole, apiModifyRole, apiDeleteRole } from '@/api/authority'

export default {
  name: 'menu-manage',
  mixins: [basicMethod, role],
  created () {
    this.handleGetTableData(apiGetRole)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.$set(this.editData, 'status', 1)
      this.isEdit = 0
      this.dialogTitle = '新增用户'
      this.showDialogForm = true
    },
    // 批量删除
    handleDeleteMore () {
      let idArr = this.chooseDataArr.map(item => item.roleId)
      this.apiDeleteData(apiDeleteRole, idArr, apiGetRole)
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.status = this.editData.statusStash
      this.isEdit = 1
      this.dialogTitle = '编辑用户'
      this.showDialogForm = true
    },
    // 改变角色状态
    handleChangeStatus (row) {
      let { roleId, status } = row
      status = row.statusStash === 1 ? 0 : 1
      this.apiEditData(apiModifyRole, { roleId, status }, apiGetRole)
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteRole, [row.roleId], apiGetRole)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let params = Object.assign({}, this.editData)
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddRole, this.$purifyParams(params), apiGetRole)
      } else {
        this.apiEditData(apiModifyRole, this.$purifyParams(params), apiGetRole)
      }
    },
    // 处理表格数据
    handleTableData (tableData) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.showBtnCode = []
        item.statusStash = item.status
        switch (item.status) {
          case 1:
            item.status = '正常'
            item.showBtnCode.push('role-bin-role')
            break
          case 0:
            item.status = '失效'
            item.showBtnCode.push('role-agree-role')
            break
        }
      })
    }
  }
}
</script>
