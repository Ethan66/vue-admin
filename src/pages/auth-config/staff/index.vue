<template>
  <div class="staff-admin">
    <div class="box-left">
      <div class="tree-box">
        <h2>组织架构</h2>
        <el-tree
          node-key="id" :data="treeData" :props="treeProps"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleNodeClick"></el-tree>
      </div>
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
        :table-data="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
        :table-pages="tablePages"
        @handleSendHead="handleSendHead"
        @table-jump="handleJump">
        <div class="btn-content" slot="btn">
          <el-button @click="handleAdd">新建员工</el-button>
        </div>
      </table-module>
    </div>

    <!-- 员工信息 -->
    <staffInfoDialog
      ref="staffInfoDialog"
      :dialogVisible.sync="staffInfoVisible"
      :dialogTitle="staffInfoTitle"
      :dialogBtn="staffInfoBtn"
      :infoItem="staffInfoItem"
      :infoData="staffInfoData"
    />
    <!-- 添加编辑员工 -->
    <staffDialog
      ref="staffDialog"
      :dialogVisible.sync="staffDialogVisible"
      :dialogTitle="staffDialogTitle"
      :dialogBtn="staffDialogBtn"
      :formItem="staffFormItem"
      :formData="staffFormData"
      :rules="staffFormRules"
      :defaultCheckedKeys="defaultCheckedKeys"
    />
  </div>
</template>

