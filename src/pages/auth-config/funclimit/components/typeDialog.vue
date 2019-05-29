<template>
  <div class="type-dialog">
    <el-dialog
      :title="dialogTitle" :visible.sync="typeVisible"
      width="520px">
      <el-form ref="form" :rules="rules" :model="formData" label-width="100px">
        <el-form-item
          v-for="(item, index) in formItem" :key="index"
          :label="item.label" :prop="item.key">
          <el-input v-if="item.type === 'input'" v-model="formData[item.key]"></el-input>
          <el-select v-if="item.type === 'select'" v-model="formData[item.key]" :placeholder="item.placeholder">
            <el-option
              v-for="(optionItem, index) in item.options" :key="index"
              :label="optionItem.roleName" :value="optionItem.id"></el-option>
          </el-select>
          <el-select
            v-if="item.type === 'selectDouble'"
            v-model="formData[item.key]"
            multiple
            :placeholder="item.placeholder">
            <el-option-group
              v-for="(optionItem, index) in item.options"
              v-if="optionItem.childIdList && optionItem.childIdList.length > 0"
              :key="index"
              :disabled="optionItem.roleType === 1"
              :label="optionItem.roleName"
            >
              <el-option
                v-for="childItem in optionItem.childIdList" :key="childItem.id"
                :label="childItem.roleName" :value="childItem.id"></el-option>
            </el-option-group>
          </el-select>
          <span v-if="item.type === 'text'">{{formData[item.key] || formData['gmtCreate']}}</span>
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
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogBtn: {
      type: Array
    }
  },
  data () {
    return {
      typeVisible: false
    }
  },
  watch: {
    typeVisible (val) {
      if (val === false) {
        this.$refs['form'].resetFields()
        this.$emit('update:dialogVisible', false)
      }
    },
    dialogVisible (val) {
      if (val === true) {
        this.typeVisible = true
      }
    }
  },
  methods: {
    handleClick (type, fn) {
      if (type === 'delete') {
        if (!fn) {
          this.typeVisible = false
        } else {
          this.$parent[fn]()
        }
      } else if (type === 'edit') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!fn) {
              this.typeVisible = false
            } else {
              this.$parent[fn]()
            }
          }
        })
      }
    },
    handleCheck (key, el) {
      if (key === 'sortNo') {
        console.log(this.formData[key].replace(/[^0-9]/g, ''))
        this.$set(this.formData, key, this.formData[key].replace(/[^0-9]/g, ''))
      }
    }
  }
}
</script>

<style lang="less">
  .type-dialog {
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
          padding: 30px 67px;
          .el-form {
            .el-form-item {
              .el-form-item__label {
                line-height: 30px;
              }
              .el-form-item__content {
                margin: 0;
                line-height: 30px;
                .el-input {
                  .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                  }
                }
                .el-select {
                  width: 100%;
                  .el-input__icon {
                    line-height: 30px;
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
    }
  }
</style>
