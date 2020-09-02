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
      @selection-change="handleSelectChange"
    >
      <div class="btn-content" slot="header-btn">
        <el-button @click="handleAdd" v-btn="'user-create-user'">{{ $getBtnName('user-create-user') }}</el-button>
        <el-button @click="handleDeleteMore" v-btn="'user-delete-batch'">{{ $getBtnName('user-delete-batch') }}</el-button>
      </div>
      <template slot="status" slot-scope="scope">
        <table-status
          :item="tableItem[4]"
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
// import { user } from '../mixins'
import tableStatus from '@/components/table-status'
import tableBtn from '@/components/tableBtn' // 按钮模块
import basicMethod from '@/config/mixins'
import MD5 from 'js-md5'
import { apiAddUser, apiGetUser, apiModifyUserInfo, apiDeleteUser, apiGetRole } from '@/api/authority'

export default {
  name: 'user-manage',
  mixins: [basicMethod],
  components: { tableStatus, tableBtn },
  data () {
    return {
      tableBtn: [],
      operator: JSON.parse(localStorage.getItem('userInfo')).userName
    }
  },
  pageData () {
    return {
      items: {
        search: {
          account: { label: '账号', name: '你好', clearable: true, change: this.handleChange },
          name: { label: '用户名' },
          status: { label: '状态', type: 'select', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] },
          date: { label: '时间', key: 'str1,str2', type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        },
        table: {
          selection: '',
          account: { label: '账号', width: 100, show: false },
          name: { label: '用户名', width: 100 },
          roleName: { label: '角色', width: 100 },
          status: { label: '状态', width: 90, slot: 'status', clsName: 'userStatus', formatterFn: this.$InitObj.prototype.formmater(['禁止登录', '允许登录']) },
          loginTime: { label: '最近登录', width: 120 },
          operator: { label: '操作人', width: 100 },
          btn: { width: 118, slot: 'btn' }
        },
        dialog: {
          account: { label: '账号' },
          name: { label: '用户名' },
          roleId: { label: '角色', type: 'select', options: [] },
          password: { label: '密码', type: 'password' },
          status: { label: '状态', type: 'radio', options: [{ label: '允许登录', value: 1 }, { label: '禁止登录', value: 0 }] }
        }
      },
      rules: {
        account: [
          { required: true, trigger: 'blur', message: '请填写账号' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '请填写用户名' }
        ],
        roleId: [
          { required: true, trigger: 'change', message: '请选择角色' }
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
    this.handleGetTableData(apiGetUser)
    apiGetRole({}).then(res => {
      if (res.code === '000000') {
        this.dialogItem[2].options = res.data.list.map(item => ({ label: item.roleName, value: item.roleId }))
      }
    })
  },
  mounted () {
    setTimeout(() => {
      console.log(22, this.searchItem[0])
    })
  },
  methods: {
    handleSelectChange (val) {
      this.chooseDataArr = val
    },
    handleChange () {
      console.log(11, this.searchItem)
    },
    // 点击新增按钮
    handleAdd () {
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
      this.isEdit = 1
      this.dialogTitle = '编辑用户'
      this.showDialogForm = true
    },
    // 改变用户状态
    handleChangeStatus (row) {
      let { userId, status, account } = row
      status = row.status === 1 ? 0 : 1
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
        switch (item.status) {
          case 1:
            item.showBtnCode.push('user-bin-login')
            break
          case 0:
            item.showBtnCode.push('user-agree-login')
            break
        }
      })
    }
  }
}
</script>
