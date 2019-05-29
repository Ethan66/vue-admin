<template>
  <div class="funclimit-staff-dialog">
    <el-dialog
      :visible.sync="staffDialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false" width="520px">
      <div slot="title" class="dialog-title">
        <span>{{dialogTitle}}</span><i v-if="isEdit">角色配置,请勾选需要的角色</i>
      </div>
      <el-form
        :model="formData" :inline="true"
        label-position="left" ref="ruleForm" class="demo-ruleForm">
        <el-form-item v-if="!isEdit" class="select-tree-item" label="请选择员工" prop="name">
          <tree-select
            ref="treeSelect"
            :data="treeList" :defaultProps="defaultProps"
            multiple nodeKey="id" :checkedKeys="treeCheckedData"
            @popoverHide="popoverHide"
            @change="popoverHide"></tree-select>
          <span class="selectTips">支持一个员工有多个角色</span>
        </el-form-item>
        <div v-if="!isEdit" class="roleConfigTips">
          角色配置<span>（请勾选需要的角色）</span>
        </div>
        <el-form-item
          v-for="(item, index) in formItem" :key="`it${index}`"
          :label="item.roleName" :inline="true" label-width="100px" v-if="item.childIdList && item.childIdList.length > 0">
          <el-checkbox-group v-model="formData.roleIds">
            <el-checkbox
              v-for="option in item.childIdList" :key="`op${option.id}`"
              :label="String(option.id)" :name="String(option.id)">{{option.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="(item, index) in dialogBtn"
          :key="index" :type="item.color"
          @click="handleClick(item.type, item.clickfn)">{{item.label}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import treeSelect from '@/components/tree-select'
export default {
  props: {
    dialogTitle: {
      type: String
    },
    formItem: {
      type: Array
    },
    formData: {
      type: Object
    },
    rules: {
      type: Object
    },
    isEdit: {
      type: Boolean
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogBtn: {
      type: Array
    },
    treeCheckedData: {
      type: Array
    },
    treeList: {
      type: Array
    }
  },
  data () {
    return {
      staffDialogVisible: false,
      defaultProps: {
        children: 'childIdList',
        label: 'departmentName'
      }
    }
  },
  watch: {
    staffDialogVisible (val) {
      if (val === false) {
        this.$emit('update:dialogVisible', false)
      }
    },
    dialogVisible (val) {
      if (val === true) {
        this.staffDialogVisible = true
      }
    }
  },
  methods: {
    handleClick (type, fn) {
      if (type === 'delete') {
        if (!fn) {
          this.staffDialogVisible = false
        } else {
          this.$parent[fn]()
          // 清除选择的员工
          this.clearNodes()
        }
      } else if (type === 'edit') {
        if (!fn) {
          this.staffDialogVisible = false
          // 清除选择的员工
          this.clearNodes()
        } else {
          this.$parent[fn]()
        }
      }
    },
    popoverHide (checkedIds, checkedData) {
      let list = checkedIds.filter(item => {
        if (typeof item === 'string' && item.includes('a')) {
          return item
        }
      })
      this.$refs.treeSelect.selectedData = list
      list = list.map(item => {
        return item.replace(/a/g, '')
      })
      this.formData.userIds = list.join(',')
    },
    clearNodes () {
      if (!this.isEdit) {
        this.$refs.treeSelect.clearSelectedNodes()
      }
    }
  },
  components: {
    treeSelect
  }
}
</script>

<style lang="less">
  .funclimit-staff-dialog {
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
                  min-width: 118px;
                  margin-left: 0;
                  .el-checkbox__input.is-checked+.el-checkbox__label {
                    color: #888;
                  }
                  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                    background-color: #4162DB;
                    border-color: #4162DB;
                  }
                }
              }
            }
          }
          .select-tree-item {
            .el-form-item__content {
              width: 100%;
              .tree-select {
                width: 100%;
                .el-select {
                  width: 100%;
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
            color: #888;
            border: 1px solid #E8E8E8;
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
