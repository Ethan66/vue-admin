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
          <span v-if="chooseDataArr.length > 0">已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
          <el-button @click="handleBatchStop" v-if="$authBtn('staff-batch-stop') && chooseDataArr.length > 0">{{$authBtn('staff-batch-stop')}}</el-button>
          <el-button @click="handleBatchStart" v-if="$authBtn('staff-batch-start') && chooseDataArr.length > 0">{{$authBtn('staff-batch-start')}}</el-button>
          <el-button @click="handleBatchForbidLogin" v-if="$authBtn('staff-batch-stop-log') && chooseDataArr.length > 0">{{$authBtn('staff-batch-stop-log')}}</el-button>
          <el-button @click="handleBacthAllowLogin" v-if="$authBtn('staff-batch-ok-log') && chooseDataArr.length > 0">{{$authBtn('staff-batch-ok-log')}}</el-button>
          <el-button @click="handleAdd" v-if="$authBtn('staff-manage-add') && chooseDataArr.length < 1">{{$authBtn('staff-manage-add')}}</el-button>
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
      :defaultCheckedKeys.sync="defaultCheckedKeys"
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
  name: 'staff-index',
  mixins: [basicMethod, staff, methods],
  data () {
    let checkTel = (rule, value, callback) => {
      let reg = /^1[34578]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    let checkPassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('请输入6-20位数字+字母的密码'))
      } else {
        callback()
      }
    }
    return {
      defaultSearchObj: { a: 1 },
      staffInfoVisible: false,
      staffDialogVisible: false,
      staffForm: {},
      staffFormRules: {
        userName: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        mailbox: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkTel, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' },
          { validator: checkPassword, message: '请输入6-20位数字+字母的密码', trigger: ['blur', 'change'] }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ]
      },
      list: [],
      staffDialogBtn: [
        { label: '取消', type: 'delete', clickfn: 'handleRefuse' },
        { label: '确认', type: 'edit', color: 'primary', clickfn: 'handleSubmit' }
      ],
      staffDialogTitle: '添加员工',
      staffFormData: {
        departmentId: ''
      },
      staffFormItem: [
        {
          title: '账号信息',
          formItem: [
            { label: '账户', key: 'userName', type: 'input' },
            { label: '姓名', key: 'realName', type: 'input' },
            { label: '手机号', key: 'telephone', type: 'input' },
            { label: '邮箱', key: 'mailbox', type: 'input' },
            { label: '初始密码', key: 'password', type: 'password', disabled: false }
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
          infoTitle: '',
          infoList: [
            { label: '状态', key: 'statusMsg' },
            { label: '创建时间', key: 'gmtCreate' },
            { label: '创建人', key: 'createrName' },
            { label: '上次登录时间', key: 'lastLogonTime' }
          ]
        }, {
          infoTitle: '账号信息',
          infoList: [
            { label: '账户', key: 'userName' },
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
      departmentId: '', // 点击部门树的id
      stopId: [],
      startId: [],
      forbidId: [],
      allowId: []
    }
  },
  created () {
    this.handleApiQueryDepartmentTree()
    this.handleGetTableData(apiListConsoleUser)
  },
  watch: {
    'staffFormData.departmentId': function (val, oldVal) {
      if (oldVal) {
        this.$delete(this.staffFormData, 'reportTo')
      }
      // if (val) {
      //   console.log(val)
      //   this.handleGetReportTo(val)
      // }
    }
  },
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
        item.userType = item.userType === '0' ? '百凌管理平台用户' : item.userType === '1' ? '商户系统用户' : '其他'
        item.showBtn = []
        if (item.status === 0) {
          item.showBtn.push('禁止登录')
        }
        if (item.status === 2) {
          item.showBtn.push('允许登录')
        }
        if (item.isDelete === '0') {
          item.showBtn.push('停用')
        }
        if (item.isDelete === '1') {
          item.showBtn.push('启用')
        }
      })
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.staffFormData = JSON.parse(JSON.stringify(row))
      this.handleApiQueryLowerLevelList()
      console.log(this.staffFormData.departmentId)
      this.staffFormData.password = 'a12345'
      this.staffFormItem[0].formItem.map(item => {
        if (item.key === 'password') {
          item.disabled = true
        }
      })
      this.staffFormData.reportTo = !this.staffFormData.reportTo || this.staffFormData.reportTo === '0' ? '' : Number(this.staffFormData.reportTo)
      this.isEdit = 1
      this.staffDialogTitle = '编辑员工'
      this.staffDialogVisible = true
    },
    // 点击新增按钮
    handleAdd () {
      this.staffFormData = this.$options.data().staffFormData
      this.staffFormItem = this.$options.data().staffFormItem
      this.handleApiQueryLowerLevelList() // 获取部门列表
      this.staffDialogTitle = '添加员工'
      this.isEdit = 0
      this.staffDialogVisible = true
    },
    // 停用账号
    handleStop (row) {
      this.stopId.push(row)
      this.stopStatus = row.status
      this.$confirm('确定停用该员工账号吗？停用后该员工将无法登录后台管理系统。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.stop()
          }
        }
      })
    },
    stop () {
      this.handleApiEditConsoleUserStatus(this.stopId, this.stopStatus, 1)
    },
    // 批量停用账号
    handleBatchStop () {
      this.stopId = this.chooseDataArr
      this.$confirm('确定停用该员工账号吗？停用后该员工将无法登录后台管理系统。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.batchStop()
          }
        }
      })
    },
    batchStop () {
      this.handleApiEditConsoleUserStatus(this.stopId, '', 1)
    },
    // 启用账号
    handleStart (row) {
      this.startId.push(row)
      this.startStatus = row.status
      this.$confirm('确定启用该员工账号吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.start()
          }
        }
      })
    },
    start () {
      this.handleApiEditConsoleUserStatus(this.startId, this.startStatus, 0)
    },
    // 批量启用账号
    handleBatchStart (row) {
      this.startId = this.chooseDataArr
      this.$confirm('确定启用该员工账号吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.batchstart()
          }
        }
      })
    },
    batchstart () {
      this.handleApiEditConsoleUserStatus(this.startId, '', 0)
    },
    // 禁止登录
    handleForbidLogin (row) {
      this.forbidId.push(row)
      this.forbidIsDelete = row.isDelete
      this.$confirm('确定禁止该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.forbidLogin()
          }
        }
      })
    },
    forbidLogin () {
      this.handleApiEditConsoleUserStatus(this.forbidId, 2, this.forbidIsDelete)
    },
    // 批量禁止登录
    handleBatchForbidLogin (row) {
      this.forbidId = this.chooseDataArr
      this.$confirm('确定禁止该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.batchForbidLogin()
          }
        }
      })
    },
    batchForbidLogin () {
      this.handleApiEditConsoleUserStatus(this.forbidId, 2, '')
    },
    // 允许登录
    handleAllowLogin (row) {
      this.allowId.push(row)
      this.allowisDelete = row.isDelete
      this.$confirm('确定允许该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.allowLogin()
          }
        }
      })
    },
    allowLogin () {
      this.handleApiEditConsoleUserStatus(this.allowId, 0, this.allowisDelete)
    },
    // 批量允许登录
    handleBacthAllowLogin (row) {
      this.allowId = this.chooseDataArr
      this.$confirm('确定允许该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.batchAllowLogin()
          }
        }
      })
    },
    batchAllowLogin () {
      this.handleApiEditConsoleUserStatus(this.allowId, 0, '')
    },
    // 重置密码
    handleResetPassword (row) {
      this.resetId = row.id
      this.$confirm('确定重置该员工账号密码吗？新密码将以短信发送。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.resetPassword()
          }
        }
      })
    },
    resetPassword () {
      this.handleApiResetConsoleUserPassword(this.resetId)
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
    // 显示员工信息弹框
    handleShowInfo (row) {
      // 重置数据
      this.staffInfoItem[0].infoTitle = ''
      this.staffInfoData = this.$options.data().staffInfoData
      // 获取员工信息
      this.handleApiQueryConsoleUserInfo(row.id)
    },
  },
  components: {
    staffDialog,
    staffInfoDialog
  }
}
</script>

<style lang="less">
  .el-button--default{
    color: #888;
    border: 1px solid #e8e8e8;
  }
  .staff-admin {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      overflow: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2px;
          background: #ccc
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
      }
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
              // margin-left: 10px !important;
              border-left: 10px solid #fff;
              height: 35px;
              .el-tree-node__label {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
              }
            }
            .el-tree-node__content:hover {
              background-color: #f5f7fa;
              border-left: 10px solid #f5f7fa;
            }
          }
          .is-current {
            >.el-tree-node__content{
              background: #EDF0FC;
              border-left: 10px solid #EDF0FC;
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
      height: calc(100vh - 100px);
      overflow: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2px;
          background: #ccc;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
      }
    }
  }
</style>
