<template>
  <div class="staff-role">
    <div class="box-left">
      <h2>角色分类</h2>
      <classify
        ref="classify"
        :classifyList="classifyList"
        :total="roleCount"
        @classify="handleClassify"
        @role="handleRole"
        @roleClick="handleRoleClick"
      />
    </div>
    <div class="box-right">
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
          <el-button @click="handleAddStaff">添加员工</el-button>
        </div>
      </table-module>
    </div>

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
    <!-- 添加编辑角色分类弹框 -->
    <typeDialog
      ref="typeDialog"
      :dialogVisible.sync="typeDialogVisible"
      :formItem="formItem"
      :formData="formData"
      :rules="typeDialogRules"
      :dialogTitle="typeDialogTitle"
      :dialogBtn="typeDialogBtn"
    />
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
  </div>
</template>

<script>
import { staffRole } from './mixins'
import methods from './methods'
import dialogConfig from './dialogConfig.js'
import basicMethod from '@/config/mixins'
import typeDialog from './typeDialog'
import classify from './components/classify'
import staffDialog from './components/staffDialog'
import { apiPageQueryUserRole } from '@/api/role'

export default {
  name: 'staff-role',
  mixins: [methods, basicMethod, staffRole, dialogConfig],
  created () {
    this.handleGetTableData(apiPageQueryUserRole)
    // 获取角色分类树
    this.handleApiGetAllRoleRequestTree()
    // 获取部门树
    this.handleApiQueryDepartmentTree()
    // 查询系统用户列表
    this.handleApiListConsoleUser()
  },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      selectStaff: [],
      classifyList: [],
      staffDialogIsEdit: false,
      staffDialogVisible: false,
      staffDialogTitle: '添加员工',
      staffDialogFormData: {
        roleIds: []
      },
      roleCount: 0,
      treeData: [],
      staffDialogFormItem: [
        {
          label: '管理员角色',
          key: 'admin',
          options: [
            { label: '超级管理员', value: '1' },
            { label: '管理员', value: '2' }
          ]
        }, {
          label: '运营角色',
          key: 'marketing',
          options: [
            { label: '运营经理', value: '3' },
            { label: '用户运营', value: '4' }
          ]
        }
      ],
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
        { label: '创建时间', key: 'gmtModified', type: 'text' },
        { label: '复制角色权限', key: 'cloneRoleIds', type: 'selectDouble', options: [] }
      ],
      confirmContent: '',
      confrimDiaShow: false,
      confirmFn: '',
      delId: ''
    }
  },
  methods: {
    // 点击搜索按钮
    handleSearch (val) {
      this.handleGetTableData(this.getTableDataApi, val)
      this.$refs.classify.handleReStatus()
    },
    handleEditClass (row) {
      this.handleApiGetConsoleRoleById(row.id)
      this.handleInitTypeDialog('编辑类型', ['roleName', 'sortNo', 'createrName', 'gmtModified'], true)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '分类名称'
        }
      })
    },
    handleAddClass (row) {
      this.handleInitTypeDialog('新建类型', ['roleName', 'sortNo'], false)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '分类名称'
        }
      })
    },
    handleDelClass (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', 'handleApiDelConsoleRole')
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleClassify (type, item) {
      this.isClassify = 1
      if (type === 'add') {
        this.handleAddClass(item)
      } else if (type === 'del') {
        this.handleDelClass(item)
      } else if (type === 'edit') {
        this.handleEditClass(item)
      }
    },
    handleEditRole (row) {
      this.handleApiGetConsoleRoleById(row.id)
      this.handleInitTypeDialog('编辑角色', ['resourceParentId', 'roleName', 'sortNo', 'createrName', 'gmtModified'], true)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '角色名称'
        }
      })
      this.handleGetClassify()
    },
    handleAddRole (row) {
      this.handleInitTypeDialog('新建角色', ['resourceParentId', 'roleName', 'sortNo', 'cloneRoleIds'], false)
      this.formItem.map(item => {
        if (item.key === 'roleName') {
          item.label = '角色名称'
        }
      })
      this.handleGetClassify()
      this.handleApiGetAllRoleRequestTree()
    },
    handleDelRole (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', 'handleApiDelConsoleRole')
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleRole (type, item) {
      this.isClassify = 0
      if (type === 'add') {
        this.handleAddRole(item)
      } else if (type === 'del') {
        this.handleDelRole(item)
      } else if (type === 'edit') {
        this.handleEditRole(item)
      }
    },
    /**
     * 单击角色，更新表格数据
     * type: role: 单击的角色； all: 单击的全部用户； 否则就是单击的分类
     * item:
     */
    handleRoleClick (type, item) {
      if (type === 'role') {
        this.isClassify = 0
      } else if (type === 'all') {
        this.isClassify = ''
      } else {
        this.isClassify = 1
      }
      this.handleGetTableData(apiPageQueryUserRole, { resourceType: this.isClassify, roleId: item.id })
    },
    handleAddStaff () {
      this.handleApiGetAllRoleRequestTree()
      this.staffDialogIsEdit = false
      this.staffDialogTitle = '添加员工'
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.staffDialogVisible = true
    },
    // 表格编辑按钮
    handleEditData (row) {
      this.staffDialogIsEdit = true
      this.staffDialogTitle = '编辑员工'
      this.staffDialogFormData = JSON.parse(JSON.stringify(row))
      this.staffDialogFormData.roleIds = row.roleIds.split(',')
      this.staffDialogFormData.userIds = row.id
      this.staffDialogVisible = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.handleApiDelUserRole(row.id, row.roleIds)
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
      this.handleApiGrantUserRole()
    },
    handleTypeDialogRefuse () {
      this.handleDialogClose('typeDialog', 'typeVisible')
    },
    handleTypeDialogSubmit () {
      if (this.isEdit) {
        // 编辑角色或角色分类，根据isClassify判断
        this.handleApiEditeConsoleRole()
      } else {
        // 添加角色或角色分类，根据isClassify判断
        this.handleApiCreateConsoleRole()
      }
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
            this.allData = res.resultMap.list
            this.tablePages.total = res.resultMap.total
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
    staffDialog,
    typeDialog,
    classify
  }
}
</script>

<style lang="less">
  .staff-role {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      h2 {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        padding: 20px 0 20px 15px;
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
    }
  }
</style>
