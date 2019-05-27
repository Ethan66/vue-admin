<template>
  <el-dialog :title="dialogTitle" :visible.sync="showDialogForm1" :class="['dialogModule', { doubleColumn }]" :close-on-click-modal="false">
    <el-form :model="editData" :rules="rules" ref="editData">
      <el-row v-for="(item, i) in dialogItem1" :key="i" :class="handleClass(item.span, item.type)">
        <el-col :class="item.clsName || ''">
          <el-form-item :class="['label' + chineseTybe, { radio: ['radio', 'docs'].includes(item.type) }]" :label="item.label" :prop="item.key">
            <el-select
                      v-if="['select', 'selectMore'].includes(item.type)"
                      v-model="editData[item.key]"
                      :placeholder="item.placeholder"
                      :filterable="item.type === 'select'"
                      :multiple="item.type === 'selectMore'"
                      @change="handleChange(item.changeFn, editData[item.key])"
                      :disabled="item.disabled || allRead"
            >
              <el-option v-for="(child, k) in item.options" :label="child.label" :value="child.value" :disabled="child.disabled" :key="k"></el-option>
            </el-select>
            <el-input
                      v-model="editData[item.key]"
                      :type="item.type"
                      :placeholder="item.placeholder"
                      :disabled="item.disabled || allRead"
                      :maxlength="item.maxlength"
                      @input="handleChange(item.changeFn, editData[item.key])"
                      v-if="['input', 'number', 'password'].includes(item.type)"
            >
            </el-input>
            <span v-if="item.type === 'docs'">{{editData[item.key]}}</span>
            <el-input v-model="editData[item.key]" type="textarea"
                      :placeholder="item.placeholder"
                      :disabled="item.disabled || allRead"
                      :rows="item.rows"
                      :maxlength="item.maxlength"
                      @change="handleChange(item.changeFn, editData[item.key])"
                      v-if="item.type==='textarea'">
            </el-input>
            <el-radio-group v-model="editData[item.key]" v-if="item.type==='radio'" :disabled="item.disabled || allRead" size="small">
              <el-radio v-for="(child, k) in item.options" @change="handleChange(item.changeFn, editData[item.key])" :label="child.value" :key="k">{{child.label}}</el-radio>
            </el-radio-group>
            <el-date-picker type="datetime" :placeholder="item.placeholder || ''" style="width: 100%;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="editData[item.key]"
                            @change="handleChange(item.changeFn, editData[item.key])"
                            :clearable="false"
                            v-if="item.type==='date'">
            </el-date-picker>
            <my-switch v-model="editData[item.key]" v-if="item.type==='switch'">
            </my-switch>
            <tree-select
              v-if="item.type === 'selectTree'"
              ref="selectTree"
              clearable
              :data="item.dialogData"
              :defaultProps="item.defaultProps"
              nodeKey="id" :checkedKeys="selectTreeCheckedValue"
              @change="handleClearSelectTree"
              @popoverHide="popoverHide"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-for="(item, i) in dialogBtn">
      <el-button :key="i"
                 v-if="item.show"
                 :type="item.color"
                 :disabled="item.disabled"
                 @click="handleFn(item.type, item.clickFn || '')">{{item.name}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import mySwitch from '@/components/modules/switch'
import treeSelect from '@/components/tree-select'

export default {
  name: 'dialogModule',
  components: { mySwitch, treeSelect },
  props: {
    dialogTitle: {
      type: String,
      required: true
    },
    dialogItem: {
      type: Array,
      required: true
    },
    editData: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    doubleColumn: Boolean,
    showDialogForm: Boolean,
    dialogBtn: Array,
    allRead: Boolean,
    selectTreeCheckedValue: Array,
    selectTreekey: String
  },
  data () {
    return {
      chineseTybe: 0,
      showDialogForm1: false,
      oldEditData: null,
      selectTreeProps: {// 配置项（必选）
        value: 'id',
        label: 'departmentName',
        children: 'childIdList'
        // disabled:true
      }
    }
  },
  watch: {
    showDialogForm (val) {
      if (val === true) {
        this.showDialogForm1 = true
        this.handleInieEditData()
        this.oldEditData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    showDialogForm1 (val) {
      if (val === false) {
        this.$nextTick(() => {
          this.$refs.editData.resetFields()
        })
        let selectTree = this.$refs.selectTree
        if (selectTree && selectTree.length > 0) {
          this.$refs.selectTree[0].clearSelectedNode()
        }
        this.$emit('update:showDialogForm', false)
      }
    }
  },
  computed: {
    parent () {
      let parent = this.$parent
      let i = 0
      while (parent.dialogItem !== this.dialogItem) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      return parent
    },
    dialogItem1 () {
      return this.dialogItem.filter(item => item.show)
    }
  },
  created () {
    this.dialogItem1.forEach(item => {
      if (item.label.length > this.chineseTybe) {
        this.chineseTybe = item.label.length
      }
    })
    // this.$setItem(this.dialogItem, 'dialog')
  },
  methods: {
    handleClass (span = 24, type) {
      if (this.doubleColumn) span = 12
      if (this.doubleColumn && type === 'textarea') span = 24
      return ['width', `width${span}`]
    },
    // 对editData多选项进行初始化操作
    handleInieEditData () {
      // 找出多选的选项，转化为数组
      this.dialogItem1.forEach(item => {
        if (item.type === 'selectMore') {
          if (this.parent.isEdit === 0) {
            this.editData[item.key] = []
          } else if (this.parent.isEdit === 1) {
            if (this.editData[item.key] === '') {
              this.editData[item.key] = []
            } else {
              this.editData[item.key] = this.editData[item.key].split(',')
            }
          }
        }
      })
    },
    handleClearSelectTree () {
      this.$emit('handleClearSelectTree')
    },
    // 拿到选择树的值
    popoverHide (checkedIds, checkedData) {
      this.editData[this.selectTreekey] = checkedIds
      this.$emit('handleSelectTreeValue', checkedData)
    },
    // 点击按钮事件
    handleFn (type, clickFn = '') {
      if (type === 'delete') {
        if (clickFn === '') {
          this.showDialogForm1 = false
          return true
        } else {
          this.parent[clickFn]()
          return true
        }
      } else if (type === 'edit') {
        if (this.allRead) {
          this.showDialogForm1 = false
          return false
        }
        if (this.handleConfirmEdit('editData') === false) return false
        if (clickFn === '') {
          this.showDialogForm1 = false
          this.parent.apiCreateData(this.editData)
          return true
        }
        this.parent[clickFn]()
      }
    },
    // 失去焦点判断输入框的值
    handleJudgeNum (key, num) {
      if (parseInt(num) >= 0) {
        return true
      } else {
        this.$notify({
          message: '金额不得小于0',
          type: 'error'
        })
        this.editData.actualPaymentAmount = ''
        return false
      }
    },
    handleChange (fn, val) {
      if (fn) {
        this.parent[fn](val)
      }
    },
    // 点击确认时校验
    handleConfirmEdit (formName) {
      if (JSON.stringify(this.oldEditData) === JSON.stringify(this.editData)) {
        this.$message.error('您未修改或添加任何数据')
        return false
      }
      // 校验规则
      let result
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          result = false
          return false
        }
        result = true
      })
      if (result === false) return false
      return true
    }
  }
}
</script>

