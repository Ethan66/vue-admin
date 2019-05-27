<template>
  <div class="staff-dialog">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :title="dialogTitle"
      :visible.sync="staffVisible" width="810px">
      <el-form
        ref="staffForm" :model="formData"
        label-position="top" :rules="rules">
        <template v-for="(item, index) in formItem">
          <div class="form-title" :key="index">{{item.title}}</div>
          <div class="form-template" :key="'t' + index">
            <div class="form-flex-box" v-for="(formItem, index) in item.formItem" :key="index">
              <el-form-item v-if="formItem.type === 'input'" :label="formItem.label" :prop="formItem.key">
                <el-input :disabled="formItem.disabled" v-model="formData[formItem.key]"></el-input>
              </el-form-item>
              <el-form-item v-if="formItem.type === 'select'" :label="formItem.label" :prop="formItem.key">
                <el-select v-model="formData[formItem.key]" :placeholder="formItem.placeholder">
                  <el-option
                    v-for="(option, index) in formItem.options" :key="index"
                    :label="option.realName" :value="option.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="formItem.type === 'selectTree'" :label="formItem.label" :prop="formItem.key">
                <tree-select
                  ref="treeSelect"
                  :data="formItem.dialogData"
                  :defaultProps="formItem.defaultProps"
                  nodeKey="id" :checkedKeys="defaultCheckedKeys"
                  @popoverHide="popoverHide"/>
              </el-form-item>
            </div>
          </div>
        </template>
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
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formItem: {
      type: Array
    },
    formData: {
      type: Object
    },
    dialogBtn: {
      type: Array
    },
    dialogTitle: {
      type: String
    },
    rules: {
      type: Object
    },
    defaultCheckedKeys: {
      type: Array
    }
  },
  data () {
    return {
      staffVisible: false
    }
  },
  watch: {
    staffVisible (val) {
      if (val === false) {
        this.$emit('update:dialogVisible', false)
      }
    },
    dialogVisible (val) {
      if (val === true) {
        this.staffVisible = true
      }
    }
  },
  methods: {
    handleClick (type, fn) {
      if (type === 'delete') {
        this.$refs.staffForm.resetFields()
        if (this.$refs.treeSelect) {
          this.$refs.treeSelect[0].clearSelectedNode()
        }
        if (!fn) {
          this.staffVisible = false
        } else {
          this.$parent[fn]()
        }
      } else if (type === 'edit') {
        this.$refs.staffForm.validate((valid) => {
          if (valid) {
            if (!fn) {
              this.staffVisible = false
            } else {
              this.$parent[fn]()
            }
            this.$refs.staffForm.resetFields()
            if (this.$refs.treeSelect) {
              this.$refs.treeSelect[0].clearSelectedNode()
            }
          }
        })
      }
    },
    popoverHide (checkedIds, checkedData) {
      this.formData.departmentId = checkedIds
    }
  },
  components: {
    treeSelect
  }
}
</script>

<style lang="less">
  .staff-dialog {
    .el-dialog{
      min-width: 700px;
      border-radius: 4px;
      .el-dialog__header{
        padding: 15px 15px 10px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 28px 30px 0;
        .el-form{
          min-width: 570px;
          .el-form-item{
            margin-bottom: 30px;
          }
        }
        .el-form-item__content {
          margin-left: 0;
          line-height: 30px;
          .el-input__inner{
            height: 30px;
            border-color: #e8e8e8;
            line-height: 30px;
          }
          .el-input__icon{
            line-height: 30px;
          }
        }
        .form-title {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          padding-bottom: 10px;
        }
        .form-template {
          display: flex;
          flex-wrap: wrap;
          .el-form-item {
            width: 230px;
            margin-right: 30px;
            margin-bottom: 20px;
            .el-form-item__label {
              padding-bottom: 5px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333;
              letter-spacing: -0.43px;
              line-height: 20px;
            }
            .el-form-item__label::before {
              color: #F41824;
            }
            div.el-form-item__content {
              margin-left: 0;
              .el-select {
                width: 100%;
              }
            }
          }
          .form-flex-box:nth-of-type(3n) .el-form-item{
            margin-right: 0;
          }
        }
      }
      .el-dialog__footer{
        height: 60px;
        padding: 14px 15px;
        border-top: 1px solid #e8e8e8;
        .el-button{
          width: 60px;
          height: 32px;
          padding: 0;
          line-height: 32px;
        }
      }
    }
  }
</style>
