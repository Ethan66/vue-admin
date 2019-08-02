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
        <el-button @click="handleAdd" v-if="$authBtn('user-create-user')">{{ $authBtn('user-create-user') }}</el-button>
        <el-button @click="handleDeleteMore" v-if="$authBtn('user-delete-batch')">{{ $authBtn('user-delete-batch') }}</el-button>
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
import { user } from '../mixins'
import basicMethod from '@/config/mixins'
import MD5 from 'js-md5'
import { apiAddUser, apiGetUser, apiModifyUserInfo, apiDeleteUser, apiGetRole } from '@/api/authority'

export default {
  name: 'user-manage',
  mixins: [basicMethod, user],
  data () {
    return {
      operator: JSON.parse(localStorage.getItem('userInfo')).userName
    }
  },
  created () {
    this.handleGetTableData(apiGetUser)
    apiGetRole({}).then(res => {
      if (res.code === '000000') {
        this.dialogItem[2].options = res.data.list.map(item => ({ label: item.roleName, value: item.roleId }))
      }
    })
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
      let idArr = this.chooseDataArr.map(item => item.userId)
      this.apiDeleteData(apiDeleteUser, idArr, apiGetUser)
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.status = this.editData.statusStash
      this.isEdit = 1
      this.dialogTitle = '编辑用户'
      this.showDialogForm = true
    },
    // 改变用户状态
    handleChangeStatus (row) {
      let { userId, status, account } = row
      status = row.statusStash === 1 ? 0 : 1
      this.apiEditData(apiModifyUserInfo, { account, id: userId, status, operator: this.operator }, apiGetUser)
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteUser, [row.userId], apiGetUser)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let params = Object.assign({}, this.editData)
      params.id = params.userId
      delete params.userId
      params.operator = this.operator
      params.password && (params.password = MD5(params.password))
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddUser, this.$purifyParams(params), apiGetUser)
      } else {
        this.apiEditData(apiModifyUserInfo, this.$purifyParams(params), apiGetUser)
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
            item.status = '允许登录'
            item.showBtnCode.push('user-bin-login')
            break
          case 0:
            item.status = '禁止登录'
            item.showBtnCode.push('user-agree-login')
            break
        }
      })
    }
  }
}
</script>
