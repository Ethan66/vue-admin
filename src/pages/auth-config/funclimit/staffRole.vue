<template>
  <div class="staff-role clearfix">
    <div class="box-left">
      <h2>角色分类</h2>
      <h3>全部用户(60)</h3>
      <template>
        <div class="classfy" v-for="(item, index) in classList" :key="index">
          <div class="title">
            {{item.name}}({{item.num}})
            <span class="showIcon">
              <i class="el-icon-edit-outline" @click="handleEditClass(item.id)"></i>
              <i class="el-icon-circle-plus-outline" @click="handleAddClass(item.id)"></i>
              <i class="el-icon-delete" @click="handleDelClass(item.id)"></i>
            </span>
          </div>
          <div class="role" v-for="(roleItem, index) in item.roleList" :key="index" @click="handleRoleClick(roleItem.id)">
            {{roleItem.name}}({{roleItem.num}})
            <span class="showIcon">
              <i class="el-icon-edit-outline" @click.stop="handleEditClass(roleItem.id)"></i>
              <i class="el-icon-circle-plus-outline" @click.stop="handleAddClass(roleItem.id)"></i>
              <i class="el-icon-delete" @click.stop="handleDelClass(roleItem.id)"></i>
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
          <el-button @click="handleAdd">添加员工</el-button>
        </div>
        <div class="total-content" slot="total">
          <b>统计数据</b>
          <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
        </div>
      </table-module>
    </div>

    <el-dialog
      title="添加员工"
      :visible.sync="staffAddDialog"
      width="520px"
      :before-close="handleClose">
      <el-form :model="staffForm" :inline="true" label-position="left" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="请选择员工" prop="name">
          <el-input v-model="staffForm.name"></el-input>
          <span class="selectTips">支持一个员工有多个角色</span>
        </el-form-item>
        <div class="roleConfigTips">角色配置<span>（请勾选需要的角色）</span></div>
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
        <el-button @click="staffAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="staffAddDialog = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { button } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'
export default {
  mixins: [basicMethod, button],
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      staffAddDialog: true,
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
      staffForm: {}
    }
  },
  methods: {
    handleClose() {},
    handleEditClass(id) {
      console.log('edit'+id)
    },
    handleAddClass(id) {
      console.log('add'+id)
    },
    handleDelClass(id) {
      console.log('del'+id)
    },
    handleRoleClick(id) {
      console.log('role', id)
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
      this.dialogTitle = '编辑按钮'
      this.showDialogForm = true
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.dialogTitle = '新增按钮'
      this.showDialogForm = true
    },
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
    .el-dialog__wrapper {
      .el-dialog {
        .el-dialog__header {
          border-bottom: 1px solid #E8E8E8;
          padding: 15px 20px;
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
