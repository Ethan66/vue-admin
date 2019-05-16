<template>
  <div class="staff-role">
    <div class="box-left">
      <h2>角色分类</h2>
      <h3>全部用户(60)</h3>
      <template>
        <div class="classfy" v-for="(item, index) in classList" :key="index">
          <div class="title">
            {{item.name}}({{item.num}})
            <span class="showIcon">
              <i class="el-icon-edit-outline" @click="handleEditClass(item.id, 'classfy')"></i>
              <i class="el-icon-circle-plus-outline" @click="handleAddClass(item.id, 'classfy')"></i>
              <i class="el-icon-delete" @click="handleDelClass(item.id, 'classfy')"></i>
            </span>
          </div>
          <div class="role" v-for="(roleItem, index) in item.roleList" :key="index" @click="handleRoleClick(roleItem.id)">
            {{roleItem.name}}({{roleItem.num}})
            <span class="showIcon">
              <i class="el-icon-edit-outline" @click.stop="handleEditRole(roleItem.id)"></i>
              <i class="el-icon-circle-plus-outline" @click.stop="handleAddRole(roleItem.id)"></i>
              <i class="el-icon-delete" @click.stop="handleDelRole(roleItem.id)"></i>
            </span>
          </div>
        </div>
      </template>
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
        <div class="total-content" slot="total">
          <b>统计数据</b>
          <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
        </div>
      </table-module>
    </div>

    <el-dialog
      class="staff-dialog"
      :visible.sync="staffDialog"
      width="520px">
      <div slot="title" class="dialog-title">
        <span>{{staffDialogTitle}}</span><i>角色配置,请勾选需要的角色</i>
      </div>
      <el-form
        :model="staffForm" :inline="true"
        label-position="left" ref="ruleForm" class="demo-ruleForm">
        <el-form-item v-if="!isDialogEdit" label="请选择员工" prop="name">
          <tree-select
            :data="dialogData"
            :defaultProps="defaultProps"
            multiple
            nodeKey="menuId" :checkedKeys="defaultCheckedKeys"
            @popoverHide="popoverHide"></tree-select>
          <span class="selectTips">支持一个员工有多个角色</span>
        </el-form-item>
        <div v-if="!isDialogEdit" class="roleConfigTips">角色配置<span>（请勾选需要的角色）</span></div>
        <el-form-item label="管理员角色" prop="type" :inline="true" label-width="100px">
          <el-checkbox-group v-model="staffForm.type">
            <el-checkbox label="超级管理员" name="type"></el-checkbox>
            <el-checkbox label="管理员" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="运营角色" prop="type" :inline="true" label-width="100px">
          <el-checkbox-group v-model="staffForm.type">
            <el-checkbox label="运营经理" name="type"></el-checkbox>
            <el-checkbox label="用户" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="staffDialog = false">取 消</el-button>
        <el-button type="primary" @click="staffDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    
    <typeDialog
      ref="typeDialog"
      :dialogVisible.sync="typeDialogVisible"
      :formItem.sync="formItem"
      :formData="formData"
      :rules="typeDialogRules"
      :dialogTitle="typeDialogTitle"
      :dialogBtn="typeDialogBtn"
    />

  </div>
</template>

