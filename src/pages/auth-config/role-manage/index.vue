<template>
  <div class="substance user-manage">
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :data="tableData"
      :items="tableItem"
    >
      <div class="btn-content" slot="header-btn">
        <el-button @click="handleAdd" v-if="$getBtnName('role-create-role')">{{ $getBtnName('role-create-role') }}</el-button>
        <el-button @click="handleDeleteMore" v-if="$getBtnName('role-delete-batch')">{{ $getBtnName('role-delete-batch') }}</el-button>
        <el-button @click="$router.push({ path: '/auth-config/role-manage/roleAuth' })" v-if="$getBtnName('role-auth-role')">{{ $getBtnName('role-auth-role') }}</el-button>
      </div>
     <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[3]"
          :row="scope.row"
        ></table-status>
      </template>
      <template slot="btn" slot-scope="scope">
        <table-btn
          :row="scope.row"
          :btns="tableBtn"
        />
      </template>
    </table-module>
     <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { role } from '../mixins'
import basicMethod from '@/config/mixins'
import { apiAddRole, apiGetRole, apiModifyRole, apiDeleteRole } from '@/api/authority'
import tableStatus from '@/components/table-status'
import tableBtn from '@/components/tableBtn' // 按钮模块

export default {
  name: 'menu-manage',
  mixins: [basicMethod, role],
  components: { tableStatus, tableBtn },
  data () {
    return {
      tableBtn: []
    }
  },
  created () {
    this.handleGetTableData(apiGetRole)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
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
      this.isEdit = 1
      this.dialogTitle = '编辑用户'
      this.showDialogForm = true
    },
    // 改变角色状态
    handleChangeStatus (row) {
      let { roleId, status } = row
      status = row.status === 1 ? 0 : 1
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
        switch (item.status) {
          case 1:
            item.showBtnCode.push('role-bin-role')
            break
          case 0:
            item.showBtnCode.push('role-agree-role')
            break
        }
      })
    }
  }
}
</script>
