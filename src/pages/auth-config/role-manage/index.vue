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
        <el-button @click="handleAdd" v-btn="'role-create-role'">{{ $getBtnName('role-create-role') }}</el-button>
        <el-button @click="handleDeleteMore" v-btn="'role-delete-batch'">{{ $getBtnName('role-delete-batch') }}</el-button>
        <el-button @click="$router.push({ path: '/auth-config/role-manage/roleAuth' })" v-btn="'role-auth-role'">{{ $getBtnName('role-auth-role') }}</el-button>
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
// import { role } from '../mixins'
import basicMethod from '@/config/mixins'
import { apiAddRole, apiGetRole, apiModifyRole, apiDeleteRole } from '@/api/authority'
import tableStatus from '@/components/table-status'
import tableBtn from '@/components/tableBtn' // 按钮模块

export default {
  name: 'menu-manage',
  mixins: [basicMethod],
  components: { tableStatus, tableBtn },
  data () {
    return {
      tableBtn: []
    }
  },
  pageData () {
    return {
      items: {
        search: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'select', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        },
        table: {
          selection: '',
          roleName: { label: '角色名', width: 100 },
          roleId: { label: '角色Id', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'roleStatus', formatterFn: this.$InitObj.prototype.formmater(['失效', '正常']) },
          updateDate: { label: '更新时间', width: 100 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118 }
        },
        dialog: {
          roleName: { label: '角色名' },
          status: { label: '状态', type: 'radio', options: [{ label: '正常', value: 1 }, { label: '失效', value: 0 }] }
        }
      },
      rules: {
        roleName: [
          { required: true, trigger: 'blur', message: '请填写角色名' }
        ]
      }
    }
  },
  beforeCreate () {
    this.$mergeData()
  },
  created () {
    this.tableBtn = this.$getAuthBtns([
      { code: 'menu-edit-menu', clickFn: this.handleEditData },
      { code: 'menu-delete', clickFn: this.handleDeleteData }
    ])
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
