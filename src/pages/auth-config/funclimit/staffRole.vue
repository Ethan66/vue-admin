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
      :selectableFn="handleSelectChange"
      @table-jump="handleJump">
      <div class="btn-content" slot="btn">
        <span v-if="chooseDataArr.length > 0">已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleBatchDelete" v-if="$showBtn('config-batch-delete') && chooseDataArr.length > 0">{{$getBtnName('config-batch-delete')}}</el-button>
        <el-button @click="handleAddStaff" v-if="$showBtn('config-manage-add') && chooseDataArr.length < 1">{{$getBtnName('config-manage-add')}}</el-button>
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
  </div>
</template>

<script>
import { staffRole } from '../mixins'
import methods from './methods'
import basicMethod from '@/config/mixins'
import staffDialog from './components/staffDialog'
import { apiPageQueryUserRole, apiBatchClearUserRole } from '@/api/role'
import { apiListConsoleUser } from '@/api/staff'

export default {
  name: 'staff-role',
  mixins: [methods, basicMethod, staffRole],
  created () {
    this.getStaffList()
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
      flag: true, // 调用api锁
      delAllRole: 1
    }
  },
  methods: {
    getStaffList (data) {
      this.handleGetTableData(apiPageQueryUserRole, data)
    },
    roleClick (data) {
      if (!data.roleId || data.roleId < 0) {
        this.delAllRole = 1
      } else {
        this.delAllRole = 0
      }
      this.getStaffList(data)
    },
    // 点击搜索按钮
    handleSearch (val) {
      // 搜索调用员工管理的列表
      this.handleGetTableData(apiListConsoleUser, val)
      this.delAllRole = 1
      this.$emit('handleReStatus')
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
    handleSelectChange (row) {
      if (row.roleIds) {
        return true
      } else {
        return false
      }
    },
    // 表格编辑按钮
    handleEditData (row) {
      let callback = (list) => {
        this.staffDialogFormItem = list
        this.staffDialogIsEdit = true
        this.staffDialogTitle = '编辑员工'
        this.staffDialogFormData = JSON.parse(JSON.stringify(row))
        if (row.roleIds) {
          this.staffDialogFormData.roleIds = row.roleIds.split(',')
        } else {
          this.staffDialogFormData.roleIds = []
        }
        this.staffDialogFormData.userIds = row.id
        this.staffDialogVisible = true
      }
      this.getRoleConfig(callback)
    },
    // 点击表格删除按钮
    handleDeleteBtn (row) {
      if (!row.roleIds) {
        this.$message.warning('该用户未分配角色')
        return
      }
      this.delStaffId = row.id
      this.delStaffRoleIds = row.roleIds
      let text = this.delAllRole ? '确认删除该员工所有角色？' : '确认删除该员工角色？'
      this.$confirm(text, '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.delStaffAllRole()
          }
        }
      })
    },
    delStaffAllRole () {
      this.handleApiDelUserRole(this.delStaffId, this.delStaffRoleIds)
    },
    handleBatchDelete () {
      this.$confirm('此操作不可逆，确认批量删除？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.batchDelete()
          }
        }
      })
    },
    batchDelete () {
      let strArr = []
      this.chooseDataArr.forEach(item => {
        strArr.push(item.id)
      })
      apiBatchClearUserRole({userIds: strArr.join(',')}).then(res => {
        if (res.code === '208999') {
          this.$message.success('删除成功')
          this.getStaffList()
        } else {
          this.$message.error(res.message)
        }
      })
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
    }
  },
  components: {
    staffDialog
  }
}
</script>

<style lang="less">
  .staff-role {
    .el-checkbox-group{
      .el-checkbox{
        margin-right: 20px;
      }
    }
  }
</style>