<style lang="less">
  .dialogModule {
    .el-radio__input.is-checked+.el-radio__label{
      color: #4162DB;
    }
    .el-radio__input.is-checked .el-radio__inner{
      background: #4162DB;
      border-color: #4162DB;
    }
    .el-radio+.el-radio{
      margin-left: 12px;
    }
    .el-radio__label{
      padding-left: 5px;
      color: #333;
    }
     &.doubleColumn{
      .el-dialog{
        max-width: 800px;
        width: 800px;
      }
    }
    .el-dialog{
      max-width: 520px;
      border-radius: 4px;
      .el-dialog__header{
        padding: 15px 15px 12px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 34px 70px 0 50px;
        .el-form{
          width: 100%;
          .el-form-item{
            margin-bottom: 25px;
            &.label5, &.label6{
              .el-form-item__label{
                width: 100px;
              }
              .el-form-item__content{
                margin-left: 100px;
              }
            }
            &.label4{
              .el-form-item__label{
                width: 96px;
              }
              .el-form-item__content{
                margin-left: 96px;
              }
            }
            &.label3{
              .el-form-item__label{
                width: 83px;
              }
              .el-form-item__content{
                margin-left: 83px;
              }
            }
            &.label2{
              .el-form-item__label{
                width: 82px;
              }
              .el-form-item__content{
                margin-left: 82px;
              }
            }
            &.radio{
              .el-form-item__label, .el-form-item__content{
                line-height: 18px;
                height: 18px;
              }
            }
          }
        }
        .el-row:last-child{
          margin-bottom: 5px;
        }
        .el-form-item__label {
          line-height: 30px;
          font-weight: normal;
          color: #1c1c1c;
        }
        .el-form-item__content {
          margin-left: 100px;
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
      }
       .el-dialog__footer{
        padding: 20px;
        border-top: 1px solid #e8e8e8;
        .el-button{
          width: 60px;
          height: 30px;
          padding: 0;
          line-height: 30px;
        }
      }
    }
    .el-radio--small.is-bordered{
      padding: 11px 15px 0 10px;
      height: 40px;
    }
    .el-button{
      padding: 10px 20px;
    }
    .width{
      display: inline-block;
      vertical-align: middle;
      .el-col{
        width: 100%;
      }
    }
    .width12{
      width: 50%;
    }
    .width24{
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .longText {
      .el-form-item__content{
        margin-left: 140px;
      }
      label {
        width: 140px;
      }
    }
  }
</style>