<script>
import { button } from '@/createData/auth-config/mixins'
import dialogConfig from './dialogConfig.js'
import basicMethod from '@/config/mixins'
import treeSelect from '@/components/tree-select'
import typeDialog from './typeDialog'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'
export default {
  mixins: [basicMethod, button, dialogConfig],
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      staffDialog: false,
      selectStaff: [],
      classList: [
        {
          id: 1,
          name: '管理员角色',
          num: '2',
          roleList: [
            {id: 2, name: '超级管理员', num: '2'},
            {id: 3, name: '管理员', num: '3'},
            {id: 4, name: '菜鸡管理员', num: '1'},
          ]
        }, {
          id: 6,
          name: '运营角色',
          num: '2',
          roleList: [
            {id: 7, name: '运营经理', num: '2'},
            {id: 8, name: '用户运营', num: '3'},
          ]
        }
      ],
      isDialogEdit: false,
      staffDialogTitle: '添加员工',
      staffForm: {},
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
          }, {
            menuId: '1-1-3',
            menuName: '产品'
          }, {
            menuId: '1-1-4',
            menuName: '运营'
          }, {
            menuId: '1-1-5',
            menuName: '运维'
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
          }, {
            menuId: '1-2-4',
            menuName: '产品'
          }, {
            menuId: '1-2-5',
            menuName: '运营'
          }, {
            menuId: '1-2-6',
            menuName: '运维'
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
      }],
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      defaultCheckedKeys: [],
    }
  },
  methods: {
    popoverHide (checkedIds, checkedData) {
    },
    handleClose () {},
    handleEditClass (id) {
      this.typeDialogTitle = '编辑类型'
      this.formItem = [
        { label: '分类名称', key: 'name', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '创建人', type: 'text', content: '系统' },
        { label: '创建时间', type: 'text', content: '2019/04/26 15:23' }
      ]
      this.typeDialogVisible = true
    },
    handleAddClass (id) {
      this.typeDialogTitle = '新建类型'
      this.formItem = [
        { label: '分类名称', key: 'name', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' }
      ]
      this.typeDialogVisible = true
    },
    handleDelClass (id) {
      this.$confirm('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
      }).catch(() => {
      })
    },
    handleEditRole (id) {
      this.typeDialogTitle = '编辑角色'
      this.formItem = [
        { label: '所属分类', key: 'classfy', type: 'input' },
        { label: '角色名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '创建人', type: 'text', content: '2019/04/26 15:23' },
        { label: '创建时间', type: 'text', content: '2019/04/26 15:23' }
      ]
      this.typeDialogVisible = true
    },
    handleAddRole (id) {
      this.typeDialogTitle = '新建角色'
      this.formItem = [
        { label: '所属分类', key: 'classfy', type: 'select', options: [
          { label: '分类1', value: 'a' },
          { label: '分类2', value: 'b' }
        ] },
        { label: '角色名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '复制角色权限', key: 'roleLimit', type: 'selectDouble', options: [
          {
            label: '热门尘世',
            options: [{
              label: '上海',
              value: 'shanghai'
            }]
          }, {
            label: '城市名',
            options: [{
              label: '成都',
              value: 'chengdu'
            }]
          }
        ]},
      ]
      this.typeDialogVisible = true
    },
    handleDelRole (id) {
      this.$confirm('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
      }).catch(() => {
      })
    },
    // 单击角色，更新表格数据
    handleRoleClick (id) {
      console.log('role', id)
    },
    handleAddStaff () {
      this.isDialogEdit = false
      this.staffDialogTitle = '添加员工'
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.staffDialog = true
    },
    handleEditStaff (row) {
      this.isDialogEdit = true
      this.staffDialogTitle = '编辑员工'
      this.editData = JSON.parse(JSON.stringify(row))
      this.staffDialog = true
    },
    // 删除员工
    handleDelStaff (row) {
      this.$confirm('确认删除该员工所有角色？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
      }).catch(() => {
      })
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
    handleRefuse() {
      this.$refs.typeDialog.typeVisible = false
    },
    handleSubmit() {

    }
  },
  components: {
    treeSelect,
    typeDialog
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
      h3 {
        background: rgba(65, 98, 219, .05);
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4162DB;
        line-height: 40px;
        padding-left: 15px;
      }
      .classfy {
        .title {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #999999;
          line-height: 40px;
          padding-left: 15px;
          i {
            padding-left: 7px;
          }
        }
        .role {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #333333;
          line-height: 40px;
          padding-left: 40px;
          i {
            padding-left: 7px;
            color: #999;
          }
        }
        .showIcon {
          display: none;
        }
        .title:hover .showIcon{
          display: inline-block;
        }
        .role:hover .showIcon{
          display: inline-block;
        }
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
    }
    .el-dialog__wrapper.staff-dialog {
      .el-dialog {
        .el-dialog__header {
          border-bottom: 1px solid #E8E8E8;
          padding: 15px 20px;
          .dialog-title {
            span {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #333333;
              padding-right: 10px;
            }
            i {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #999999;
              letter-spacing: -0.43px;
            }
          }
          .el-dialog__title{
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
          }
        }
        .el-dialog__body {
          padding: 30px 30px;
          .el-form {
            .el-form-item {
              display: flex;
              margin-right: 0px;
              margin-bottom: 0px;
              .el-form-item__label {
                min-width: 100px;
              }
              .el-form-item__content {
                .el-checkbox-group {
                  .el-checkbox {
                    width: 118px;
                    margin-left: 0;
                    .el-checkbox__input.is-checked+.el-checkbox__label {
                      color: #666;
                    }
                    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                      background-color: #4162DB;
                      border-color: #4162DB;
                    }
                  }
                }
              }
            }
            .tree-select {
              .el-select {
                width: 358px !important;
                .el-input__inner {
                  height: 35px !important;
                }
              }
            }
          }
        }
        .el-dialog__footer {
          border-top: 1px solid #E8E8E8;
          padding: 20px;
          .dialog-footer {
            .el-button {
              width: 60px;
              height: 30px;
              padding: 0;
            }
            .el-button--default {
              color: #666;
              border: 1px solid #E8E8E8;
            }
          }
        }
      }
    }
    .selectTips {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #9B9B9B;
      letter-spacing: -0.37px;
    }
    .roleConfigTips {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333;
      letter-spacing: -0.43px;
      line-height: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e8e8e8;
      span {
        color: #999;
      }
    }
  }
</style>
