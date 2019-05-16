<template>
  <div class="staff-admin">
    <div class="box-left">
      <div class="tree-box">
        <h2>组织架构</h2>
        <el-tree
          node-key="label" :data="treeData" :props="treeProps"
          default-expand-all
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
    />
  </div>
</template>

<script>
import { staff } from './mixins'
import basicMethod from '@/config/mixins'
import staffDialog from './staffDialog'
import staffInfoDialog from './staffInfoDialog'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'
export default {
  mixins: [basicMethod, staff],
  data () {
    return {
      defaultSearchObj: { a: 1 },
      staffInfoVisible: false,
      staffDialogVisible: false,
      staffForm: {},
      staffFormRules: {
        nikeName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入初始密码', trigger: 'blur' }
        ]
      },
      list: [
        { id: 1, parentId: 0, name: '一级菜单A', rank: 1 },
        { id: 2, parentId: 0, name: '一级菜单B', rank: 1 },
        { id: 3, parentId: 0, name: '一级菜单C', rank: 1 },
        { id: 4, parentId: 1, name: '二级菜单A-A', rank: 2 },
        { id: 5, parentId: 1, name: '二级菜单A-B', rank: 2 },
        { id: 6, parentId: 2, name: '二级菜单B-A', rank: 2 },
        { id: 7, parentId: 4, name: '三级菜单A-A-A', rank: 3 }
      ],
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
            { label: '昵称', key: 'nikeName', type: 'input' },
            { label: '姓名', key: 'name', type: 'input' },
            { label: '手机号', key: 'phone', type: 'input' },
            { label: '邮箱', key: 'email', type: 'input' },
            { label: '初始密码', key: 'password', type: 'input' }
          ]
        }, {
          title: '职位信息',
          formItem: [
            {
              label: '部门',
              key: 'department',
              type: 'selectTree',
              defaultProps: {
                children: 'childrenList',
                label: 'menuName'
              },
              defaultCheckedKeys: [],
              dialogData: [{
                menuId: 1,
                menuName: '霖梓网络',
                childrenList: [{
                  menuId: '1-1',
                  menuName: '百凌事业部',
                  childrenList: [{
                    menuId: '1-1-1',
                    menuName: '前端'
                  }, {
                    menuId: '1-1-2',
                    menuName: '后端'
                  }]
                }, {
                  menuId: '1-2',
                  menuName: '联通事业部',
                  childrenList: [{
                    menuId: '1-2-1',
                    menuName: '前端'
                  }, {
                    menuId: '1-2-2',
                    menuName: '后端'
                  }, {
                    menuId: '1-2-3',
                    menuName: '测试'
                  }]
                }]
              }, {
                menuId: 2,
                menuName: '霖扬网络',
                childrenList: [{
                  menuId: '2-1',
                  menuName: 'in有',
                  childrenList: [{
                    menuId: '2-1-1',
                    menuName: '前端'
                  }, {
                    menuId: '2-1-2',
                    menuName: '后端'
                  }, {
                    menuId: '2-1-3',
                    menuName: '运维'
                  }, {
                    menuId: '2-1-4',
                    menuName: '运营'
                  }]
                }, {
                  menuId: '2-2',
                  menuName: '二级 2-2',
                  childrenList: [{
                    menuId: '2-2-1',
                    menuName: '三级 2-2-1'
                  }]
                }]
              }]
            },
            { label: '职位', key: 'job', type: 'input' },
            { label: '汇报对象',
              key: 'report',
              type: 'selectTree',
              defaultProps: {
                children: 'childrenList',
                label: 'menuName'
              },
              defaultCheckedKeys: [],
              dialogData: [{
                menuId: 1,
                menuName: '霖梓网络',
                childrenList: [{
                  menuId: '1-1',
                  menuName: '百凌事业部',
                  childrenList: [{
                    menuId: '1-1-1',
                    menuName: '前端'
                  }, {
                    menuId: '1-1-2',
                    menuName: '后端'
                  }]
                }, {
                  menuId: '1-2',
                  menuName: '联通事业部',
                  childrenList: [{
                    menuId: '1-2-1',
                    menuName: '前端'
                  }, {
                    menuId: '1-2-2',
                    menuName: '后端'
                  }, {
                    menuId: '1-2-3',
                    menuName: '测试'
                  }]
                }]
              }, {
                menuId: 2,
                menuName: '霖扬网络',
                childrenList: [{
                  menuId: '2-1',
                  menuName: 'in有',
                  childrenList: [{
                    menuId: '2-1-1',
                    menuName: '前端'
                  }, {
                    menuId: '2-1-2',
                    menuName: '后端'
                  }, {
                    menuId: '2-1-3',
                    menuName: '运维'
                  }, {
                    menuId: '2-1-4',
                    menuName: '运营'
                  }]
                }, {
                  menuId: '2-2',
                  menuName: '二级 2-2',
                  childrenList: [{
                    menuId: '2-2-1',
                    menuName: '三级 2-2-1'
                  }]
                }]
              }] }
          ]
        }
      ],
      staffInfoData: [
        {
          infoTitle: '孙华杰',
          infoList: [
            { label: '状态', value: '禁止登录' },
            { label: '创建时间', value: '2019/4/26 10:17' },
            { label: '状态', value: '禁止登录' },
            { label: '状态', value: '禁止登录' }
          ]
        }, {
          infoTitle: '孙华杰',
          infoList: [
            { label: '状态', value: '禁止登录' },
            { label: '创建时间', value: '2019/4/26 10:17' },
            { label: '状态', value: '禁止登录' },
            { label: '状态', value: '禁止登录' }
          ]
        }, {
          infoTitle: '孙华杰',
          infoList: [
            { label: '状态', value: '禁止登录' },
            { label: '创建时间', value: '2019/4/26 10:17' },
            { label: '状态', value: '禁止登录' },
            { label: '状态', value: '禁止登录' }
          ]
        }
      ],
      staffInfoTitle: '员工信息',
      staffInfoBtn: [
        { label: '关闭', type: 'edit', color: 'primary', clickfn: 'handleStaffInfoDialogClose' }
      ],
      treeProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }
      ],
    }
  },
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  computed: {
    /* 转树形数据 */
    optionData () {
      let cloneData = JSON.parse(JSON.stringify(this.list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        father.children = branchArr.length > 0 ? branchArr : '' // 给父级添加一个children属性，并赋值
        return father.parentId === 0 // 返回第一层
      })
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? '有效' : '无效'
      })
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteSysButton, row.id, apiListSysButton)
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.staffDialogTitle = '编辑员工'
      this.staffDialogVisible = true
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.staffDialogTitle = '添加员工'
      this.staffDialogVisible = true
    },
    // 停用账号
    handleStop () {
      this.$confirm('确定停用该员工账号吗？停用后该员工将无法登录后台管理系统。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 启用账号
    handleStart () {
      this.$confirm('确定启用该员工账号吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 禁止登录
    handleForbidLogin () {
      this.$confirm('确定禁止该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 允许登录
    handleAllowLogin () {
      this.$confirm('确定允许该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 重置密码
    handleResetPassword () {
      this.$confirm('确定重置该员工账号密码吗？新密码将以短信发送。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 关闭员工信息弹框
    handleStaffInfoClose () {
      this.staffInfoVisible = false
    },
    // staffdialog 取消按钮
    handleRefuse () {
      this.$refs.staffDialog.staffVisible = false
    },
    // staffdialog 确认按钮
    handleSubmit () {
      this.$refs.staffDialog.staffVisible = false
    },
    handleStaffInfoDialogClose () {
      this.$refs.staffInfoDialog.staffInfoVisible = false
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
