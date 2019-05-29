<template>
  <div class="staff-role">
    <search-module
      class="searchContent"
      :search-item="searchItem"
      :search-values="searchValues"
      :search-default-obj="defaultSearchObj"
      @handleSearch="handleSearch"
    />
    <table-module
      ref="table"
      :table-data="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @handleSendHead="handleSendHead"
      @table-jump="handleJump">
      <div class="btn-content" slot="btn">
        <el-button @click="handleAddStaff" v-if="$showBtn('config-manage-add')">{{$getBtnName('config-manage-add')}}</el-button>
      </div>
    </table-module>
    <!-- 添加编辑员工弹框 -->
    <staffDialog
      ref="staffDialog"
      :dialogTitle="staffDialogTitle"
      :formItem="staffDialogFormItem"
      :formData="staffDialogFormData"
      :dialogVisible.sync="staffDialogVisible"
      :dialogBtn="staffDialogBtn"
      :treeCheckedData="treeCheckedData"
      :treeList="treeList"
      :isEdit="staffDialogIsEdit"
    />
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
  </div>
</template>

<script>
import { staffRole } from './mixins'
import methods from './methods'
import basicMethod from '@/config/mixins'
import staffDialog from './components/staffDialog'
import { apiPageQueryUserRole } from '@/api/role'
import { apiListConsoleUser } from '@/api/staff'

export default {
  name: 'staff-role',
  mixins: [methods, basicMethod, staffRole],
  created () {
    this.handleGetTableData(apiPageQueryUserRole)
    // 获取部门树
    this.handleApiQueryDepartmentTree()
    // 查询系统用户列表
    this.handleApiListConsoleUser()
  },
  data () {
    return {
      isEdit: false,
      defaultSearchObj: { a: 1 },
      selectStaff: [],
      staffDialogIsEdit: false,
      staffDialogVisible: false,
      staffDialogTitle: '添加员工',
      staffDialogFormData: {
        roleIds: []
      },
      treeData: [],
      staffDialogFormItem: [],
      staffDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleSubmit' }
      ],
      treeList: [],
      treeCheckedData: [],
      globleItem: [
        { label: '所属分类', key: 'resourceParentId', type: 'select', options: [] },
        { label: '分类名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'sortNo', type: 'input' },
        { label: '创建人', key: 'createrName', type: 'text' },
        { label: '更新时间', key: 'gmtModified', type: 'text' },
        { label: '复制角色权限', key: 'cloneRoleIds', type: 'selectDouble', options: [] }
      ],
      confirmContent: '',
      confrimDiaShow: false,
      confirmFn: '',
      flag: true // 调用api锁
    }
  },
  methods: {
    roleClick (data) {
      this.handleGetTableData(apiPageQueryUserRole, data)
    },
    // 点击搜索按钮
    handleSearch (val) {
      // this.handleGetTableData(this.getTableDataApi, val)
      this.handleGetTableData(apiListConsoleUser, val)
      this.$refs.classify.handleReStatus()
    },
    handleAddStaff () {
      let callback = (list) => {
        this.staffDialogFormItem = list
        this.staffDialogIsEdit = false
        this.staffDialogTitle = '添加员工'
        this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
        this.staffDialogVisible = true
      }
      this.getRoleConfig(callback)
    },
    // 表格编辑按钮
    handleEditData (row) {
      let callback = (list) => {
        this.staffDialogFormItem = list
        this.staffDialogIsEdit = true
        this.staffDialogTitle = '编辑员工'
        this.staffDialogFormData = JSON.parse(JSON.stringify(row))
        this.staffDialogFormData.roleIds = row.roleIds.split(',')
        this.staffDialogFormData.userIds = row.id
        this.staffDialogVisible = true
      }
      this.getRoleConfig(callback)
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.delStaffId = row.id
      this.delStaffRoleIds = row.roleIds
      this.handleConfirmInfo('确认删除该员工所有角色？', 'delStaffAllRole')
    },
    delStaffAllRole () {
      this.handleApiDelUserRole(this.delStaffId, this.delStaffRoleIds)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? '有效' : '无效'
      })
    },
    handleSendHead (val) {
      console.log(val)
    },
    handleRefuse () {
      this.resetFormData('staffDialogFormData')
      this.handleDialogClose('staffDialog', 'staffDialogVisible')
    },
    handleSubmit () {
      if (!this.flag) return
      this.flag = false
      this.handleApiGrantUserRole()
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {
        currentPage: currentPage, pageSize: this.tablePages.pageSize
      }
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '208999') {
          this.tablePages.current = currentPage
          if (res.resultMap) {
            if (res.resultMap.page) {
              this.allData = res.resultMap.page.list
              this.tablePages.total = res.resultMap.page.total
            } else {
              this.allData = res.resultMap.list
              this.tablePages.total = res.resultMap.total
            }
          } else {
            this.allData = []
            this.tablePages.total = 0
          }
          this.tableData = this.allData
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        }
      })
    },
    handleConfirmInfo (txt, fnName) {
      this.confirmContent = txt
      this.confirmFn = fnName
      this.confrimDiaShow = true
    },
  },
  components: {
    staffDialog
  }
}
</script>

<style lang="less">
  .staff-role {
  }
</style>