<script>
import { staff } from './mixins'
import { methods } from './methods'
import basicMethod from '@/config/mixins'
import staffDialog from './staffDialog'
import staffInfoDialog from './staffInfoDialog'
import { apiListConsoleUser } from '@/api/staff'
export default {
  mixins: [basicMethod, staff, methods],
  data () {
    return {
      defaultSearchObj: { a: 1 },
      staffInfoVisible: false,
      staffDialogVisible: false,
      staffForm: {},
      staffFormRules: {
        userName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        reportTo: [
          { required: true, message: '请选择汇报对象', trigger: 'blur' }
        ]
      },
      list: [],
      staffDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleSubmit' }
      ],
      staffDialogTitle: '添加员工',
      staffFormData: {},
      staffFormItem: [
        {
          title: '账号信息',
          formItem: [
            { label: '昵称', key: 'userName', type: 'input' },
            { label: '姓名', key: 'realName', type: 'input' },
            { label: '手机号', key: 'telephone', type: 'input' },
            { label: '邮箱', key: 'mailbox', type: 'input' },
            { label: '初始密码', key: 'password', type: 'input' }
          ]
        }, {
          title: '职位信息',
          formItem: [
            {
              label: '部门',
              key: 'departmentId',
              type: 'selectTree',
              defaultProps: {
                children: 'childIdList',
                label: 'departmentName'
              },
              dialogData: []
            },
            { label: '职位', key: 'position', type: 'input' },
            { label: '汇报对象',
              key: 'reportTo',
              type: 'select',
              options: [] }
          ]
        }
      ],
      defaultCheckedKeys: [],
      staffInfoItem: [
        {
          infoTitle: '孙华杰',
          infoList: [
            { label: '状态', key: 'status' },
            { label: '创建时间', key: 'gmtCreate' },
            { label: '创建人', key: 'createrName' },
            { label: '上次登录时间', key: 'LastLogonTime' }
          ]
        }, {
          infoTitle: '账号信息',
          infoList: [
            { label: '昵称', key: 'userName' },
            { label: '姓名', key: 'realName' },
            { label: '手机号', key: 'telephone' },
            { label: '邮箱', key: 'mailbox' }
          ]
        }, {
          infoTitle: '职位信息',
          infoList: [
            { label: '部门', key: 'departmentName' },
            { label: '职位', key: 'position' },
            { label: '汇报对象', key: 'reportToName' }
          ]
        }
      ],
      staffInfoData: {},
      staffInfoTitle: '员工信息',
      staffInfoBtn: [
        { label: '关闭', type: 'edit', color: 'primary', clickfn: 'handleStaffInfoDialogClose' }
      ],
      treeProps: {
        children: 'childIdList',
        label: 'departmentName'
      },
      treeData: [],
      departmentId: '' // 点击部门树的id
    }
  },
  created () {
    this.handleApiQueryDepartmentTree()
    this.handleGetTableData(apiListConsoleUser)
  },
  computed: {},
  methods: {
    handleNodeClick (data) {
      this.departmentId = data.id
      this.handleGetTableData(apiListConsoleUser, { departmentId: data.id })
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? '有效' : '无效'
        item.userType = item.userType === '0' ? '百凌管理平台用户' : item.userType === '1' ? '商户系统用户' : '其他'
        if (item.status === 0) {
          item.showBtn = ['停 用', '禁止登录']
        }
        if (item.status === 1) {
          item.showBtn = ['启 用', '允许登录']
        }
        if (item.status === 2) {
          item.showBtn = ['允许登录']
        }
      })
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.handleApiQueryLowerLevelList()
      this.staffFormData = JSON.parse(JSON.stringify(row))
      this.defaultCheckedKeys.push(this.staffFormData.departmentId)
      this.staffFormData.password = '******'
      this.isEdit = 1
      this.staffDialogTitle = '编辑员工'
      this.staffDialogVisible = true
    },
    // 点击新增按钮
    handleAdd () {
      this.staffFormData = this.$options.data().staffFormData
      this.isEdit = 0
      this.staffDialogTitle = '添加员工'
      this.handleApiQueryLowerLevelList()
      this.staffDialogVisible = true
    },
    // 停用账号
    handleStop (row) {
      this.$confirm('确定停用该员工账号吗？停用后该员工将无法登录后台管理系统。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiEditConsoleUserStatus(row.id, 1)
      })
    },
    // 启用账号
    handleStart () {
      this.$confirm('确定启用该员工账号吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiEditConsoleUserStatus(0)
      })
    },
    // 禁止登录
    handleForbidLogin (row) {
      this.$confirm('确定禁止该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiEditConsoleUserStatus(row.id, 2)
      })
    },
    // 允许登录
    handleAllowLogin () {
      this.$confirm('确定允许该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiEditConsoleUserStatus(0)
      })
    },
    // 重置密码
    handleResetPassword () {
      this.$confirm('确定重置该员工账号密码吗？新密码将以短信发送。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiResetConsoleUserPassword()
      })
    },
    // staffdialog 取消按钮
    handleRefuse () {
      this.staffFormData = this.$options.data().staffFormData
      this.$refs.staffDialog.staffVisible = false
    },
    // staffdialog 确认新建员工
    handleSubmit () {
      if (this.isEdit) {
        this.handleApiEditConsoleUser()
      } else {
        this.handleApiCreateConsoleUser()
      }
      this.$refs.staffDialog.staffVisible = false
    },
    handleStaffInfoDialogClose () {
      this.$refs.staffInfoDialog.staffInfoVisible = false
    },
    handleShowInfo (row) {
      console.log(row)
      this.staffInfoData = JSON.parse(JSON.stringify(row))
      this.staffInfoVisible = true
    },
    optionData (list) {
      let cloneData = JSON.parse(JSON.stringify(list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        father.childIdList = branchArr.length > 0 ? branchArr : [] // 给父级添加一个children属性，并赋值
        return father.parentId === 1 // 返回第一层
      })
    }
  },
  components: {
    staffDialog,
    staffInfoDialog
  }
}
</script>

<style lang="less">
  .staff-admin {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      .tree-box {
        background: #fff;
        h2 {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
          line-height: 16px;
          padding: 20px 0 20px 15px;
        }
        .el-tree {
          .el-tree-node {
            .el-tree-node__content {
              height: 30px;
              .el-tree-node__label {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
              }
            }
          }
          .is-current {
            >.el-tree-node__content{
              background: rgba(66, 99, 219, 0.095);
              .el-icon-caret-right {
                color: #4162DB;
              }
              .is-leaf.el-icon-caret-right {
                color: transparent;
              }
              .el-tree-node__label {
                color: #4162DB;
              }
            }
          }
        }
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
    }
  }
</style>
